import type { VercelRequest, VercelResponse } from '@vercel/node';

import { api } from '../utils/api';

export default async function trending(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'GET':
      try {
        const results = await api.trending({
          media_type: 'all',
          time_window: 'day',
        });

        return response.status(200).json(results);
      } catch (error) {
        return response.status(502).send(error.message);
      }
    default:
      return response.status(405).send('Invalid request method');
  }
}
