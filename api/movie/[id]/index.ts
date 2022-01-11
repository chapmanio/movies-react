import type { VercelRequest, VercelResponse } from '@vercel/node';

import { api } from '../../../utils/api';

export default async function movie(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'GET':
      const { id } = request.query;

      try {
        const movie = await api.movieInfo({
          id: (id || '').toString(),
        });

        if (!movie) {
          return response.status(404).send(`No movie found with id "${id}"`);
        }

        return response.status(200).json(movie);
      } catch (error) {
        return response.status(502).send(error.message);
      }
    default:
      return response.status(405).send('Invalid request method');
  }
}
