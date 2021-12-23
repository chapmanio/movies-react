import { useEffect, useState } from 'react';
import type { MovieResponse } from 'moviedb-promise/dist/request-types';
import { useParams } from 'react-router-dom';

import type { ApiResponse } from '../../lib/api';
import { getMovie } from '../../lib/api/movie';

const Movie = () => {
  // Hooks
  const { id } = useParams();

  // Local state
  const [movie, setMovie] = useState<ApiResponse<MovieResponse>>({
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

  // Render
  return movie.status === 'pending' ? (
    <p>Loading</p>
  ) : movie.status === 'resolved' ? (
    <div
      className="bg-cover bg-no-repeat bg-[right_-200px_top] h-96"
      style={{
        backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.data.backdrop_path})`,
      }}
    >
      <div className="h-full bg-theme-movie">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div></div>
          <div>
            <h2 className="text-white">{movie.data.title}</h2>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Movie;
