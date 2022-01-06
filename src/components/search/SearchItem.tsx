import { Link } from 'react-router-dom';
import { PlusSmIcon } from '@heroicons/react/solid';

import type { ListItem } from '../../lib/format';

// Types
type SearchItemProps = {
  item: ListItem;
};

// Component
const SearchItem = ({ item }: SearchItemProps) => {
  // Derived state
  const { id, type, poster, title, subTitle } = item;

  // Render
  return (
    <div className="relative">
      <span
        className={
          `absolute top-2 left-2 pointer-events-none z-10 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shadow text-white` +
          (type === 'movie'
            ? ` bg-blue-600`
            : type === 'tv'
            ? ` bg-fuchsia-600`
            : type === 'person'
            ? ` bg-green-600`
            : ``)
        }
      >
        {type === 'movie' ? 'Movie' : type === 'tv' ? 'TV Show' : type === 'person' ? 'Person' : ''}
      </span>

      <button
        type="button"
        className={
          `absolute -top-3 -right-3 z-10 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2` +
          (type === 'movie'
            ? ` text-blue-800 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500`
            : type === 'tv'
            ? ` text-fuchsia-800 bg-fuchsia-100 hover:bg-fuchsia-200 focus:ring-fuchsia-500`
            : type === 'person'
            ? ` text-green-800 bg-green-100 hover:bg-green-200 focus:ring-green-500`
            : ``)
        }
      >
        <PlusSmIcon className="w-5 h-5" aria-hidden="true" />
      </button>

      <Link
        to={`/${type}/${id}`}
        className="block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-2 aspect-h-3 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500"
      >
        {poster && (
          <img
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face${poster}`}
            alt=""
            className="object-cover pointer-events-none group-hover:opacity-75"
          />
        )}

        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {title}</span>
        </button>
      </Link>

      <p className="block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none">
        {title}
      </p>
      <p className="block text-sm font-medium text-gray-500 pointer-events-none">{subTitle}</p>
    </div>
  );
};

export default SearchItem;
