import { useResolvedPath, useMatch, Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

const AccountLink = ({ children, to, ...props }: LinkProps) => {
  // Hooks
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  // Render
  return (
    <Link
      to={to}
      className={`block py-2 px-4 text-sm text-gray-700` + (match ? ` bg-gray-100` : ``)}
      {...props}
    >
      {children}
    </Link>
  );
};

export default AccountLink;
