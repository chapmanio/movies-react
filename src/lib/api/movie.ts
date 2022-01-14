import type {
  CreditsResponse,
  MovieResponse,
  MovieResultsResponse,
} from 'moviedb-promise/dist/request-types';

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
  const response = await fetch(`/api/search?area=movie&query=${query}&page=${page}`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};

export const getMovie = async ({ id }: GetArgs): Promise<MovieResponse> => {
  const response = await fetch(`/api/movie?id=${id}`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};

export const getMovieCredits = async ({ id }: GetArgs): Promise<CreditsResponse> => {
  const response = await fetch(`/api/movie?id=${id}&action=credits`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};
