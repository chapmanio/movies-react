import type { VercelRequest, VercelResponse } from '@vercel/node';

import { api } from '../utils/api';

export default async function search(request: VercelRequest, response: VercelResponse) {
  switch (request.method) {
    case 'GET':
      const { area, query, page } = request.query;

      try {
        // Merging into single API call to avoid free-tier function limit
        // https://vercel.link/function-count-limit
        switch (area) {
          case 'movie':
            const movies = await api.searchMovie({
              query: (query || '').toString(),
              page: parseInt((page || '1').toString()),
            });

            return response.status(200).json(movies);
          case 'tv':
            const tvShows = await api.searchTv({
              query: (query || '').toString(),
              page: parseInt((page || '1').toString()),
            });

            return response.status(200).json(tvShows);
          case 'person':
            const people = await api.searchPerson({
              query: (query || '').toString(),
              page: parseInt((page || '1').toString()),
            });

            return response.status(200).json(people);
          default:
            // Search by all
            const results = await api.searchMulti({
              query: (query || '').toString(),
              page: parseInt((page || '1').toString()),
            });

            return response.status(200).json(results);
        }
      } catch (error) {
        return response.status(502).send(error.message);
      }
    default:
      return response.status(405).send('Invalid request method');
  }
}
