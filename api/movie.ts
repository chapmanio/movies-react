import type { VercelRequest, VercelResponse } from '@vercel/node';

import { api } from '../utils/api';

export default async function movie(request: VercelRequest, response: VercelResponse) {
  // Merging into single API call to avoid free-tier function limit
  // https://vercel.link/function-count-limit
  const { action, id } = request.query;

  switch (action) {
    case 'credits':
      if (request.method === 'GET') {
        // MOVIE CREDITS

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
      } else {
        return response.status(405).send('Invalid request method');
      }
    default:
      if (request.method === 'GET') {
        // MOVIE DETAILS

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
      } else {
        return response.status(405).send('Invalid request method');
      }
  }
}
