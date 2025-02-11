import { SETDETALHAMENTO } from './action';

const INITIALSTATE = {
  detalhesColaborador: [],
};

const detalhamentoColaborador = (state = INITIALSTATE, action: any) => {
  switch (action.type) {
    case SETDETALHAMENTO:
      state = { ...state, detalhesColaborador: action.payload };
      return state;
    default:
      return state;
  }
};

export default detalhamentoColaborador;
