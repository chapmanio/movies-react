import { Navigate } from "react-router-dom";

import Loading from "./Loading";

import { useUserState } from "../../hooks/useUser";

const WithAuth = ({
  restricted = true,
  children,
}: {
  children: React.ReactNode;
  restricted?: boolean;
}) => {
  const userState = useUserState();

  const authedUser = userState.status === "resolved" && userState.data.auth;

  // Render
  if (userState.status === "pending") {
    return <Loading />;
  }

  if ((restricted && !authedUser) || (!restricted && authedUser)) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default WithAuth;
