import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';

import { createJwtCookie, clearCookie } from '../utils/auth';
import { db } from '../utils/db';

export default async function auth(request: VercelRequest, response: VercelResponse) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  // Merging into single API call to avoid free-tier function limit
  // https://vercel.link/function-count-limit
  const { action } = request.query;

  switch (action) {
    case 'sign-in':
      if (request.method === 'POST') {
        // SIGN IN

        // TODO: Use zod?
        const { email, password } = JSON.parse(request.body);

        if (!email || !password) {
          return response.status(422).send('Email or password not supplied');
        }

        try {
          // First, find the user
          const user = await db.user.findUnique({
            where: { email },
          });

          if (!user) {
            return response.status(401).send('Invalid email or password');
          }

          // Then, check the password
          const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);

          if (!isCorrectPassword) {
            return response.status(401).send('Invalid email or password');
          }

          // Add the JWT cookie to the header
          response.setHeader('Set-Cookie', createJwtCookie(user.id, user.email));

          // Return the user
          return response.status(200).json(user);
        } catch (error) {
          return response.status(502).send(error.message);
        }
      } else {
        return response.status(405).send('Invalid request method');
      }
    case 'register':
      if (request.method === 'POST') {
        // REGISTER

        // TODO: Use zod?
        const { name, email, password } = JSON.parse(request.body);

        if (!name || !email || !password) {
          return response.status(422).send('Name, email or password not supplied');
        }

        try {
          // Hash supplied password and create the user
          const passwordHash = await bcrypt.hash(password, 10);

          const user = await db.user.create({
            data: {
              name,
              email,
              passwordHash,
            },
          });

          // Add the JWT cookie to the header
          response.setHeader('Set-Cookie', createJwtCookie(user.id, user.email));

          // Return the user
          return response.status(200).json(user);
        } catch (error) {
          // Handle Prisma error
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
              case 'P2002':
                return response.status(422).send('An account already exists with that email');
              default:
                return response.status(500).send(error.message);
            }
          }

          return response.status(502).send(error.message);
        }
      } else {
        return response.status(405).send('Invalid request method');
      }
    case 'sign-out':
      if (request.method === 'POST') {
        // SIGN OUT
        response.setHeader('Set-Cookie', clearCookie());

        return response.status(200).send('Signed out');
      } else {
        return response.status(405).send('Invalid request method');
      }
    case 'account':
      if (request.method === 'PATCH') {
        // UPDATE ACCOUNT DETAILS

        const { id } = request.query;

        // TODO: Use zod?
        const { name, email, password } = JSON.parse(request.body);

        if (!name || !email) {
          return response.status(422).send('Name or email not supplied');
        }

        try {
          const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;

          const user = await db.user.update({
            data: {
              name,
              email,
              ...(passwordHash && { passwordHash }),
            },
            where: {
              id: id.toString(),
            },
          });

          // Update the JWT cookie
          response.setHeader('Set-Cookie', createJwtCookie(user.id, user.email));

          // Return the updated user
          return response.status(200).json(user);
        } catch (error) {
          // Handle Prisma error
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
              case 'P2002':
                return response.status(422).send('An account already exists with that email');
              default:
                return response.status(500).send(error.message);
            }
          }

          return response.status(502).send(error.message);
        }
      } else {
        return response.status(405).send('Invalid request method');
      }
    default:
      if (request.method === 'GET') {
        // CHECK AUTH STATE

        // Do we have a token at all?
        const { cookies } = request;

        if (!cookies.jwt) {
          return response.status(200).json({ auth: false });
        }

        // Is it a valid token?
        const payload = jwt.verify(cookies.jwt, process.env.JWT_SECRET);

        if (!payload) {
          return response.status(401).send('Invalid Authorization token');
        }

        // Retrieve the user ID
        if (typeof payload === 'string') {
          return response.status(401).send('Invalid JWT payload');
        }

        const { userId } = payload;

        if (!userId) {
          response.setHeader('Set-Cookie', clearCookie());

          return response.status(200).json({ auth: false });
        }

        // Retrieve the db user
        const user = await db.user.findUnique({
          where: { id: userId },
        });

        if (!user) {
          response.setHeader('Set-Cookie', clearCookie());

          return response.status(200).json({ auth: false });
        }

        return response.status(200).json({ auth: true, user });
      } else {
        return response.status(405).send('Invalid request method');
      }
  }
}
