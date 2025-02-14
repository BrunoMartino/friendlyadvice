import { EDICAO_INGREDIENTES, LIMPAR_DADOS_INGREDIENTES } from './action';

const initialState: any = {};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case EDICAO_INGREDIENTES:
      return { ...state, ...action.payload };
    case LIMPAR_DADOS_INGREDIENTES:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
