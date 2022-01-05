import type { VercelRequest, VercelResponse } from '@vercel/node';

import { api } from '../../../utils/api';

const getCredits = async (request: VercelRequest, response: VercelResponse) => {
  const { id } = request.query;

  try {
    const credits = await api.movieCredits({
      id: (id || '').toString(),
    });

    return response.status(200).json(credits);
  } catch (error) {
    // TODO: Handle error
    console.error(error);

    return response.status(502);
  }
};

export default getCredits;
