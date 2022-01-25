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

export const apiRaw = async (url: string, init?: RequestInit): Promise<Response> => {
  // Add API prefix to request URL
  const apiUrl = `${API_URL}${url}`;

  // Call API
  const response = await fetch(apiUrl, {
    ...init,
    credentials: 'include',
  });

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return response;
};

export const apiFetch = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await apiRaw(url, init);

  return await response.json();
};
