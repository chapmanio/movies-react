import { useEffect, useState } from 'react';
import type { CreditsResponse } from 'moviedb-promise/dist/request-types';
import { Link, useParams } from 'react-router-dom';
import { CalendarIcon, ClockIcon, FilmIcon, PlusSmIcon } from '@heroicons/react/solid';

import Rating from '../assets/Rating';

import type { ApiResponse, ExtShowResponse } from '../../lib/api';
import { getTvShow, getTvCredits } from '../../lib/api/tvShow';
import { formatRuntime, formatShortDate, formatYear } from '../../lib/dates';

const TvShow = () => {
  // Hooks
  const { id } = useParams();

  // Local state
  const [tvShow, setTvShow] = useState<ApiResponse<ExtShowResponse>>({
    status: 'pending',
  });
  const [credits, setCredits] = useState<ApiResponse<CreditsResponse>>({
    status: 'pending',
  });

  // Effects
  useEffect(() => {
    let isCancelled = false;

    getTvShow({
      id: parseInt(id || '0'),
    })
      .then((data) => {
        if (!isCancelled) {
          setTvShow({ status: 'resolved', data });
        }
      })
      .catch((error: Error) => {
        if (!isCancelled) {
          setTvShow({ status: 'rejected', error });
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [id]);

  useEffect(() => {
    let isCancelled = false;

    if (tvShow.status === 'resolved') {
      getTvCredits({
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
  }, [id, tvShow]);

  // Render
  return (
    <>
      <div
        className="bg-cover bg-no-repeat bg-[right_-200px_top]"
        style={{
          backgroundImage:
            tvShow.status === 'resolved' && tvShow.data.backdrop_path
              ? `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${tvShow.data.backdrop_path})`
              : undefined,
        }}
      >
        <div className="bg-theme-tv">
          <div className="flex items-center px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="w-[300px] flex-none">
              <div className="overflow-hidden rounded-lg aspect-w-2 aspect-h-3">
                {tvShow.status === 'pending' ? (
                  <div className="bg-gray-100 animate-pulse" />
                ) : tvShow.status === 'resolved' && tvShow.data.poster_path ? (
                  <img
                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${tvShow.data.poster_path}`}
                    srcSet={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${tvShow.data.poster_path} 1x, https://www.themoviedb.org/t/p/w600_and_h900_bestv2${tvShow.data.poster_path} 2x`}
                    alt={tvShow.data.name}
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-gray-100" />
                )}
              </div>
            </div>

            <div className="ml-10">
              {tvShow.status === 'pending' ? (
                <div className="bg-gray-100 rounded animate-pulse h-9 w-96" />
              ) : tvShow.status === 'resolved' ? (
                <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl">
                  {tvShow.data.name}{' '}
                  <span className="text-gray-200 font-extralight">
                    ({formatYear(tvShow.data.first_air_date)})
                  </span>
                </h2>
              ) : null}

              <div className="flex flex-col mt-1 sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div className="flex items-center mt-2 text-sm font-light text-gray-200">
                  <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-300" />

                  {tvShow.status === 'pending' ? (
                    <div className="w-16 h-4 bg-gray-100 rounded animate-pulse" />
                  ) : tvShow.status === 'resolved' ? (
                    <>{formatShortDate(tvShow.data.first_air_date)}</>
                  ) : null}
                </div>
                <div className="flex items-center mt-2 text-sm font-light text-gray-200">
                  <FilmIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-300" />

                  {tvShow.status === 'pending' ? (
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-72" />
                  ) : tvShow.status === 'resolved' ? (
                    <>{tvShow.data.genres?.map((genre) => genre.name).join(', ')}</>
                  ) : null}
                </div>
                {tvShow.status === 'pending' ? (
                  <div className="flex items-center mt-2 text-sm font-light text-gray-200">
                    <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-300" />
                    <div className="w-16 h-4 bg-gray-100 rounded animate-pulse" />
                  </div>
                ) : tvShow.status === 'resolved' && tvShow.data.episode_run_time ? (
                  <div className="flex items-center mt-2 text-sm font-light text-gray-200">
                    <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-300" />
                    {formatRuntime(tvShow.data.episode_run_time[0])}
                  </div>
                ) : null}
              </div>

              <div className="flex items-center mt-6 space-x-6">
                {tvShow.status === 'pending' ? (
                  <div className="w-16 h-16 bg-gray-100 rounded-full animate-pulse" />
                ) : tvShow.status === 'resolved' && tvShow.data.vote_average ? (
                  <Rating rating={tvShow.data.vote_average} />
                ) : null}

                {tvShow.status === 'pending' ? (
                  <div className="w-32 bg-gray-100 rounded animate-pulse h-9" />
                ) : tvShow.status === 'resolved' ? (
                  <button
                    type="button"
                    className="inline-flex items-center py-2 pl-4 pr-5 ml-6 text-sm font-medium border border-transparent rounded-md shadow-sm text-fuchsia-700 bg-fuchsia-100 hover:bg-fuchsia-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500"
                  >
                    <PlusSmIcon className="w-5 h-5 mr-2 -ml-1" />
                    Add to list
                  </button>
                ) : null}
              </div>

              <div className="mt-6">
                {tvShow.status === 'pending' ? (
                  <div className="h-6 bg-gray-100 rounded animate-pulse w-72" />
                ) : tvShow.status === 'resolved' && 'tagline' in tvShow.data ? (
                  <h3 className="text-lg italic font-bold text-gray-200">{tvShow.data.tagline}</h3>
                ) : null}
              </div>

              <div className="mt-1">
                {tvShow.status === 'pending' ? (
                  <div className="w-full h-20 mt-2 bg-gray-100 rounded animate-pulse" />
                ) : tvShow.status === 'resolved' ? (
                  <p className="font-light leading-7 text-gray-200">{tvShow.data.overview}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mx-auto mt-12 max-w-7xl sm:px-6 lg:px-8">
        <div className="pb-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Series cast</h3>
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
                          src={`https://www.themoviedb.org/t/p/w138_and_h175_face${result.profile_path}`}
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

export default TvShow;
