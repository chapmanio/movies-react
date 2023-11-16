import { QueryFunction, useQuery } from "@tanstack/react-query";

import { TvResultsResponse } from "moviedb-promise/dist/request-types";
import { ListingResponse, SearchArgs } from "../types";
import { apiFetch } from "../../../lib/api";
import { formatSearchTvShow } from "../../../lib/format";

export const useSearchTv = (args: SearchArgs, enabled = true) => {
  const queryFn: QueryFunction<ListingResponse> = async () => {
    const { query, page } = args;
    const data = await apiFetch<TvResultsResponse>(
      `/tv/search?query=${query}&page=${page}`,
    );

    return {
      items: formatSearchTvShow(data.results),
      total: data.total_pages || 1,
    };
  };

  return useQuery({
    enabled,
    queryKey: ["searchTv", args],
    queryFn,
  });
};
