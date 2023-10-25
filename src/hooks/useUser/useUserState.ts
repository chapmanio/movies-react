import { useContext } from "react";
import { UserStateContext } from "./UserProvider";

export const useUserState = () => {
  const state = useContext(UserStateContext);

  if (typeof state === "undefined") {
    throw new Error("useUserState must be used within a UserStateContext");
  }

  return state;
};
