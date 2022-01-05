import type {
  MovieResult,
  MovieResultsResponse,
  PersonResult,
  SearchMultiResponse,
  SearchPersonResponse,
  TvResult,
  TvResultsResponse,
} from 'moviedb-promise/dist/request-types';

import { formatShortMonthDate } from './dates';

// Types
export type SearchResult = {
  type: 'movie' | 'tv' | 'person';
  id: number;
  poster?: string;
  title: string;
  subTitle?: string;
};

// Helpers
const formatMovie = (movie: MovieResult): SearchResult => {
  return {
    id: movie.id ?? 0,
    type: 'movie',
    poster: movie.poster_path,
    title: movie.title || 'Unknown title',
    subTitle: formatShortMonthDate(movie.release_date),
  };
};

const formatTvShow = (tvShow: TvResult): SearchResult => {
  return {
    id: tvShow.id ?? 0,
    type: 'tv',
    poster: tvShow.poster_path,
    title: tvShow.name || 'Unknown name',
    subTitle: formatShortMonthDate(tvShow.first_air_date),
  };
};

const formatPerson = (person: PersonResult): SearchResult => {
  return {
    id: person.id ?? 0,
    type: 'person',
    poster: person.profile_path,
    title: person.name || 'Unknown name',
  };
};

export const formatSearchAll = (data: SearchMultiResponse): SearchResult[] => {
  const { results } = data;

  if (!results) {
    return [];
  }

  return results.map((result) => {
    if ('media_type' in result) {
      switch (result.media_type) {
        case 'movie':
          return formatMovie(result);
        case 'tv':
          return formatTvShow(result);
        default:
          // Force typing as data matches but types don't
          return formatPerson(result as PersonResult);
      }
    } else {
      // No media type for person results
      return formatPerson(result);
    }
  });
};

export const formatSearchMovie = (data: MovieResultsResponse): SearchResult[] => {
  const { results } = data;

  if (!results) {
    return [];
  }

  return results.map((result) => formatMovie(result));
};

export const formatSearchTvShow = (data: TvResultsResponse): SearchResult[] => {
  const { results } = data;

  if (!results) {
    return [];
  }

  return results.map((result) => formatTvShow(result));
};

export const formatSearchPerson = (data: SearchPersonResponse): SearchResult[] => {
  const { results } = data;

  if (!results) {
    return [];
  }

  return results.map((result) => formatPerson(result));
};
