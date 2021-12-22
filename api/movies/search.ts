import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { SearchMultiRequest } from 'moviedb-promise/dist/request-types';

import { api } from '../../utils/api';

const search = async (request: VercelRequest, response: VercelResponse) => {
  const { query, page } = request.query;

  const params: SearchMultiRequest = {
    query: (query || '').toString(),
    page: parseInt((page || '1').toString()),
  };

  try {
    const movies = await api.searchMulti(params);

    return response.status(200).json(movies);
  } catch (error) {
    // TODO: Handle error
    console.error(error);

    return response.status(502);
  }
};

export default search;
