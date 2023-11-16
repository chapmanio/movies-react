import type { CreditsResponse } from "moviedb-promise/dist/request-types";

import { apiFetch, ExtShowResponse } from "../api";

type GetArgs = {
  id: number;
};

export const getTvShow = async ({ id }: GetArgs) => {
  return apiFetch<ExtShowResponse>(`/tv/${id}`);
};

export const getTvCredits = async ({ id }: GetArgs) => {
  return apiFetch<CreditsResponse>(`/tv/${id}/credits`);
};
