import type { VercelRequest, VercelResponse } from '@vercel/node';

import { api } from '../../../utils/api';

export default async function movieCredits(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'GET':
      const { id } = request.query;

      try {
        const credits = await api.movieCredits({
          id: (id || '').toString(),
        });

        if (!credits) {
          return response.status(404).send(`No movie credits found with id "${id}"`);
        }

        return response.status(200).json(credits);
      } catch (error) {
        return response.status(502).send(error.message);
      }
    default:
      return response.status(405).send('Invalid request method');
  }
}
