import type { VercelRequest, VercelResponse } from '@vercel/node';

import { api } from '../utils/api';

const search = async (request: VercelRequest, response: VercelResponse) => {
  const { query, page } = request.query;

  try {
    const results = await api.searchMulti({
      query: (query || '').toString(),
      page: parseInt((page || '1').toString()),
    });

    return response.status(200).json(results);
  } catch (error) {
    // TODO: Handle error
    console.error(error);

    return response.status(502);
  }
};

export default search;
