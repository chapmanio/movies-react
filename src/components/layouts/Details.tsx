import { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { SearchIcon } from '@heroicons/react/solid';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import NavLink from './links/NavLink';
import AccountLink from './links/AccountLink';
import MobileLink from './links/MobileLink';
import Footer from './Footer';

const DetailsLayout = () => {
  // Local state
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showSubNav, setShowSubNav] = useState(false);

  // Refs
  const mobileNavRef = useRef<HTMLButtonElement>(null);
  const subNavRef = useRef<HTMLButtonElement>(null);

  // Effects
  useEffect(() => {
    const outsideClickListener = (event: MouseEvent) => {
      const element = event.target as Element;

      const mobileNav = mobileNavRef.current;
      const subNav = subNavRef.current;

      if (mobileNav && !mobileNav.contains(element)) {
        setShowMobileNav(false);
      }

      if (subNav && !subNav.contains(element)) {
        setShowSubNav(false);
      }
    };

    document.addEventListener('click', outsideClickListener);

    return () => {
      document.removeEventListener('click', outsideClickListener);
    };
  }, []);

  // Handers
  const handleSubNav = (event: React.MouseEvent) => {
    // To enable document.click event listener above
    event.stopPropagation();

    setShowSubNav((show) => !show);
    setShowMobileNav(false);
  };

  const handleMobileNav = (event: React.MouseEvent) => {
    // To enable document.click event listener above
    event.stopPropagation();

    setShowMobileNav((show) => !show);
    setShowSubNav(false);
  };

  // Render
  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex flex-1">
              <div className="flex items-center flex-shrink-0">
                <Link
                  to="/"
                  className="text-2xl font-bold text-gray-900 md:text-4xl sm:tracking-tight"
                >
                  Movies
                </Link>
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <NavLink to="/lists">My lists</NavLink>
              </div>
            </div>
            <form
              method="get"
              action="/"
              className="self-center w-full max-w-xs ml-2 sm:ml-6 lg:max-w-lg"
            >
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative text-gray-400 rounded-md focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <SearchIcon className="w-5 h-5" />
                </div>
                <input
                  id="search"
                  className="block w-full pl-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                  name="search"
                />
              </div>
            </form>

            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    id="user-menu-button"
                    aria-expanded={showSubNav}
                    aria-haspopup="true"
                    onClick={handleSubNav}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>

                <div
                  className={
                    `origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none` +
                    (showSubNav
                      ? ` ease-out duration-100 opacity-100 scale-100`
                      : ` ease-in duration-75 opacity-0 scale-95`)
                  }
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  <AccountLink to="/my-account" role="menuitem" tabIndex={-1} id="user-menu-item-0">
                    My account
                  </AccountLink>

                  <button
                    type="button"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-1"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center ml-2 -mr-2 sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-controls="mobile-menu"
                aria-expanded={showMobileNav}
                ref={mobileNavRef}
                onClick={handleMobileNav}
              >
                <span className="sr-only">Open main menu</span>

                <MenuIcon className={`h-6 w-6` + (showMobileNav ? ` hidden` : ` block`)} />
                <XIcon className={`h-6 w-6` + (showMobileNav ? ` block` : ` hidden`)} />
              </button>
            </div>
          </div>
        </div>

        {showMobileNav ? (
          <div className="sm:hidden" id="mobile-menu">
            <div className="pt-2 pb-3 space-y-1">
              <MobileLink to="/lists">My lists</MobileLink>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Tom Cook</div>
                  <div className="text-sm font-medium text-gray-500">tom@example.com</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  to="/my-account"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  My account
                </Link>

                <button
                  type="button"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </nav>

      <Outlet />

      <Footer />
    </>
  );
};

export default DetailsLayout;
