import { Navigate } from 'react-router-dom';

import Loading from './Loading';

import { useUserState } from '../../hooks/useUser';

// Types
type WithAuthProps = {
  restricted?: boolean;
};

// Component
const WithAuth: React.FC<WithAuthProps> = ({ restricted = true, children }) => {
  // Hooks
  const userState = useUserState();

  // Derived state
  const authedUser = userState.status === 'resolved' && userState.data.auth;

  // Render
  return userState.status === 'pending' ? (
    <Loading />
  ) : (restricted && !authedUser) || (!restricted && authedUser) ? (
    <Navigate to="/" replace={true} />
  ) : (
    <>{children}</>
  );
};

export default WithAuth;
