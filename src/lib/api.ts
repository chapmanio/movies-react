import type { ShowResponse } from 'moviedb-promise/dist/request-types';

// Constants
const API_URL = 'https://movies-api.chapmanio.dev/api';

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
const buildHttpError = async (response: Response): Promise<Error> => {
  const responseText = await response.text();
  const error = new Error(responseText);

  error.name = `${response.status} ${response.statusText}`;

  return error;
};

export const apiFetch = async <T>(url: string, init?: RequestInit | undefined): Promise<T> => {
  // Build API url
  const mergedUrl = `${API_URL}${url}`;

  // Call API
  const response = await fetch(mergedUrl, {
    ...init,
    credentials: 'same-origin',
  });

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};
