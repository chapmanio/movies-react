import type { SearchMultiResponse } from 'moviedb-promise/dist/request-types';

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
export const getSearch = async ({ query, page }: SearchArgs): Promise<SearchMultiResponse> => {
  const response = await fetch(`/api/movies/search?query=${query}&page=${page}`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};
