import type { ShowResponse, TvResultsResponse } from 'moviedb-promise/dist/request-types';

import { buildHttpError } from '../api';

// Types
type SearchArgs = {
  query: string;
  page: number;
};

type GetArgs = {
  id: number;
};

// Exports
export const searchTv = async ({ query, page }: SearchArgs): Promise<TvResultsResponse> => {
  const response = await fetch(`/api/tv/search?query=${query}&page=${page}`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};

export const getTvShow = async ({ id }: GetArgs): Promise<ShowResponse> => {
  const response = await fetch(`/api/tv/${id}`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};
