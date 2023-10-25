import type {
  CreditsResponse,
  MovieResponse,
} from "moviedb-promise/dist/request-types";

import { apiFetch } from "../api";

type GetArgs = {
  id: number;
};

export const getMovie = async ({ id }: GetArgs) => {
  return apiFetch<MovieResponse>(`/movie/${id}`);
};

export const getMovieCredits = async ({ id }: GetArgs) => {
  return apiFetch<CreditsResponse>(`/movie/${id}/credits`);
};
