import { Outlet } from 'react-router-dom';

import Footer from './Footer';

const HomeLayout = () => {
  // Render
  return (
    <>
      <div className="pt-16 mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">React</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Movies
          </p>
          <p className="max-w-xl mx-auto mt-5 text-xl text-gray-500">
            Built on top of Vercel{' '}
            <a
              href="https://vercel.com/docs/concepts/functions/introduction"
              rel="nofollow noreferrer"
              className="font-semibold hover:text-indigo-600"
            >
              serverless functions
            </a>
            , connected to a{' '}
            <a
              href="https://www.prisma.io/"
              rel="nofollow noreferrer"
              className="font-semibold hover:text-indigo-600"
            >
              Prisma
            </a>
            -managed database, and interacting with{' '}
            <a
              href="https://developers.themoviedb.org/"
              rel="nofollow noreferrer"
              className="font-semibold hover:text-indigo-600"
            >
              The Movie Database API
            </a>
            .
          </p>
        </div>
      </div>

      <Outlet />

      <Footer />
    </>
  );
};

export default HomeLayout;
