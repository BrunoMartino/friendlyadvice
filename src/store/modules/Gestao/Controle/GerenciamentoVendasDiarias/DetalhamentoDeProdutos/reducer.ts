import { SETPRODUTODATA } from './action';

const INITIALSTATE = {
  detalhesProdutos: []
};

const detalhamentoProdutos = (state = INITIALSTATE, action: any) => {
  switch (action.type) {
    case SETPRODUTODATA:
      state = { ...state, detalhesProdutos: action.payload };
      return state;
    default:
      return state;
  }
};

export default detalhamentoProdutos;
