import type {
  Person,
  PersonCombinedCreditsResponse,
} from "moviedb-promise/dist/request-types";

import { apiFetch } from "../api";

type GetArgs = {
  id: number;
};

export const getPerson = async ({ id }: GetArgs) => {
  return apiFetch<Person>(`/person/${id}`);
};

export const getPersonCredits = async ({ id }: GetArgs) => {
  return apiFetch<PersonCombinedCreditsResponse>(`/person/${id}/credits`);
};
