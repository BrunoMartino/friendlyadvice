import {
  DESELECT_ORDER,
  LOADING_ORDER_CONTENT,
  LOAD_ORDERS,
  RELOAD_PRE_SAVED_ORDER,
  SAVE_JOURNEY,
  SET_ORDER_ID,
} from './action';

const initialState = {
  ordersWithErrors: [],
  currentOrder: {},
  loadingOrders: false,
};

type alreadySelectedOrder = {
  // data: DataItem[];
  // contentObj: Item;
  // complemento: complementosItem[];
  open: boolean;
};

interface Ipayload {
  indexOriginal: number;
  // changedObject: {
  //   normal: Item;
  //   pizza: Item;
  // };
  // originalObject: OrderObject;
}

const gestaoDeErros = (state = initialState, action: any) => {
  switch (action.type) {
    case RELOAD_PRE_SAVED_ORDER:
      const { indexOriginal, changedObject, originalObject }: any =
        action.payload;

      let copyOriginalArray = { ...originalObject };

      let copyItensArray = originalObject.itens.with(
        indexOriginal,
        changedObject.pizza ?? changedObject,
      );

      copyOriginalArray.itens = copyItensArray;

      return { ...state, currentOrder: copyOriginalArray };
    case SET_ORDER_ID:
      return { ...state, currentOrder: action.payload };
    case LOAD_ORDERS:
      return {
        ...state,
        ordersWithErrors: action.payload,
      };
    case LOADING_ORDER_CONTENT:
      return {
        ...state,
        loadingOrders: action.payload,
      };
    case DESELECT_ORDER:
      return {
        ...state,
        currentOrder: {},
        loadingOrders: false,
      };
    case SAVE_JOURNEY:
      return { ...state, savedJouney: action.payload };
    default:
      return state;
  }
};

export default gestaoDeErros;
