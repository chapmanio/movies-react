import type {
  Person,
  PersonCombinedCreditsResponse,
  SearchPersonResponse,
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
export const searchPerson = async ({ query, page }: SearchArgs): Promise<SearchPersonResponse> => {
  const response = await fetch(`/api/search?area=person&query=${query}&page=${page}`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};

export const getPerson = async ({ id }: GetArgs): Promise<Person> => {
  const response = await fetch(`/api/person/${id}`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};

export const getPersonCredits = async ({ id }: GetArgs): Promise<PersonCombinedCreditsResponse> => {
  const response = await fetch(`/api/person/${id}/credits`);

  if (!response.ok) {
    throw await buildHttpError(response);
  }

  return await response.json();
};
