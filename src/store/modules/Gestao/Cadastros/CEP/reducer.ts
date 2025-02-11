import { EDICAO_CEP, LIMPAR_DADOS_CEP } from './action';

const initialState: any = {};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case EDICAO_CEP:
      return { ...state, ...action.payload };
    case LIMPAR_DADOS_CEP:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
