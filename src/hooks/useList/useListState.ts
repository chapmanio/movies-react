import { useContext } from "react";
import { ListStateContext } from "./ListProvider";

export const useListState = () => {
  const state = useContext(ListStateContext);

  if (typeof state === "undefined") {
    throw new Error("useListState must be used within a ListStateContext");
  }

  return state;
};
