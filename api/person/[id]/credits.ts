import type { VercelRequest, VercelResponse } from '@vercel/node';

import { api } from '../../../utils/api';

export default async function personCredits(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'GET':
      const { id } = request.query;

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
    default:
      return response.status(405).send('Invalid request method');
  }
}