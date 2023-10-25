import { QueryFunction, useQuery } from "@tanstack/react-query";

import { SearchMultiResponse } from "moviedb-promise/dist/request-types";
import { ListingResponse, SearchArgs } from "../types";
import { apiFetch } from "../../../lib/api";
import { formatSearchAll } from "../../../lib/format";

export const useSearchAll = (args: SearchArgs, enabled = true) => {
  const queryFn: QueryFunction<ListingResponse> = async () => {
    const { query, page } = args;
    const data = await apiFetch<SearchMultiResponse>(
      `/search?query=${query}&page=${page}`,
    );

    return {
      items: formatSearchAll(data.results),
      total: data.total_pages || 1,
    };
  };

  return useQuery({
    enabled,
    queryKey: ["searchAll", args],
    queryFn,
  });
};
