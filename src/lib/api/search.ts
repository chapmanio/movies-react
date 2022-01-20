import type { SearchMultiResponse, TrendingResponse } from 'moviedb-promise/dist/request-types';

import { publicApiFetch } from '../api';

// Types
type SearchArgs = {
  query: string;
  page: number;
};

// Exports
export const getTrending = async () => {
  return publicApiFetch<TrendingResponse>(`/trending`);
};

export const searchAll = async ({ query, page }: SearchArgs) => {
  return publicApiFetch<SearchMultiResponse>(`/search?query=${query}&page=${page}`);
};
