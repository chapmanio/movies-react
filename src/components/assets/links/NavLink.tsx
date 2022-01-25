import { useResolvedPath, useMatch, Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

const NavLink = ({ children, to, ...props }: LinkProps) => {
  // Hooks
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  // Render
  return (
    <Link
      to={to}
      className={
        `inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium` +
        (match
          ? ` border-indigo-500 text-gray-900`
          : ` border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700`)
      }
      aria-current={match ? 'page' : undefined}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
