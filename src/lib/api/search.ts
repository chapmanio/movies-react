import type { SearchMultiResponse, TrendingResponse } from 'moviedb-promise/dist/request-types';

import { buildHttpError } from '../api';

// Types
type SearchArgs = {
  query: string;
  page: number;
};

// Exports
export const getTrending = async (): Promise<TrendingResponse> => {
  const response = await fetch(`/api/trending`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};

export const searchAll = async ({ query, page }: SearchArgs): Promise<SearchMultiResponse> => {
  const response = await fetch(`/api/search?query=${query}&page=${page}`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};
