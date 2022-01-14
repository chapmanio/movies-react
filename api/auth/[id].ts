import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';

import { db } from '../../utils/db';
import { createJwtCookie } from '../../utils/auth';
import { Prisma } from '@prisma/client';

export default async function register(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'PATCH':
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
    default:
      return response.status(405).send('Invalid request method');
  }
}
