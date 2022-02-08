import { createContext, useReducer, useContext } from 'react';

// Types
type ListAction = { type: 'SET_CURRENT_LIST'; slug: string } | { type: 'CLEAR_CURRENT_LIST' };

type ListState = { slug?: string };
type ListDispatch = (action: ListAction) => void;

// Context
const ListStateContext = createContext<ListState | undefined>(undefined);
const ListDispatchContext = createContext<ListDispatch | undefined>(undefined);

// Reducer
const listReducer = (state: ListState, action: ListAction): ListState => {
  switch (action.type) {
    case 'SET_CURRENT_LIST': {
      return {
        ...state,
        slug: action.slug,
      };
    }
    case 'CLEAR_CURRENT_LIST': {
      return {
        ...state,
        slug: undefined,
      };
    }
    default:
      throw new Error(`Unhandled action type`);
  }
};

// Provider
const ListProvider: React.FC<{ initialState?: ListState }> = ({ children, initialState }) => {
  // Reducer
  const [state, dispatch] = useReducer(listReducer, initialState ?? { slug: undefined });

  // Render
  return (
    <ListStateContext.Provider value={state}>
      <ListDispatchContext.Provider value={dispatch}>{children}</ListDispatchContext.Provider>
    </ListStateContext.Provider>
  );
};

// Hook
const useListState = () => {
  const state = useContext(ListStateContext);

  if (typeof state === 'undefined') {
    throw new Error('useListState must be used within a ListStateContext');
  }

  return state;
};

const useListDispatch = () => {
  const dispatch = useContext(ListDispatchContext);

  if (typeof dispatch === 'undefined') {
    throw new Error('useListDispatch must be used within a ListDispatchContext');
  }

  return dispatch;
};

export { ListProvider, useListState, useListDispatch };
