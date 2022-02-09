import { useEffect, useState } from 'react';
import Modal from '../assets/Modal';

import { ApiResponse } from '../../lib/api';
import type { ListItem } from '../../lib/format';
import type { List } from '../../lib/api/types';
import { getAllLists } from '../../lib/api/lists';

import { useListState } from '../../hooks/useList';

// Types
type AddToListButtonProps = {
  item: ListItem;
  className?: string;
};

// Component
const AddToListButton: React.FC<AddToListButtonProps> = ({ item, className, children }) => {
  // Hooks
  const listState = useListState();

  // Local state
  const [lists, setLists] = useState<ApiResponse<List[]>>({ status: 'pending' });
  const [list, setList] = useState<string | undefined>(listState.slug);

  const [showModal, setShowModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Derived state
  const { id, title, type, poster, subTitle } = item;

  // Effects
  useEffect(() => {
    // Get all lists on load
    getAllLists()
      .then((lists) => {
        setLists({
          status: 'resolved',
          data: lists,
        });
      })
      .catch((error: Error) => {
        setLists({ status: 'rejected', error });
      });
  }, []);

  // Handlers
  const handleAddToList = () => {
    setSubmitLoading(true);
  };

  // Render
  return (
    <>
      <button type="button" className={className} onClick={() => setShowModal(true)}>
        {children}
      </button>

      <Modal
        title={`tmbd-${id}-modal`}
        visible={showModal}
        canClose={true}
        onClose={() => setShowModal(false)}
      >
        <div className="flex flex-col items-center space-y-6 sm:flex-row sm:space-x-6 sm:space-y-0">
          <div className="w-36">
            <div className="aspect-w-2 aspect-h-3 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              {poster && (
                <img
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${poster}`}
                  alt=""
                  className="pointer-events-none object-cover"
                />
              )}
            </div>
          </div>

          <div className="flex-1">
            <span
              className={
                `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white` +
                (type === 'movie'
                  ? ` bg-blue-600`
                  : type === 'tv'
                  ? ` bg-fuchsia-600`
                  : type === 'person'
                  ? ` bg-green-600`
                  : ``)
              }
            >
              {type === 'movie'
                ? 'Movie'
                : type === 'tv'
                ? 'TV Show'
                : type === 'person'
                ? 'Person'
                : ''}
            </span>

            <h2 className="mt-3 text-2xl font-bold leading-7 text-gray-900">{title}</h2>
            <p className="pointer-events-none mt-1 block text-sm font-medium text-gray-500">
              {subTitle}
            </p>

            <div className="mt-6 flex space-x-2">
              {lists.status === 'pending' ? (
                <>
                  <div className="h-9 w-2/3 animate-pulse rounded-md bg-gray-100" />
                  <div className="h-9 w-1/3 animate-pulse rounded-md bg-gray-100" />
                </>
              ) : lists.status === 'resolved' ? (
                <>
                  <select
                    id="list"
                    name="list"
                    className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={list}
                    onChange={(event) => setList(event.target.value)}
                  >
                    {lists.data.map((list) => (
                      <option key={list.id} value={list.slug}>
                        {list.name}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className={
                      `flex-none rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2` +
                      (submitLoading ? ` opacity-75` : ` hover:bg-indigo-700`)
                    }
                    disabled={submitLoading}
                    onClick={handleAddToList}
                  >
                    {submitLoading ? `Please wait...` : `Add to list`}
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddToListButton;
