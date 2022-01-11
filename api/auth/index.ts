import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

export default function signOut(request: VercelRequest, response: VercelResponse) {
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

      return response.status(200).json({ auth: true, user: payload });
    default:
      return response.status(405).send('Invalid request method');
  }
}
