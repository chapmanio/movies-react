import type { VercelRequest, VercelResponse } from '@vercel/node';

import { api } from '../../utils/api';

const getPerson = async (request: VercelRequest, response: VercelResponse) => {
  const { id } = request.query;

  try {
    const person = await api.personInfo({
      id: (id || '').toString(),
    });

    return response.status(200).json(person);
  } catch (error) {
    // TODO: Handle error
    console.error(error);

    return response.status(502);
  }
};

export default getPerson;
