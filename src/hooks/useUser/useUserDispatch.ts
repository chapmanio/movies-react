import { useContext } from "react";
import { UserDispatchContext } from "./UserProvider";

export const useUserDispatch = () => {
  const dispatch = useContext(UserDispatchContext);

  if (typeof dispatch === "undefined") {
    throw new Error(
      "useUserDispatch must be used within a UserDispatchContext",
    );
  }

  return dispatch;
};
