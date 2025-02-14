import { SETFORMADEPAGAMENTO } from './action';

const INITIALSTATE = {
  detalhesPagamento: [],
};

const detalhesFormaDePagamento = (state = INITIALSTATE, action: any) => {
  switch (action.type) {
    case SETFORMADEPAGAMENTO:
      state = { ...state, detalhesPagamento: action.payload };
      return state;
    default:
      return state;
  }
};

export default detalhesFormaDePagamento;
