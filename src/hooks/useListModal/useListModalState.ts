import { useContext } from "react";
import { ListModalStateContext } from "./ListModalProvider";

export const useListModalState = () => {
  const state = useContext(ListModalStateContext);

  if (typeof state === "undefined") {
    throw new Error(
      "useListModalState must be used within a ListModalStateContext",
    );
  }

  return state;
};
