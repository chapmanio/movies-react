import type {
  MovieResult,
  PersonResult,
  SearchMultiResponse,
  TvResult,
} from 'moviedb-promise/dist/request-types';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

// Types
type Listing = {
  poster?: string;
  title: string;
  subTitle?: string;
};

interface Movie extends Listing {
  type: 'movie';
  data: MovieResult;
}

interface TvShow extends Listing {
  type: 'tv';
  data: TvResult;
}

interface Person extends Listing {
  type: 'person';
  data: PersonResult;
}

export type SearchResult = Movie | TvShow | Person;

// Helpers
const formatDate = (isoString?: string) => {
  if (!isoString) {
    return undefined;
  }

  return format(parseISO(isoString), 'do MMM yyyy');
};

export const formatResults = (data: SearchMultiResponse): SearchResult[] => {
  const { results } = data;

  if (!results) {
    return [];
  }

  const formattedResults: SearchResult[] = results.map((result) => {
    if ('media_type' in result) {
      switch (result.media_type) {
        case 'movie':
          return {
            type: 'movie',
            poster: result.poster_path,
            title: result.title || 'Unknown title',
            subTitle: formatDate(result.release_date),
            data: result as MovieResult,
          };
        case 'tv':
          return {
            type: 'tv',
            poster: result.poster_path,
            title: result.name || 'Unknown name',
            subTitle: formatDate(result.first_air_date),
            data: result as TvResult,
          };
        default:
          // Force typing as data matches but types don't
          const personResult: PersonResult = result as PersonResult;

          return {
            type: 'person',
            poster: personResult.profile_path,
            title: personResult.name || 'Unknown name',
            data: personResult,
          };
      }
    } else {
      // No media type for person results
      return {
        type: 'person',
        poster: result.profile_path,
        title: result.name || 'Unknown name',
        data: result as PersonResult,
      };
    }
  });

  return formattedResults;
};
