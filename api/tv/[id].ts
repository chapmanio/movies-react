import type { VercelRequest, VercelResponse } from '@vercel/node';

import { api } from '../../utils/api';

const getTvShow = async (request: VercelRequest, response: VercelResponse) => {
  const { id } = request.query;

  try {
    const tvShow = await api.tvInfo({
      id: (id || '').toString(),
    });

    return response.status(200).json(tvShow);
  } catch (error) {
    // TODO: Handle error
    console.error(error);

    return response.status(502);
  }
};

export default getTvShow;
