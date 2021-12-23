import type { MovieResponse, MovieResultsResponse } from 'moviedb-promise/dist/request-types';

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
export const searchMovie = async ({ query, page }: SearchArgs): Promise<MovieResultsResponse> => {
  const response = await fetch(`/api/movie/search?query=${query}&page=${page}`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};

export const getMovie = async ({ id }: GetArgs): Promise<MovieResponse> => {
  const response = await fetch(`/api/movie/${id}`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};
