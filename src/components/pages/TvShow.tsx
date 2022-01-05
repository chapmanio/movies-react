import { useEffect, useState } from 'react';
import type { ShowResponse } from 'moviedb-promise/dist/request-types';
import { useParams } from 'react-router-dom';

import type { ApiResponse } from '../../lib/api';
import { getTvShow } from '../../lib/api/tvShow';

const TvShow = () => {
  // Hooks
  const { id } = useParams();

  // Local state
  const [tvShow, setTvShow] = useState<ApiResponse<ShowResponse>>({
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

  // Render
  return tvShow.status === 'pending' ? (
    <p>Loading</p>
  ) : tvShow.status === 'resolved' ? (
    <div
      className="bg-cover bg-no-repeat bg-[right_-200px_top] h-96"
      style={{
        backgroundImage: tvShow.data.backdrop_path
          ? `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${tvShow.data.backdrop_path})`
          : undefined,
      }}
    >
      <div className="h-full bg-theme-tv">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div></div>
          <div>
            <h2 className="text-white">{tvShow.data.name}</h2>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default TvShow;
