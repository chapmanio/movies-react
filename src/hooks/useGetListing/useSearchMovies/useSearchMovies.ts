import { QueryFunction, useQuery } from "@tanstack/react-query";

import { MovieResultsResponse } from "moviedb-promise/dist/request-types";
import { ListingResponse, SearchArgs } from "../types";
import { apiFetch } from "../../../lib/api";
import { formatSearchMovie } from "../../../lib/format";

export const useSearchMovies = (args: SearchArgs, enabled = true) => {
  const queryFn: QueryFunction<ListingResponse> = async () => {
    const { query, page } = args;
    const data = await apiFetch<MovieResultsResponse>(
      `/movie/search?query=${query}&page=${page}`,
    );

    return {
      items: formatSearchMovie(data.results),
      total: data.total_pages || 1,
    };
  };

  return useQuery({
    enabled,
    queryKey: ["searchMovie", args],
    queryFn,
  });
};
