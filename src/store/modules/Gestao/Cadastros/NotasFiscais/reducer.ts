import {
  SET_CLEAN,
  SET_ALL_NOTAS_FISCAIS,
  SET_LOADING_NOTAS_FISCAIS,
  SHOW_NOTA_FISCAL_SELECTED,
} from './action';

const initialState: any = {
  notaFiscalSelecionado: {},
  allNotasFiscais: [],
  loading: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_NOTA_FISCAL_SELECTED: {
      return { ...state, notaFiscalSelecionado: { ...action.payload } };
    }
    case SET_ALL_NOTAS_FISCAIS: {
      return { ...state, allNotasFiscais: { ...action.payload } };
    }
    case SET_LOADING_NOTAS_FISCAIS: {
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
