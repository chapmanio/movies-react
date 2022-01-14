import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';

import { db } from '../../utils/db';
import { createJwtCookie } from '../../utils/auth';

export default async function signIn(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'POST':
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
    default:
      return response.status(405).send('Invalid request method');
  }
}
