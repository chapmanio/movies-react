import type { VercelRequest, VercelResponse } from '@vercel/node';

import { db } from '../utils/db';
import { api } from '../utils/api';

const helloWorld = async (request: VercelRequest, response: VercelResponse) => {
  const user = await db.user.findUnique({
    where: {
      email: 'rcchapman85@gmail.com',
    },
  });

  const movies = await api.searchMovie({ query: 'alien' });

  response.status(200).json(movies);
};

export default helloWorld;
