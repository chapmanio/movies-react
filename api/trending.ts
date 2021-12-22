import type { VercelRequest, VercelResponse } from '@vercel/node';

import { api } from '../utils/api';

const trending = async (request: VercelRequest, response: VercelResponse) => {
  try {
    const results = await api.trending({
      media_type: 'all',
      time_window: 'day',
    });

    return response.status(200).json(results);
  } catch (error) {
    // TODO: Handle error
    console.error(error);

    return response.status(502);
  }
};

export default trending;
