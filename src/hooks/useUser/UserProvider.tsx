import { createContext, useReducer, useEffect } from "react";

import { ApiResponse } from "../../lib/api";
import { AuthUser, authUser } from "../../lib/api/auth";

// Types
type UserAction =
  | { type: "LOADING" }
  | { type: "SET_USER"; user: AuthUser }
  | { type: "ERROR"; error?: Error };

type UserState = ApiResponse<AuthUser>;
type UserDispatch = (action: UserAction) => void;

// Context
export const UserStateContext = createContext<UserState | undefined>(undefined);
export const UserDispatchContext = createContext<UserDispatch | undefined>(
  undefined,
);

// Reducer
const authReducer = (_state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "LOADING": {
      return { status: "pending" };
    }
    case "SET_USER": {
      return {
        status: "resolved",
        data: action.user,
      };
    }
    case "ERROR": {
      return {
        status: "rejected",
        error: action.error,
      };
    }
    default:
      throw new Error(`Unhandled action type`);
  }
};

// Provider
export const UserProvider = ({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState?: UserState;
}) => {
  // Reducer
  const [state, dispatch] = useReducer(
    authReducer,
    initialState ?? { status: "pending" },
  );

  // Effects
  useEffect(() => {
    // Check the initial auth state on load
    dispatch({ type: "LOADING" });

    authUser()
      .then((user) => {
        dispatch({ type: "SET_USER", user });
      })
      .catch((error) => {
        dispatch({ type: "ERROR", error });
      });
  }, []);

  // Render
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};
