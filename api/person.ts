import type { VercelRequest, VercelResponse } from '@vercel/node';

import { api } from '../utils/api';

export default async function movie(request: VercelRequest, response: VercelResponse) {
  // Merging into single API call to avoid free-tier function limit
  // https://vercel.link/function-count-limit
  const { action, id } = request.query;

  switch (action) {
    case 'credits':
      if (request.method === 'GET') {
        // PERSON CREDITS

        try {
          const person = await api.personCombinedCredits({
            id: (id || '').toString(),
          });

          if (!person) {
            return response.status(404).send(`No person credits found with id "${id}"`);
          }

          return response.status(200).json(person);
        } catch (error) {
          return response.status(502).send(error.message);
        }
      } else {
        return response.status(405).send('Invalid request method');
      }
    default:
      if (request.method === 'GET') {
        // PERSON DETAILS

        try {
          const person = await api.personInfo({
            id: (id || '').toString(),
          });

          if (!person) {
            return response.status(404).send(`No person found with id "${id}"`);
          }

          return response.status(200).json(person);
        } catch (error) {
          return response.status(502).send(error.message);
        }
      } else {
        return response.status(405).send('Invalid request method');
      }
  }
}
