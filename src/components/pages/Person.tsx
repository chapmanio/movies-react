import { useEffect, useState } from 'react';
import type { Person as PersonResponse } from 'moviedb-promise/dist/request-types';
import { useParams } from 'react-router-dom';

import type { ApiResponse } from '../../lib/api';
import { getPerson } from '../../lib/api/person';

const Person = () => {
  // Hooks
  const { id } = useParams();

  // Local state
  const [person, setPerson] = useState<ApiResponse<PersonResponse>>({
    status: 'pending',
  });

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

  // Render
  return person.status === 'pending' ? (
    <p>Loading</p>
  ) : person.status === 'resolved' ? (
    <div
      className="bg-cover bg-no-repeat bg-[right_-200px_top] h-96"
      style={{
        backgroundImage: person.data.profile_path
          ? `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${person.data.profile_path})`
          : undefined,
      }}
    >
      <div className="h-full bg-theme-person">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div></div>
          <div>
            <h2 className="text-white">{person.data.name}</h2>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Person;
