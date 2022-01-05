import type { ShowResponse } from 'moviedb-promise/dist/request-types';

// Types
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

export interface ExtShowResponse extends ShowResponse {
  tagline?: string;
}

// Helpers
export const buildHttpError = async (response: Response): Promise<Error> => {
  const responseText = await response.text();
  const error = new Error(responseText);

  error.name = `${response.status} ${response.statusText}`;

  return error;
};
