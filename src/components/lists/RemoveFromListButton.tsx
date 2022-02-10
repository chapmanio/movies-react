import { useState } from 'react';

import Modal from '../assets/Modal';
import Alert from '../assets/Alert';
import Notification from '../assets/Notification';

import type { ListItem } from '../../lib/format';
import type { List } from '../../lib/api/types';
import { deleteListItem } from '../../lib/api/lists';
import { ApiError } from '../../lib/api';

import { useListDispatch } from '../../hooks/useList';

// Types
type RemoveFromListButtonProps = {
  item: ListItem;
  list: List;
  className?: string;
};

// Component
const RemoveFromListButton: React.FC<RemoveFromListButtonProps> = ({
  item,
  list,
  className,
  children,
}) => {
  // Hooks
  const listDispatch = useListDispatch();

  // Local state
  const [showModal, setShowModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const [error, setError] = useState<string | undefined>(undefined);

  // Derived state
  const { dbId, title, type, poster, subTitle } = item;

  // Handlers
  const handleShowModal = () => {
    setShowComplete(false);
    setSubmitLoading(false);
    setShowModal(true);
  };

  const handleRemoveFromList = () => {
    setSubmitLoading(true);

    if (dbId) {
      deleteListItem({
        listId: list.id,
        listItemId: dbId,
      })
        .then(() => {
          listDispatch({ type: 'REMOVE_LIST_ITEM', id: list.id, itemId: dbId });

          setShowComplete(true);
          setShowModal(false);
        })
        .catch((error: ApiError) => {
          setSubmitLoading(false);
          setError(error.message);
        });
    }
  };

  // Render
  return (
    <>
      <button type="button" className={className} onClick={handleShowModal}>
        {children}
      </button>

      <Modal
        title={`list-item-${dbId}-modal`}
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

            {error ? (
              <div className="mt-6">
                <Alert type="error" message={error} onClose={() => setError(undefined)} />
              </div>
            ) : null}

            <p className="mt-5 text-gray-600">
              Remove from <span className="font-bold">{list.name}</span>?
            </p>

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className={
                  `inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm` +
                  (submitLoading ? ` opacity-75` : ` hover:bg-red-700`)
                }
                onClick={handleRemoveFromList}
                disabled={submitLoading}
              >
                {submitLoading ? `Please wait...` : `Remove`}
              </button>
              <button
                type="button"
                className={
                  `mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm` +
                  (submitLoading ? ` opacity-75` : ` hover:bg-gray-50`)
                }
                onClick={() => setShowModal(false)}
                disabled={submitLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Notification
        visible={showComplete}
        type="success"
        title="Item removed"
        onClose={() => setShowComplete(false)}
      />
    </>
  );
};

export default RemoveFromListButton;
