import { useContext } from "react";
import { ListDispatchContext } from "./ListProvider";

export const useListDispatch = () => {
  const dispatch = useContext(ListDispatchContext);

  if (typeof dispatch === "undefined") {
    throw new Error(
      "useListDispatch must be used within a ListDispatchContext",
    );
  }

  return dispatch;
};
