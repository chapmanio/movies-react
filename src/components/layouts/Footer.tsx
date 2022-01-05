import { Link } from 'react-router-dom';

import LinkedInIcon from '../assets/icons/LinkedIn';
import TwitterIcon from '../assets/icons/Twitter';
import GitHubIcon from '../assets/icons/GitHub';

const Footer = () => {
  // Render
  return (
    <footer className="bg-white">
      <div className="px-4 py-12 mx-auto mt-8 overflow-hidden max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2" aria-label="Footer">
          <div className="px-5 py-2">
            <Link to="/lists" className="text-base text-gray-500 hover:text-gray-900">
              My lists
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link to="/my-account" className="text-base text-gray-500 hover:text-gray-900">
              My account
            </Link>
          </div>

          <div className="px-5 py-2">
            <button type="button" className="text-base text-gray-500 hover:text-gray-900">
              Sign out
            </button>
          </div>
        </nav>
        <div className="flex justify-center mt-8 space-x-6">
          <a
            href="https://uk.linkedin.com/in/chapmanio"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">LinkedIn</span>
            <LinkedInIcon className="w-6 h-6" />
          </a>

          <a href="https://twitter.com/chapmanio" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <TwitterIcon className="w-6 h-6" />
          </a>

          <a href="https://github.com/chapmanio" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">GitHub</span>
            <GitHubIcon className="w-6 h-6" />
          </a>
        </div>
        <p className="mt-8 text-base text-center text-gray-400">
          &copy; {new Date().getFullYear()}{' '}
          <a href="https://chapmanio.dev" className="hover:underline">
            chapmanio.dev
          </a>{' '}
          - built with React
        </p>
      </div>
    </footer>
  );
};

export default Footer;
