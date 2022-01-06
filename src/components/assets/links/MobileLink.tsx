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
        `block pl-3 pr-4 py-2 border-l-4 text-base font-medium` +
        (match
          ? ` bg-indigo-50 border-indigo-500 text-indigo-700`
          : ` border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800`)
      }
      aria-current={match ? 'page' : undefined}
      {...props}
    >
      {children}
    </Link>
  );
};

export default MobileLink;
