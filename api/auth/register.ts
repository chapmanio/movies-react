import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';

import { db } from '../../utils/db';
import { createJwtCookie } from '../../utils/auth';
import { Prisma } from '@prisma/client';

export default async function register(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'POST':
      // TODO: Use zod?
      const { email, password } = JSON.parse(request.body);

      if (!email || !password) {
        return response.status(422).send('Email or password not supplied');
      }

      try {
        // Hash supplied password and create the user
        const passwordHash = await bcrypt.hash(password, 10);

        const user = await db.user.create({
          data: { email, passwordHash },
        });

        // Add the JWT cookie to the header
        response.setHeader('Set-Cookie', createJwtCookie(user.id, email));

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
    default:
      return response.status(405).send('Invalid request method');
  }
}
