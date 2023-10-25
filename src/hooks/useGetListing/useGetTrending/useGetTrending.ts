import { QueryFunction, useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../../lib/api";
import { TrendingResponse } from "moviedb-promise/dist/request-types";
import { formatSearchAll } from "../../../lib/format";
import { ListingResponse } from "../types";

export const useGetTrending = (enabled = true) => {
  const queryFn: QueryFunction<ListingResponse> = async () => {
    const data = await apiFetch<TrendingResponse>(`/trending`);

    return {
      items: formatSearchAll(data.results),
      // There may be more results but we're only showing one trending page
      total: 1,
    };
  };

  return useQuery({
    enabled,
    queryKey: ["trending"],
    queryFn,
  });
};
