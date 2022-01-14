import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid';

import Alert from '../assets/Alert';

import { useUserDispatch, useUserState } from '../../hooks/useUser';
import { signIn } from '../../lib/api/auth';

const SignIn = () => {
  // Hooks
  const navigate = useNavigate();
  const userState = useUserState();
  const userDispatch = useUserDispatch();

  // Local state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handlers
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    userDispatch({ type: 'LOADING' });

    signIn({ email, password })
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

        // Bounce home
        navigate('/', { replace: true });
      })
      .catch((error: Error) => {
        userDispatch({ type: 'ERROR', error });
      });
  };

  // Render
  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>

      <div className="max-w-md px-4 mx-auto mt-10 space-y-8 sm:px-6">
        <div>
          <h2 className="text-3xl font-extrabold text-center text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              create a new account
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
          <div className="-space-y-px rounded-md shadow-sm">
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
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={
                `relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500` +
                (userState.status === 'pending' ? ` opacity-75` : ` hover:bg-indigo-700`)
              }
              disabled={userState.status === 'pending'}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>

              {userState.status === 'pending' ? `Please wait...` : `Sign in`}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
