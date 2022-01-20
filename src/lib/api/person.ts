import type {
  Person,
  PersonCombinedCreditsResponse,
  SearchPersonResponse,
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
export const searchPerson = async ({ query, page }: SearchArgs) => {
  return publicApiFetch<SearchPersonResponse>(`/search?area=person&query=${query}&page=${page}`);
};

export const getPerson = async ({ id }: GetArgs) => {
  return publicApiFetch<Person>(`/person/${id}`);
};

export const getPersonCredits = async ({ id }: GetArgs) => {
  return publicApiFetch<PersonCombinedCreditsResponse>(`/person/${id}/credits`);
};
