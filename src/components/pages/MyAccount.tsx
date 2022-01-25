import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Alert from '../assets/Alert';
import Notification from '../assets/Notification';

import { useUserDispatch, useUserState } from '../../hooks/useUser';

import { updateUser } from '../../lib/api/auth';

const MyAccount = () => {
  // Hooks
  const userState = useUserState();
  const userDispatch = useUserDispatch();

  // Local state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [submitLoading, setSubmitLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  // Effects
  useEffect(() => {
    if (userState.status === 'resolved' && userState.data.auth) {
      setName(userState.data.user.name);
      setEmail(userState.data.user.email);
    }
  }, [userState]);

  // Handlers
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userState.status === 'resolved' && userState.data.auth) {
      if (password !== confirm) {
        setError('Passwords do not match');
      } else {
        setError(undefined);
        setSubmitLoading(true);
        setShowConfirm(false);

        updateUser({
          name,
          email,
          password,
        })
          .then((user) => {
            userDispatch({
              type: 'SET_USER',
              user: {
                auth: true,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              },
            });

            setSubmitLoading(false);
            setShowConfirm(true);
          })
          .catch((error: Error) => {
            setSubmitLoading(false);
            setError(error.message);
          });
      }
    }
  };

  // Render
  return (
    <>
      <Helmet>
        <title>My account</title>
      </Helmet>

      <div className="mx-auto mt-10 max-w-md space-y-6 px-4 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">My account</h2>

        {error ? <Alert type="error" message={error} onClose={() => setError(undefined)} /> : null}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="appearance-nonefocus:outline-none relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-nonefocus:outline-none relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-2 -space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm" className="sr-only">
                Password
              </label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                autoComplete="confirm-password"
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={
                `group w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2` +
                (submitLoading ? ` opacity-75` : ` hover:bg-indigo-700`)
              }
              disabled={submitLoading}
            >
              {submitLoading ? `Please wait...` : `Update account`}
            </button>
          </div>
        </form>
      </div>

      <Notification
        visible={showConfirm}
        type="success"
        title="Account updated"
        onClose={() => setShowConfirm(false)}
      />
    </>
  );
};

export default MyAccount;
