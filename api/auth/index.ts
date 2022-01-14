import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { clearCookie } from '../../utils/auth';

import { db } from '../../utils/db';

export default async function signOut(request: VercelRequest, response: VercelResponse) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  switch (request.method) {
    case 'GET':
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
    default:
      return response.status(405).send('Invalid request method');
  }
}
