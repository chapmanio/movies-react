import type { VercelRequest, VercelResponse } from '@vercel/node';

import { api } from '../utils/api';

export default async function movie(request: VercelRequest, response: VercelResponse) {
  // Merging into single API call to avoid free-tier function limit
  // https://vercel.link/function-count-limit
  const { action, id } = request.query;

  switch (action) {
    case 'credits':
      if (request.method === 'GET') {
        // TV CREDITS

        try {
          const credits = await api.tvCredits({
            id: (id || '').toString(),
          });

          if (!credits) {
            return response.status(404).send(`No tv show credits found with id "${id}"`);
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
        // TV DETAILS

        try {
          const tvShow = await api.tvInfo({
            id: (id || '').toString(),
          });

          if (!tvShow) {
            return response.status(404).send(`No tv show found with id "${id}"`);
          }

          return response.status(200).json(tvShow);
        } catch (error) {
          return response.status(502).send(error.message);
        }
      } else {
        return response.status(405).send('Invalid request method');
      }
  }
}
