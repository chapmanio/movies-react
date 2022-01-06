import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import type {
  Person as PersonResponse,
  PersonCombinedCreditsResponse,
} from 'moviedb-promise/dist/request-types';
import { useParams } from 'react-router-dom';
import { LocationMarkerIcon, PlusSmIcon, UserIcon } from '@heroicons/react/solid';
import { CakeIcon } from '@heroicons/react/outline';

import SearchItem from '../search/SearchItem';

import type { ApiResponse } from '../../lib/api';
import { formatAge } from '../../lib/dates';
import { getPerson, getPersonCredits } from '../../lib/api/person';
import { formatPersonCredits, ListItem } from '../../lib/format';

const Person = () => {
  // Hooks
  const { id } = useParams();

  // Local state
  const [person, setPerson] = useState<ApiResponse<PersonResponse>>({
    status: 'pending',
  });
  const [credits, setCredits] = useState<ApiResponse<PersonCombinedCreditsResponse>>({
    status: 'pending',
  });
  const [formattedCredits, setFormattedCredits] = useState<ListItem[]>([]);
  const [showMore, setShowMore] = useState(false);

  // Effects
  useEffect(() => {
    let isCancelled = false;

    getPerson({
      id: parseInt(id || '0'),
    })
      .then((data) => {
        if (!isCancelled) {
          setPerson({ status: 'resolved', data });
        }
      })
      .catch((error: Error) => {
        if (!isCancelled) {
          setPerson({ status: 'rejected', error });
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [id]);

  useEffect(() => {
    let isCancelled = false;

    if (person.status === 'resolved') {
      getPersonCredits({
        id: parseInt(id || '0'),
      })
        .then((data) => {
          if (!isCancelled) {
            setCredits({ status: 'resolved', data });
            setFormattedCredits(formatPersonCredits(data));
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
  }, [id, person]);

  // Render
  return (
    <>
      <Helmet>
        <title>{person.status === 'resolved' ? `${person.data.name} • Movies` : `Movies`}</title>
      </Helmet>

      <div className="bg-theme-person">
        <div className="items-center px-4 py-8 mx-auto sm:flex max-w-7xl sm:px-6 lg:px-8">
          <div className="sm:w-[300px] flex-none self-start">
            <div className="overflow-hidden rounded-lg aspect-w-2 aspect-h-3">
              {person.status === 'pending' ? (
                <div className="bg-gray-100 animate-pulse" />
              ) : person.status === 'resolved' && person.data.profile_path ? (
                <img
                  src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${person.data.profile_path}`}
                  srcSet={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${person.data.profile_path} 1x, https://www.themoviedb.org/t/p/w600_and_h900_bestv2${person.data.profile_path} 2x`}
                  alt={person.data.name}
                  className="object-cover"
                />
              ) : (
                <div className="bg-gray-100" />
              )}
            </div>
          </div>

          <div className="mt-6 sm:mt-0 sm:ml-10">
            {person.status === 'pending' ? (
              <div className="bg-gray-100 rounded animate-pulse h-9 w-96" />
            ) : person.status === 'resolved' ? (
              <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl">
                {person.data.name}
              </h2>
            ) : null}

            <div className="flex flex-col mt-1 sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
              <div className="flex items-center mt-2 text-sm font-light text-gray-200">
                <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-300" />

                {person.status === 'pending' ? (
                  <div className="h-4 bg-gray-100 rounded w-14 animate-pulse" />
                ) : person.status === 'resolved' ? (
                  <>
                    {person.data.gender === 1
                      ? `Female`
                      : person.data.gender === 2
                      ? `Male`
                      : `Unknown`}
                  </>
                ) : null}
              </div>

              <div className="flex items-center mt-2 text-sm font-light text-gray-200">
                <CakeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-300" />

                {person.status === 'pending' ? (
                  <div className="w-20 h-4 bg-gray-100 rounded animate-pulse" />
                ) : person.status === 'resolved' && person.data.birthday ? (
                  <>
                    {person.data.deathday ? `Died ` : null}
                    {formatAge(person.data.birthday, person.data.deathday)} years old
                  </>
                ) : (
                  `Unknown birthday`
                )}
              </div>

              <div className="flex items-center mt-2 text-sm font-light text-gray-200">
                <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-300" />

                {person.status === 'pending' ? (
                  <div className="h-4 bg-gray-100 rounded w-36 animate-pulse" />
                ) : person.status === 'resolved' && person.data.place_of_birth ? (
                  <>{person.data.place_of_birth}</>
                ) : (
                  `Unknown birthplace`
                )}
              </div>
            </div>

            <div className="mt-6">
              {person.status === 'pending' ? (
                <div className="w-32 bg-gray-100 rounded animate-pulse h-9" />
              ) : person.status === 'resolved' ? (
                <button
                  type="button"
                  className="inline-flex items-center py-2 pl-4 pr-5 text-sm font-medium text-green-700 bg-green-100 border border-transparent rounded-md shadow-sm hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <PlusSmIcon className="w-5 h-5 mr-2 -ml-1" />
                  Add to list
                </button>
              ) : null}
            </div>

            <div className="mt-6">
              <h3 className="text-lg italic font-bold text-gray-200">Biography</h3>
              {person.status === 'pending' ? (
                <div className="w-full h-32 mt-1 bg-gray-100 rounded animate-pulse" />
              ) : person.status === 'resolved' && person.data.biography ? (
                <>
                  {person.data.biography.length > 400 ? (
                    <>
                      <p className="mt-1 font-light leading-7 text-gray-200">
                        {showMore
                          ? person.data.biography
                          : `${person.data.biography.substring(0, 400)}...`}
                      </p>

                      <button
                        type="button"
                        onClick={() => setShowMore(!showMore)}
                        className="mt-2 font-semibold text-gray-200"
                      >
                        {showMore ? `Read less` : `Read more`}
                      </button>
                    </>
                  ) : (
                    <p className="mt-1 font-light leading-7 text-gray-200">
                      {person.data.biography}
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-1 font-light leading-7 text-gray-200">No biography found.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mx-auto mt-12 max-w-7xl sm:px-6 lg:px-8">
        <div className="pb-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Latest roles</h3>
        </div>

        {credits.status !== 'rejected' ? (
          <ul className="grid grid-cols-2 mt-8 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-8">
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
                {formattedCredits.slice(0, 8).map((result) => (
                  <li key={result.id} className="relative">
                    <SearchItem item={result} />
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

export default Person;
