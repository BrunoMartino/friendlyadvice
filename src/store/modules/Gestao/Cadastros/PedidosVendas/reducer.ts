import {
  SET_CLEAN,
  SET_ALL_PEDIDOS_VENDAS,
  SET_LOADING_PEDIDOS_VENDAS,
  SHOW_PEDIDO_VENDA_SELECTED,
} from './action';

const initialState: any = {
  pedidoVendaSelecionado: {},
  allPedidosVendas: [],
  loading: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_PEDIDO_VENDA_SELECTED: {
      return { ...state, pedidoVendaSelecionado: { ...action.payload } };
    }
    case SET_ALL_PEDIDOS_VENDAS: {
      return { ...state, allPedidosVendas: { ...action.payload } };
    }
    case SET_LOADING_PEDIDOS_VENDAS: {
      return { ...state, loading: action.payload };
    }
    case SET_CLEAN:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
