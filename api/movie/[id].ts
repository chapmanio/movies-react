import type { VercelRequest, VercelResponse } from '@vercel/node';

import { api } from '../../utils/api';

const getMovie = async (request: VercelRequest, response: VercelResponse) => {
  const { id } = request.query;

  try {
    const movies = await api.movieInfo({
      id: (id || '').toString(),
    });

    return response.status(200).json(movies);
  } catch (error) {
    // TODO: Handle error
    console.error(error);

    return response.status(502);
  }
};

export default getMovie;
