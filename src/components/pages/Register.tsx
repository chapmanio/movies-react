import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

import Alert from '../assets/Alert';

import { useUserDispatch, useUserState } from '../../hooks/useUser';

import { registerUser } from '../../lib/api/auth';

const Register = () => {
  // Hooks
  const navigate = useNavigate();
  const userState = useUserState();
  const userDispatch = useUserDispatch();

  // Local state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  // Effects
  useEffect(() => {
    if (userState.status === 'resolved' && userState.data.auth) {
      // Bounce home if already signed in
      navigate('/', { replace: true });
    }
  }, [userState, navigate]);

  // Handlers
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirm) {
      userDispatch({ type: 'ERROR', error: new Error('Passwords do not match') });
    } else {
      userDispatch({ type: 'LOADING' });

      registerUser({ email, password })
        .then((user) => {
          userDispatch({
            type: 'SET_USER',
            user: {
              auth: true,
              user: {
                userId: user.id,
                email: user.email,
              },
            },
          });
        })
        .catch((error: Error) => {
          userDispatch({ type: 'ERROR', error });
        });
    }
  };

  // Render
  return (
    <>
      <Helmet>
        <title>Create account</title>
      </Helmet>

      <div className="max-w-md px-4 mx-auto mt-10 space-y-8 sm:px-6">
        <div>
          <h2 className="text-3xl font-extrabold text-center text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Or{' '}
            <Link to="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign-in to an existing account
            </Link>
          </p>
        </div>

        {userState.status === 'rejected' ? (
          <Alert
            type="error"
            message={userState.error ? userState.error.message : `Something went wrong`}
          />
        ) : null}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />

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
              className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-nonefocus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                `w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500` +
                (userState.status === 'pending' ? ` opacity-75` : ` hover:bg-indigo-700`)
              }
              disabled={userState.status === 'pending'}
            >
              {userState.status === 'pending' ? `Please wait...` : `Create account`}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
