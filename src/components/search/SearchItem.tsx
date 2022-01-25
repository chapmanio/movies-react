import { Link } from 'react-router-dom';
import { PlusSmIcon } from '@heroicons/react/solid';

import { useUserState } from '../../hooks/useUser';

import type { ListItem } from '../../lib/format';

// Types
type SearchItemProps = {
  item: ListItem;
  onAddToList: (item: ListItem) => void;
};

// Component
const SearchItem = ({ item, onAddToList }: SearchItemProps) => {
  // Hooks
  const userState = useUserState();

  // Derived state
  const { id, type, poster, title, subTitle } = item;

  // Render
  return (
    <div className="relative">
      <span
        className={
          `pointer-events-none absolute top-2 left-2 z-10 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white shadow` +
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

      {userState.status === 'resolved' && userState.data.auth ? (
        <button
          type="button"
          onClick={() => onAddToList(item)}
          className={
            `absolute -top-3 -right-3 z-10 inline-flex items-center rounded-full border border-transparent p-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2` +
            (type === 'movie'
              ? ` bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-500`
              : type === 'tv'
              ? ` bg-fuchsia-100 text-fuchsia-800 hover:bg-fuchsia-200 focus:ring-fuchsia-500`
              : type === 'person'
              ? ` bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500`
              : ``)
          }
        >
          <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      ) : null}

      <Link
        to={`/${type}/${id}`}
        className="group aspect-w-2 aspect-h-3 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
      >
        {poster && (
          <img
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face${poster}`}
            alt=""
            className="pointer-events-none object-cover group-hover:opacity-75"
          />
        )}

        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {title}</span>
        </button>
      </Link>

      <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
        {title}
      </p>
      <p className="pointer-events-none block text-sm font-medium text-gray-500">{subTitle}</p>
    </div>
  );
};

export default SearchItem;
