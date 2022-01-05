import { useEffect, useState } from 'react';
import type { CreditsResponse, MovieResponse } from 'moviedb-promise/dist/request-types';
import { Link, useParams } from 'react-router-dom';
import { CalendarIcon, ClockIcon, FilmIcon, PlusSmIcon } from '@heroicons/react/solid';

import Rating from '../details/Rating';

import type { ApiResponse } from '../../lib/api';
import { getMovieCredits, getMovie } from '../../lib/api/movie';
import { formatRuntime, formatShortDate, formatYear } from '../../lib/dates';

const Movie = () => {
  // Hooks
  const { id } = useParams();

  // Local state
  const [movie, setMovie] = useState<ApiResponse<MovieResponse>>({
    status: 'pending',
  });
  const [credits, setCredits] = useState<ApiResponse<CreditsResponse>>({
    status: 'pending',
  });

  // Effects
  useEffect(() => {
    let isCancelled = false;

    getMovie({
      id: parseInt(id || '0'),
    })
      .then((data) => {
        if (!isCancelled) {
          setMovie({ status: 'resolved', data });
        }
      })
      .catch((error: Error) => {
        if (!isCancelled) {
          setMovie({ status: 'rejected', error });
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [id]);

  useEffect(() => {
    let isCancelled = false;

    if (movie.status === 'resolved') {
      getMovieCredits({
        id: parseInt(id || '0'),
      })
        .then((data) => {
          if (!isCancelled) {
            setCredits({ status: 'resolved', data });
          }
        })
        .catch((error: Error) => {
          if (!isCancelled) {
            setCredits({ status: 'rejected', error });
          }
        });
    }

    return () => {
      isCancelled = true;
    };
  }, [id, movie]);

  // Render
  return (
    <>
      <div
        className="bg-cover bg-no-repeat bg-[right_-200px_top]"
        style={{
          backgroundImage:
            movie.status === 'resolved' && movie.data.backdrop_path
              ? `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.data.backdrop_path})`
              : undefined,
        }}
      >
        <div className="bg-theme-movie">
          <div className="flex items-center px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="w-[300px] flex-none">
              <div className="overflow-hidden rounded-lg aspect-w-2 aspect-h-3">
                {movie.status === 'pending' ? (
                  <div className="bg-gray-100 animate-pulse" />
                ) : movie.status === 'resolved' && movie.data.poster_path ? (
                  <img
                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.data.poster_path}`}
                    srcSet={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.data.poster_path} 1x, https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.data.poster_path} 2x`}
                    alt={movie.data.title}
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-gray-100" />
                )}
              </div>
            </div>

            <div className="ml-10">
              {movie.status === 'pending' ? (
                <div className="bg-gray-100 rounded animate-pulse h-9 w-96" />
              ) : movie.status === 'resolved' ? (
                <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl">
                  {movie.data.title}{' '}
                  <span className="text-gray-200 font-extralight">
                    ({formatYear(movie.data.release_date)})
                  </span>
                </h2>
              ) : null}

              <div className="flex flex-col mt-1 sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div className="flex items-center mt-2 text-sm font-light text-gray-200">
                  <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-300" />

                  {movie.status === 'pending' ? (
                    <div className="w-16 h-4 bg-gray-100 rounded animate-pulse" />
                  ) : movie.status === 'resolved' ? (
                    <>{formatShortDate(movie.data.release_date)}</>
                  ) : null}
                </div>
                <div className="flex items-center mt-2 text-sm font-light text-gray-200">
                  <FilmIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-300" />

                  {movie.status === 'pending' ? (
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-72" />
                  ) : movie.status === 'resolved' ? (
                    <>{movie.data.genres?.map((genre) => genre.name).join(', ')}</>
                  ) : null}
                </div>
                {movie.status === 'pending' ? (
                  <div className="flex items-center mt-2 text-sm font-light text-gray-200">
                    <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-300" />
                    <div className="w-16 h-4 bg-gray-100 rounded animate-pulse" />
                  </div>
                ) : movie.status === 'resolved' && movie.data.runtime ? (
                  <div className="flex items-center mt-2 text-sm font-light text-gray-200">
                    <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-300" />
                    {formatRuntime(movie.data.runtime)}
                  </div>
                ) : null}
              </div>

              <div className="flex items-center mt-6 space-x-6">
                {movie.status === 'pending' ? (
                  <div className="w-16 h-16 bg-gray-100 rounded-full animate-pulse" />
                ) : movie.status === 'resolved' && movie.data.vote_average ? (
                  <Rating rating={movie.data.vote_average} />
                ) : null}

                {movie.status === 'pending' ? (
                  <div className="w-32 bg-gray-100 rounded animate-pulse h-9" />
                ) : movie.status === 'resolved' ? (
                  <button
                    type="button"
                    className="inline-flex items-center py-2 pl-4 pr-5 ml-6 text-sm font-medium text-blue-700 bg-blue-100 border border-transparent rounded-md shadow-sm hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PlusSmIcon className="w-5 h-5 mr-2 -ml-1" />
                    Add to list
                  </button>
                ) : null}
              </div>

              <div className="mt-6">
                {movie.status === 'pending' ? (
                  <div className="h-6 bg-gray-100 rounded animate-pulse w-72" />
                ) : movie.status === 'resolved' ? (
                  <h3 className="text-lg italic font-bold text-gray-200">{movie.data.tagline}</h3>
                ) : null}
              </div>

              <div className="mt-1">
                {movie.status === 'pending' ? (
                  <div className="w-full h-20 mt-2 bg-gray-100 rounded animate-pulse" />
                ) : movie.status === 'resolved' ? (
                  <p className="font-light leading-7 text-gray-200">{movie.data.overview}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mx-auto mt-12 max-w-7xl sm:px-6 lg:px-8">
        <div className="pb-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Top billed cast</h3>
        </div>

        {credits.status !== 'rejected' ? (
          <ul className="grid grid-cols-8 mt-8 gap-x-4 gap-y-8">
            {credits.status === 'pending' ? (
              <>
                {Array(8)
                  .fill(null)
                  .map((_, index) => (
                    <li key={index} className="animate-pulse">
                      <div className="block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-2 aspect-h-3" />
                      <div className="w-3/4 h-4 mt-2 bg-gray-100 rounded" />
                      <div className="w-1/2 h-4 mt-1 bg-gray-100 rounded" />
                    </li>
                  ))}
              </>
            ) : (
              <>
                {credits.data.cast?.slice(0, 8).map((result) => (
                  <li key={result.id} className="relative">
                    <Link
                      to={`/person/${result.id}`}
                      className="block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-2 aspect-h-3 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500"
                    >
                      {result.profile_path && (
                        <img
                          src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${result.profile_path}`}
                          alt=""
                          className="object-cover pointer-events-none group-hover:opacity-75"
                        />
                      )}

                      <button type="button" className="absolute inset-0 focus:outline-none">
                        <span className="sr-only">View details for {result.name}</span>
                      </button>
                    </Link>

                    <p className="block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none">
                      {result.name}
                    </p>
                    <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                      {result.character}
                    </p>
                  </li>
                ))}
              </>
            )}
          </ul>
        ) : null}
      </div>
    </>
  );
};

export default Movie;
