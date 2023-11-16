import { useMemo } from "react";
import { useTrending } from "./useTrending";
import { SearchArgs, SearchType } from "./types";
import { useSearchAll } from "./useSearchAll";
import { useSearchMovies } from "./useSearchMovies";
import { useSearchPeople } from "./useSearchPeople";
import { useSearchTv } from "./useSearchTv";

type Trending = {
  type: "trending";
};

type Search = {
  type: SearchType;
  args: SearchArgs;
};

type SearchProps = Trending | Search;

const FALLBACK_ARGS: SearchArgs = {
  query: "",
  page: 1,
};

export const useGetListing = (props: SearchProps) => {
  const { type } = props;

  const {
    isTrending,
    isSearchAll,
    isSearchMovies,
    isSearchPeople,
    isSearchTv,
  } = useMemo(
    () => ({
      isTrending: type === "trending",
      isSearchAll: type === "all",
      isSearchMovies: type === "movie",
      isSearchTv: type === "tv",
      isSearchPeople: type === "person",
    }),
    [type],
  );

  const args = type !== "trending" ? props.args : FALLBACK_ARGS;

  const { isLoading: isTrendingLoading, data: trendingData } =
    useTrending(isTrending);

  const { isLoading: isSearchAllLoading, data: searchAllData } = useSearchAll(
    args,
    isSearchAll,
  );

  const { isLoading: isSearchMoviesLoading, data: moviesData } =
    useSearchMovies(args, isSearchMovies);

  const { isLoading: isSearchTvLoading, data: tvData } = useSearchTv(
    args,
    isSearchTv,
  );

  const { isLoading: isSearchPeopleLoading, data: peopleData } =
    useSearchPeople(args, isSearchPeople);

  const isLoading = useMemo(
    () =>
      isTrendingLoading ||
      isSearchAllLoading ||
      isSearchMoviesLoading ||
      isSearchTvLoading ||
      isSearchPeopleLoading,
    [
      isSearchAllLoading,
      isSearchMoviesLoading,
      isSearchPeopleLoading,
      isSearchTvLoading,
      isTrendingLoading,
    ],
  );

  const results = useMemo(() => {
    if (isSearchAll) {
      return searchAllData;
    }

    if (isSearchMovies) {
      return moviesData;
    }

    if (isSearchTv) {
      return tvData;
    }

    if (isSearchPeople) {
      return peopleData;
    }

    return trendingData;
  }, [
    isSearchAll,
    isSearchMovies,
    isSearchPeople,
    isSearchTv,
    moviesData,
    peopleData,
    searchAllData,
    trendingData,
    tvData,
  ]);

  return {
    isLoading,
    results,
  };
};
