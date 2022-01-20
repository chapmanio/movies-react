import type {
  CreditsResponse,
  MovieResponse,
  MovieResultsResponse,
} from 'moviedb-promise/dist/request-types';

import { publicApiFetch } from '../api';

// Types
type SearchArgs = {
  query: string;
  page: number;
};

type GetArgs = {
  id: number;
};

// Exports
export const searchMovie = async ({ query, page }: SearchArgs) => {
  return publicApiFetch<MovieResultsResponse>(`/search?area=movie&query=${query}&page=${page}`);
};

export const getMovie = async ({ id }: GetArgs) => {
  return publicApiFetch<MovieResponse>(`/movie/${id}`);
};

export const getMovieCredits = async ({ id }: GetArgs) => {
  return publicApiFetch<CreditsResponse>(`/movie/${id}/credits`);
};
