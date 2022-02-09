import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import type { CreditsResponse, MovieResponse } from 'moviedb-promise/dist/request-types';
import { Link, useParams } from 'react-router-dom';
import { CalendarIcon, ClockIcon, FilmIcon, PlusSmIcon } from '@heroicons/react/solid';

import Rating from '../assets/Rating';
import AddToListButton from '../lists/AddToListButton';

import type { ApiResponse } from '../../lib/api';
import { getMovieCredits, getMovie } from '../../lib/api/movie';
import { formatRuntime, formatShortDate, formatYear } from '../../lib/dates';

import { formatMovie } from '../../lib/format';

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
      <Helmet>
        <title>{movie.status === 'resolved' ? `${movie.data.title} • Movies` : `Movies`}</title>
      </Helmet>

      <div
        className="bg-cover bg-right-top bg-no-repeat sm:bg-[right_-200px_top]"
        style={{
          backgroundImage:
            movie.status === 'resolved' && movie.data.backdrop_path
              ? `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.data.backdrop_path})`
              : undefined,
        }}
      >
        <div className="bg-theme-movie">
          <div className="mx-auto max-w-7xl items-center px-4 py-8 sm:flex sm:px-6 lg:px-8">
            <div className="flex-none self-start sm:w-[300px]">
              <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg">
                {movie.status === 'pending' ? (
                  <div className="animate-pulse bg-gray-100" />
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

            <div className="mt-6 sm:mt-0 sm:ml-10">
              {movie.status === 'pending' ? (
                <div className="h-9 w-96 animate-pulse rounded bg-gray-100" />
              ) : movie.status === 'resolved' ? (
                <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl">
                  {movie.data.title}{' '}
                  <span className="font-extralight text-gray-200">
                    ({formatYear(movie.data.release_date)})
                  </span>
                </h2>
              ) : null}

              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className="mt-2 flex items-center text-sm font-light text-gray-200">
                  <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-300" />

                  {movie.status === 'pending' ? (
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-100" />
                  ) : movie.status === 'resolved' ? (
                    <>{formatShortDate(movie.data.release_date)}</>
                  ) : null}
                </div>

                <div className="mt-2 flex items-center text-sm font-light text-gray-200">
                  <FilmIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-300" />

                  {movie.status === 'pending' ? (
                    <div className="h-4 w-72 animate-pulse rounded bg-gray-100" />
                  ) : movie.status === 'resolved' ? (
                    <>{movie.data.genres?.map((genre) => genre.name).join(', ')}</>
                  ) : null}
                </div>

                {movie.status === 'pending' ? (
                  <div className="mt-2 flex items-center text-sm font-light text-gray-200">
                    <ClockIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-300" />
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-100" />
                  </div>
                ) : movie.status === 'resolved' && movie.data.runtime ? (
                  <div className="mt-2 flex items-center text-sm font-light text-gray-200">
                    <ClockIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-300" />
                    {formatRuntime(movie.data.runtime)}
                  </div>
                ) : null}
              </div>

              <div className="mt-6 flex items-center space-x-6">
                {movie.status === 'pending' ? (
                  <div className="h-16 w-16 animate-pulse rounded-full bg-gray-100" />
                ) : movie.status === 'resolved' && movie.data.vote_average ? (
                  <Rating rating={movie.data.vote_average} />
                ) : null}

                {movie.status === 'pending' ? (
                  <div className="h-9 w-32 animate-pulse rounded bg-gray-100" />
                ) : movie.status === 'resolved' ? (
                  <AddToListButton
                    item={formatMovie(movie.data)}
                    className="ml-6 inline-flex items-center rounded-md border border-transparent bg-blue-100 py-2 pl-4 pr-5 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-700"
                  >
                    {' '}
                    <PlusSmIcon className="mr-2 -ml-1 h-5 w-5" />
                    Add to list
                  </AddToListButton>
                ) : null}
              </div>

              <div className="mt-6">
                {movie.status === 'pending' ? (
                  <div className="h-6 w-72 animate-pulse rounded bg-gray-100" />
                ) : movie.status === 'resolved' ? (
                  <h3 className="text-lg font-bold italic text-gray-200">{movie.data.tagline}</h3>
                ) : null}
              </div>

              <div className="mt-1">
                {movie.status === 'pending' ? (
                  <div className="mt-2 h-20 w-full animate-pulse rounded bg-gray-100" />
                ) : movie.status === 'resolved' ? (
                  <p className="font-light leading-7 text-gray-200">{movie.data.overview}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 pb-5">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Top billed cast</h3>
        </div>

        {credits.status !== 'rejected' ? (
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-8">
            {credits.status === 'pending' ? (
              <>
                {Array(8)
                  .fill(null)
                  .map((_, index) => (
                    <li key={index} className="animate-pulse">
                      <div className="group aspect-w-2 aspect-h-3 block w-full overflow-hidden rounded-lg bg-gray-100" />
                      <div className="mt-2 h-4 w-3/4 rounded bg-gray-100" />
                      <div className="mt-1 h-4 w-1/2 rounded bg-gray-100" />
                    </li>
                  ))}
              </>
            ) : (
              <>
                {/* TODO: Use search item? */}
                {credits.data.cast?.slice(0, 8).map((result) => (
                  <li key={result.id} className="relative">
                    <Link
                      to={`/person/${result.id}`}
                      className="group aspect-w-2 aspect-h-3 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
                    >
                      {result.profile_path && (
                        <img
                          src={`https://www.themoviedb.org/t/p/w138_and_h175_face${result.profile_path}`}
                          alt=""
                          className="pointer-events-none object-cover group-hover:opacity-75"
                        />
                      )}

                      <button type="button" className="absolute inset-0 focus:outline-none">
                        <span className="sr-only">View details for {result.name}</span>
                      </button>
                    </Link>

                    <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                      {result.name}
                    </p>
                    <p className="pointer-events-none block text-sm font-medium text-gray-500">
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
