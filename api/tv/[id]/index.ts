import type { VercelRequest, VercelResponse } from '@vercel/node';

import { api } from '../../../utils/api';

export default async function tvShow(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'GET':
      const { id } = request.query;

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
    default:
      return response.status(405).send('Invalid request method');
  }
}
