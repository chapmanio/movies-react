import { Link } from 'react-router-dom';
import type { SearchResult } from '../../lib/search';

// Types
type SearchItemProps = {
  result: SearchResult;
};

// Component
const SearchItem = ({ result }: SearchItemProps) => {
  // Derived state
  const { id, type, poster, title, subTitle } = result;

  // Render
  return (
    <div className="relative">
      <span
        className={
          `absolute -top-0 -left-2 -rotate-12 z-10 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium shadow` +
          (type === 'movie'
            ? ` bg-red-100 text-red-800`
            : type === 'tv'
            ? ` bg-blue-100 text-blue-800`
            : type === 'person'
            ? ` bg-green-100 text-green-800`
            : ``)
        }
      >
        {type === 'movie' ? 'Movie' : type === 'tv' ? 'TV Show' : type === 'person' ? 'Person' : ''}
      </span>

      <Link
        to={`/${type}/${id}`}
        className="group block w-full aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden"
      >
        {poster && (
          <img
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${poster}`}
            alt=""
            className="object-cover pointer-events-none group-hover:opacity-75"
          />
        )}

        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {title}</span>
        </button>
      </Link>

      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
        {title}
      </p>
      <p className="block text-sm font-medium text-gray-500 pointer-events-none">{subTitle}</p>
    </div>
  );
};

export default SearchItem;
