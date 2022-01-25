import { useResolvedPath, useMatch, Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

const MobileLink = ({ children, to, ...props }: LinkProps) => {
  // Hooks
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  // Render
  return (
    <Link
      to={to}
      className={
        `block border-l-4 py-2 pl-3 pr-4 text-base font-medium` +
        (match
          ? ` border-indigo-500 bg-indigo-50 text-indigo-700`
          : ` border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800`)
      }
      aria-current={match ? 'page' : undefined}
      {...props}
    >
      {children}
    </Link>
  );
};

export default MobileLink;
