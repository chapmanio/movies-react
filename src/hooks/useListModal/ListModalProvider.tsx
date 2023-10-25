import { createContext, useReducer } from "react";

import type { List } from "../../lib/api/types";
import type { ListItem } from "../../lib/format";

// Types
type ListOperation = "add" | "remove";

type ListModalAction =
  | { type: "SHOW_ADD_MODAL"; item: ListItem }
  | { type: "SHOW_REMOVE_MODAL"; list: List; item: ListItem }
  | { type: "HIDE_MODAL" };

type ListModalBaseState = {
  item?: ListItem;
  list?: List;
  operation?: ListOperation;
};

interface ListModalAddState extends ListModalBaseState {
  visible: true;
  operation: "add";
  item: ListItem;
}

interface ListModalRemoveState extends ListModalBaseState {
  visible: true;
  operation: "remove";
  list: List;
  item: ListItem;
}

interface ListModalHiddenState extends ListModalBaseState {
  visible: false;
}

type ListModalState =
  | ListModalAddState
  | ListModalRemoveState
  | ListModalHiddenState;
type ListModalDispatch = (action: ListModalAction) => void;

// Initial state
const defaultInitialState: ListModalState = { visible: false };

// Context
export const ListModalStateContext = createContext<ListModalState | undefined>(
  undefined,
);
export const ListModalDispatchContext = createContext<
  ListModalDispatch | undefined
>(undefined);

// Reducer
const ListModalReducer = (
  state: ListModalState,
  action: ListModalAction,
): ListModalState => {
  switch (action.type) {
    case "SHOW_ADD_MODAL": {
      return {
        visible: true,
        item: action.item,
        operation: "add",
      };
    }
    case "SHOW_REMOVE_MODAL": {
      return {
        visible: true,
        list: action.list,
        item: action.item,
        operation: "remove",
      };
    }
    case "HIDE_MODAL": {
      return {
        ...state,
        visible: false,
      };
    }
    default:
      throw new Error(`Unhandled action type`);
  }
};

// Provider
export const ListModalProvider = ({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState?: ListModalState;
}) => {
  // Reducer
  const [state, dispatch] = useReducer(
    ListModalReducer,
    initialState ?? defaultInitialState,
  );

  // Render
  return (
    <ListModalStateContext.Provider value={state}>
      <ListModalDispatchContext.Provider value={dispatch}>
        {children}
      </ListModalDispatchContext.Provider>
    </ListModalStateContext.Provider>
  );
};
