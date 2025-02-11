import { EDICAO_LOCALIZACAO, LIMPAR_DADOS_LOCALIZACAO } from './action';

const initialState: any = {};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case EDICAO_LOCALIZACAO:
      return { ...state, ...action.payload };
    case LIMPAR_DADOS_LOCALIZACAO:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
