import { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Alert from '../assets/Alert';
import List from '../lists/List';
import Notification, { NotificationProps } from '../assets/Notification';

import { addList, deleteList, getAllLists, updateList } from '../../lib/api/lists';
import type { List as ListType } from '../../lib/api/types';
import type { ApiResponse } from '../../lib/api';

// Types
type Confirm = Omit<NotificationProps, 'onClose'>;

// Component
const Lists = () => {
  // Local state
  const [lists, setLists] = useState<ApiResponse<ListType[]>>({ status: 'pending' });

  const [slug, setSlug] = useState<string | undefined>(undefined);
  const [name, setName] = useState('');

  const [submitLoading, setSubmitLoading] = useState(false);
  const [confirm, setConfirm] = useState<Confirm>({
    type: 'success',
    title: '',
    visible: false,
  });
  const [error, setError] = useState<string | undefined>(undefined);

  // Refs
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Callbacks
  const actionComplete = useCallback((message: string) => {
    // Scroll to the top
    if (titleRef.current) {
      titleRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    // Clear the form
    setSlug(undefined);
    setName('');
    setSubmitLoading(false);

    // Show the notification
    setConfirm((confirm) => ({
      ...confirm,
      visible: true,
      title: message,
    }));
  }, []);

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
        setError(error.message);
      });
  }, []);

  // Handlers
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name.trim() !== '') {
      setError(undefined);
      setSubmitLoading(true);

      if (slug) {
        updateList({ slug, name })
          .then((list) => {
            // Update list
            if (lists.status === 'resolved') {
              const updatedLists = lists.data.map((item) => (item.slug === slug ? list : item));

              setLists((lists) => ({
                ...lists,
                data: updatedLists,
              }));

              // Clear form and confirm
              actionComplete('List updated');
            }
          })
          .catch((error: Error) => {
            setSubmitLoading(false);
            setError(error.message);
          });
      } else {
        addList(name)
          .then((list) => {
            // Add to lists
            if (lists.status === 'resolved') {
              const newLists = [...lists.data, list].sort((a, b) => a.name.localeCompare(b.name));

              setLists((lists) => ({
                ...lists,
                data: newLists,
              }));

              // Clear form and confirm
              actionComplete('List added');
            }
          })
          .catch((error: Error) => {
            setSubmitLoading(false);
            setError(error.message);
          });
      }
    }
  };

  const handleCancel = () => {
    setSlug(undefined);
    setName('');
  };

  const handleEdit = (slug: string) => {
    if (lists.status === 'resolved') {
      const list = lists.data.find((list) => list.slug === slug);

      if (list) {
        if (titleRef.current) {
          titleRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        setSlug(list.slug);
        setName(list.name);
      }
    }
  };

  const handleDelete = (slug: string) => {
    deleteList(slug)
      .then(() => {
        if (lists.status === 'resolved') {
          // Remove from lists
          const newLists = lists.data.filter((item) => item.slug !== slug);

          setLists((lists) => ({
            ...lists,
            data: newLists,
          }));

          // Clear and confirm
          actionComplete('List removed');
        }
      })
      .catch((error: Error) => {
        setError(error.message);
      });
  };

  // Render
  return (
    <>
      <Helmet>
        <title>My lists</title>
      </Helmet>

      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900" ref={titleRef}>
          My lists
        </h2>

        {error ? (
          <div className="mt-5">
            <Alert type="error" message={error} onClose={() => setError(undefined)} />
          </div>
        ) : null}

        <form className="mt-5 sm:flex sm:items-center" onSubmit={handleSubmit}>
          <div className="w-full sm:max-w-xs">
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
            type="submit"
            className={
              `mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm` +
              (submitLoading ? ` opacity-75` : ` hover:bg-indigo-700`)
            }
            disabled={submitLoading}
          >
            {submitLoading ? `Please wait...` : slug ? `Edit list` : `Create list`}
          </button>

          {slug ? (
            <button
              type="button"
              className={
                `mt-3 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm` +
                (submitLoading ? ` opacity-75` : ` hover:bg-gray-50`)
              }
              disabled={submitLoading}
              onClick={handleCancel}
            >
              Cancel
            </button>
          ) : null}
        </form>

        {lists.status === 'pending' ? (
          <div className="mt-10 animate-pulse">
            <div className="flex items-center space-x-8">
              <div className="mt-2 h-7 w-36 rounded bg-gray-100" />
              <div className="mt-2 h-7 w-2 rounded bg-gray-100" />
            </div>

            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-8 lg:gap-x-8 xl:gap-x-12">
              <li className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100" />
              <li className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100" />
              <li className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100" />
              <li className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100" />
              <li className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100" />
              <li className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100" />
              <li className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100" />
              <li className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100" />
            </ul>
          </div>
        ) : lists.status === 'resolved' ? (
          <>
            {lists.data.map((list) => (
              <div key={list.id} className="mt-10">
                <List
                  item={list}
                  onEdit={() => handleEdit(list.slug)}
                  onDelete={() => handleDelete(list.slug)}
                />
              </div>
            ))}
          </>
        ) : null}
      </div>

      <Notification
        {...confirm}
        onClose={() => setConfirm((confirm) => ({ ...confirm, visible: false }))}
      />
    </>
  );
};

export default Lists;
