import type { VercelRequest, VercelResponse } from '@vercel/node';

import { clearCookie } from '../../utils/auth';

export default function signOut(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'POST':
      response.setHeader('Set-Cookie', clearCookie());

      return response.status(200).send('Signed out');
    default:
      return response.status(405).send('Invalid request method');
  }
}
