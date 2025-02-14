import {
  SET_CLEAN,
  SET_ALL_CONTAS_RECEBER,
  SET_LOADING_CONTAS_RECEBER,
  SHOW_CONTA_RECEBER_SELECTED
} from './action';

const initialState: any = {
  contaReceberSelected: {},
  periodo: {},
  allContasReceber: [],
  loading: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_CONTA_RECEBER_SELECTED: {
      return { ...state, contaReceberSelected: { ...action.payload } };
    }
    case SET_ALL_CONTAS_RECEBER: {
      return { ...state, allContasReceber: { ...action.payload } };
    }
    case SET_LOADING_CONTAS_RECEBER: {
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
