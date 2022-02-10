import { useEffect, useState } from 'react';

import Modal from '../assets/Modal';
import Alert from '../assets/Alert';
import Notification from '../assets/Notification';

import type { ApiError } from '../../lib/api';
import type { ListItem } from '../../lib/format';
import { addList, addListItem } from '../../lib/api/lists';

import { useListDispatch, useListState } from '../../hooks/useList';

// Types
type AddToListButtonProps = {
  item: ListItem;
  className?: string;
};

// Component
const AddToListButton: React.FC<AddToListButtonProps> = ({ item, className, children }) => {
  // Hooks
  const listState = useListState();
  const listDispatch = useListDispatch();

  // Local state
  const [list, setList] = useState<string | undefined>(undefined);
  const [name, setName] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const [error, setError] = useState<string | undefined>(undefined);

  // Derived state
  const { tmdbId, title, type, poster, subTitle } = item;

  // Effects
  useEffect(() => {
    setList((currentList) => {
      if (currentList) {
        return currentList;
      }

      const selectedList =
        listState.lists.status === 'resolved'
          ? listState.lists.data.find((list) => list.id === listState.selectedId)
          : undefined;

      return selectedList ? selectedList.id : currentList;
    });
  }, [listState]);

  // Handlers
  const handleShowModal = () => {
    setShowComplete(false);
    setSubmitLoading(false);
    setShowModal(true);
  };

  const handleAddList = () => {
    setSubmitLoading(true);

    // First, add the list
    addList(name)
      .then((newList) => {
        listDispatch({ type: 'ADD_LIST', list: newList });

        addListItem({
          listId: newList.id,
          mediaType: type.toUpperCase(), // TODO: type safety?
          tmdbId,
          title,
          subtitle: subTitle,
          posterUrl: poster,
        })
          .then((listItem) => {
            listDispatch({ type: 'ADD_LIST_ITEM', id: newList.id, item: listItem });

            setShowComplete(true);
            setShowModal(false);
          })
          .catch((error: ApiError) => {
            setSubmitLoading(false);
            setError(error.message);
          });
      })
      .catch((error: ApiError) => {
        if (error.status === 422) {
          setSubmitLoading(false);
          setError('A list with this name already exists');
        } else {
          setSubmitLoading(false);
          setError(error.message);
        }
      });
  };

  const handleAddToList = () => {
    setSubmitLoading(true);

    if (list) {
      addListItem({
        listId: list,
        mediaType: type.toUpperCase(), // TODO: type safety?
        tmdbId,
        title,
        subtitle: subTitle,
        posterUrl: poster,
      })
        .then((listItem) => {
          listDispatch({ type: 'ADD_LIST_ITEM', id: list, item: listItem });

          setShowComplete(true);
          setShowModal(false);
        })
        .catch((error: ApiError) => {
          if (error.status === 422) {
            // Already added to the list, just continue
            setShowComplete(true);
            setShowModal(false);
          } else {
            setSubmitLoading(false);
            setError('Unable to add to list');
          }
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
        title={`list-item-${tmdbId}-modal`}
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

            <div className="mt-6 flex space-x-2">
              {listState.lists.status === 'pending' ? (
                <>
                  <div className="h-9 w-2/3 animate-pulse rounded-md bg-gray-100" />
                  <div className="h-9 w-1/3 animate-pulse rounded-md bg-gray-100" />
                </>
              ) : listState.lists.status === 'resolved' ? (
                <>
                  {listState.lists.data.length > 0 ? (
                    <>
                      <select
                        id="list"
                        name="list"
                        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={list}
                        onChange={(event) => setList(event.target.value)}
                      >
                        {listState.lists.data.map((list) => (
                          <option key={list.id} value={list.id}>
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
                  ) : (
                    <>
                      <div className="w-full">
                        <label htmlFor="email" className="sr-only">
                          Email
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="List name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <button
                        type="button"
                        className={
                          `flex-none rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2` +
                          (submitLoading ? ` opacity-75` : ` hover:bg-indigo-700`)
                        }
                        disabled={submitLoading}
                        onClick={handleAddList}
                      >
                        {submitLoading ? `Please wait...` : `Create list`}
                      </button>
                    </>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </Modal>

      <Notification
        visible={showComplete}
        type="success"
        title="Item added"
        onClose={() => setShowComplete(false)}
      />
    </>
  );
};

export default AddToListButton;
