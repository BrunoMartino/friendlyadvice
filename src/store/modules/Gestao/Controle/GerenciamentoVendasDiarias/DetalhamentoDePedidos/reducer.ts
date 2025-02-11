import {
  SETDATAPEDIDOS,
  SETDATAPEDIDOSGRANDTOTAL,
  SETDATAPEDIDOSTOTALPAGE,
  SET_LIMPAR_DADOS_VENDA,
} from './action';

const INITIALSTATE = {
  detalhesPedidos: [],
  grandTotal: [],
  totalPerPage: [],
};

const detalhamentoPedidos = (state = INITIALSTATE, action: any) => {
  switch (action.type) {
    case SETDATAPEDIDOS:
      state = { ...state, detalhesPedidos: action.payload };
      return state;
    case SETDATAPEDIDOSGRANDTOTAL:
      state = { ...state, grandTotal: action.payload };
      return state;
    case SETDATAPEDIDOSTOTALPAGE:
      state = { ...state, totalPerPage: action.payload };
      return state;
    case SET_LIMPAR_DADOS_VENDA:
      state = { ...state,   detalhesPedidos: [],
        grandTotal: [],
        totalPerPage: [],};
      return state;
    default:
      return state;
  }
};

export default detalhamentoPedidos;
