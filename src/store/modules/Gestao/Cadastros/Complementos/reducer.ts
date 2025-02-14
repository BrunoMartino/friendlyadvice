import { EDICAO_COMPLEMENTOS, LIMPAR_DADOS_COMPLEMENTOS } from './action';

const initialState: any = {};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case EDICAO_COMPLEMENTOS:
      return { ...state, ...action.payload };
    case LIMPAR_DADOS_COMPLEMENTOS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
