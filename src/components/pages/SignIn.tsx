import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/solid";

import Alert from "../assets/Alert";

import { useUserDispatch } from "../../hooks/useUser";

import { signIn } from "../../lib/api/auth";
import { ApiError } from "../../lib/api";

const SignIn = () => {
  const navigate = useNavigate();
  const userDispatch = useUserDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(undefined);
    setSubmitLoading(true);

    signIn({ email, password })
      .then((user) => {
        userDispatch({
          type: "SET_USER",
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
        navigate("/", { replace: true });
      })
      .catch((error: ApiError) => {
        setSubmitLoading(false);
        setError(error.message);
      });
  };

  // Render
  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>

      <div className="mx-auto mt-10 max-w-md space-y-8 px-4 sm:px-6">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        {error ? (
          <Alert
            type="error"
            message={error}
            onClose={() => setError(undefined)}
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
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                `group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2` +
                (submitLoading ? ` opacity-75` : ` hover:bg-indigo-700`)
              }
              disabled={submitLoading}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>

              {submitLoading ? `Please wait...` : `Sign in`}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
