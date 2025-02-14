import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import difference from 'lodash/difference';

type ServiceOrderState = {
  page: number;
  pagesTotal: number;
  selectedItems: string[];
  stickyItemSelected: string;
  globalCheck: {
    [key: number]: boolean;
  };
};

type ServiceOrderContextValue = ServiceOrderState & {
  setPage: (actualPage: number) => void;
  addSelectedItem: (item: string) => void;
  removeSelectedItem: (item: string) => void;
  selectStickyMenu: (menu: string) => void;
  clearSelectedStickyMenu: () => void;
  resetState: () => void;
  toggleAllItems: (isChecked: boolean, items: string[]) => void;
  createNewPage: () => void;
  setPagesTotal: (pagesTotal: number) => void;
};

const initialState: ServiceOrderState = {
  page: 0,
  pagesTotal: 0,
  selectedItems: [],
  stickyItemSelected: '',
  globalCheck: {
    0: false,
  },
};

export const OrderServiceContext =
  createContext<ServiceOrderContextValue | null>(null);

export function useOrderServiceContext() {
  const orderServiceCtx = useContext(OrderServiceContext);

  if (orderServiceCtx === null) {
    throw new Error('OrderService is empty');
  }

  return orderServiceCtx;
}

type OrderServiceContextProviderProps = {
  children: ReactNode;
};

type SetPageAction = {
  type: 'SET_PAGE';
  payload: number;
};

type AddSelectItemAction = {
  type: 'ADD_ITEM';
  payload: string;
};

type RemoveSelectedItemAction = {
  type: 'REMOVE_ITEM';
  payload: string;
};

type SelectStickyMenuAction = {
  type: 'SELECT_STICKY_MENU';
  payload: string;
};

type ClearSelectedStickyMenuAction = {
  type: 'CLEAR_SELECTED_STICKY_MENU';
};

type ToggleAllSelectedItemAction = {
  type: 'TOGGLE_ALL_SELECTED_ITEM';
  payload: {
    checked: boolean;
    values: string[];
  };
};

type CreateNewPageAction = {
  type: 'CREATE_NEW_PAGE';
};

type ResetStateAction = {
  type: 'RESET_STATE';
};

type SetPagesTotalAction = {
  type: 'SET_PAGES_TOTAL';
  payload: number;
};

type Action =
  | SetPageAction
  | AddSelectItemAction
  | RemoveSelectedItemAction
  | SelectStickyMenuAction
  | ClearSelectedStickyMenuAction
  | ToggleAllSelectedItemAction
  | CreateNewPageAction
  | ResetStateAction
  | SetPagesTotalAction;

function orderServiceReducer(
  state: ServiceOrderState,
  action: Action,
): ServiceOrderState {
  switch (action.type) {
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      };
    case 'SET_PAGES_TOTAL':
      return {
        ...state,
        pagesTotal: action.payload,
      };
    case 'ADD_ITEM':
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.payload],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        selectedItems: state.selectedItems.filter(
          (item: string) => item !== action.payload,
        ),
      };
    case 'SELECT_STICKY_MENU':
      return {
        ...state,
        stickyItemSelected: action.payload,
      };
    case 'CLEAR_SELECTED_STICKY_MENU':
      return {
        ...state,
        stickyItemSelected: '',
      };
    case 'TOGGLE_ALL_SELECTED_ITEM':
      let newItems: string[] = [];
      if (action.payload.checked) {
        newItems = [...state.selectedItems];
        action.payload.values.forEach((item: string) => {
          if (!newItems.includes(item)) newItems = [...newItems, item];
        });
      } else {
        newItems = difference(state.selectedItems, action.payload.values);
      }
      return {
        ...state,
        selectedItems: newItems,
        globalCheck: {
          ...state.globalCheck,
          [state.page]: action.payload.checked,
        },
      };

    case 'CREATE_NEW_PAGE':
      return {
        ...state,
        globalCheck: {
          ...state.globalCheck,
          [state.page]: false,
        },
      };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

export default function OrderServiceContextProvevider({
  children,
}: OrderServiceContextProviderProps) {
  const [orderServiceState, dispatch] = useReducer(
    orderServiceReducer,
    initialState,
  );

  const ctx: ServiceOrderContextValue = {
    page: orderServiceState.page,
    pagesTotal: orderServiceState.pagesTotal,
    selectedItems: orderServiceState.selectedItems,
    stickyItemSelected: orderServiceState.stickyItemSelected,
    globalCheck: orderServiceState.globalCheck,

    setPage(actualPage: number) {
      dispatch({ type: 'SET_PAGE', payload: actualPage });
    },
    addSelectedItem(item: string) {
      dispatch({ type: 'ADD_ITEM', payload: item });
    },
    removeSelectedItem(item: string) {
      dispatch({ type: 'REMOVE_ITEM', payload: item });
    },
    selectStickyMenu(menu: string) {
      dispatch({ type: 'SELECT_STICKY_MENU', payload: menu });
    },
    toggleAllItems(isChecked, values: string[]) {
      dispatch({
        type: 'TOGGLE_ALL_SELECTED_ITEM',
        payload: { checked: isChecked, values },
      });
    },
    clearSelectedStickyMenu() {
      dispatch({ type: 'CLEAR_SELECTED_STICKY_MENU' });
    },
    resetState() {
      dispatch({ type: 'RESET_STATE' });
    },
    createNewPage() {
      dispatch({ type: 'CREATE_NEW_PAGE' });
    },
    setPagesTotal(total: number) {
      dispatch({ type: 'SET_PAGES_TOTAL', payload: total });
    }
  };

  return (
    <OrderServiceContext.Provider value={ctx}>
      {children}
    </OrderServiceContext.Provider>
  );
}
