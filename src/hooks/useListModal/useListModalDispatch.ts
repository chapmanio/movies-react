import { useContext } from "react";
import { ListModalDispatchContext } from "./ListModalProvider";

export const useListModalDispatch = () => {
  const dispatch = useContext(ListModalDispatchContext);

  if (typeof dispatch === "undefined") {
    throw new Error(
      "useListModalDispatch must be used within a ListModalDispatchContext",
    );
  }

  return dispatch;
};
