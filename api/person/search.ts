import type { VercelRequest, VercelResponse } from '@vercel/node';

import { api } from '../../utils/api';

const personSearch = async (request: VercelRequest, response: VercelResponse) => {
  const { query, page } = request.query;

  try {
    const people = await api.searchPerson({
      query: (query || '').toString(),
      page: parseInt((page || '1').toString()),
    });

    return response.status(200).json(people);
  } catch (error) {
    // TODO: Handle error
    console.error(error);

    return response.status(502);
  }
};

export default personSearch;
