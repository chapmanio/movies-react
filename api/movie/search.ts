import type { VercelRequest, VercelResponse } from '@vercel/node';

import { api } from '../../utils/api';

export default async function searchMovie(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'GET':
      const { query, page } = request.query;

      try {
        const movies = await api.searchMovie({
          query: (query || '').toString(),
          page: parseInt((page || '1').toString()),
        });

        return response.status(200).json(movies);
      } catch (error) {
        return response.status(502).send(error.message);
      }
    default:
      return response.status(405).send('Invalid request method');
  }
}
