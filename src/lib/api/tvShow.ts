import type { CreditsResponse, TvResultsResponse } from 'moviedb-promise/dist/request-types';

import { buildHttpError, ExtShowResponse } from '../api';

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
  const response = await fetch(`/api/search?area=tv&query=${query}&page=${page}`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};

export const getTvShow = async ({ id }: GetArgs): Promise<ExtShowResponse> => {
  const response = await fetch(`/api/tv/${id}`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};

export const getTvCredits = async ({ id }: GetArgs): Promise<CreditsResponse> => {
  const response = await fetch(`/api/tv/${id}/credits`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};
