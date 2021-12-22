import type {
  MovieResultsResponse,
  SearchMultiResponse,
  SearchPersonResponse,
  TrendingResponse,
  TvResultsResponse,
} from 'moviedb-promise/dist/request-types';

// TYPES

// Api
type ApiPending = {
  status: 'pending';
};

type ApiSuccess<T> = {
  status: 'resolved';
  data: T;
};

type ApiError = {
  status: 'rejected';
  error?: Error;
};

export type ApiResponse<T> = ApiPending | ApiSuccess<T> | ApiError;

// Search
type SearchArgs = {
  query: string;
  page: number;
};

// Helpers
const buildHttpError = async (response: Response): Promise<Error> => {
  const responseText = await response.text();
  const error = new Error(responseText);

  error.name = `${response.status} ${response.statusText}`;

  return error;
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

export const searchMovie = async ({ query, page }: SearchArgs): Promise<MovieResultsResponse> => {
  const response = await fetch(`/api/movie/search?query=${query}&page=${page}`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};

export const searchTv = async ({ query, page }: SearchArgs): Promise<TvResultsResponse> => {
  const response = await fetch(`/api/tv/search?query=${query}&page=${page}`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};

export const searchPerson = async ({ query, page }: SearchArgs): Promise<SearchPersonResponse> => {
  const response = await fetch(`/api/person/search?query=${query}&page=${page}`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};
