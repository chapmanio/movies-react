import { QueryFunction, useQuery } from "@tanstack/react-query";

import { SearchPersonResponse } from "moviedb-promise/dist/request-types";
import { ListingResponse, SearchArgs } from "../types";
import { apiFetch } from "../../../lib/api";
import { formatSearchPerson } from "../../../lib/format";

export const useSearchPeople = (args: SearchArgs, enabled = true) => {
  const queryFn: QueryFunction<ListingResponse> = async () => {
    const { query, page } = args;
    const data = await apiFetch<SearchPersonResponse>(
      `/person/search?query=${query}&page=${page}`,
    );

    return {
      items: formatSearchPerson(data.results),
      total: data.total_pages || 1,
    };
  };

  return useQuery({
    enabled,
    queryKey: ["searchPeople", args],
    queryFn,
  });
};
