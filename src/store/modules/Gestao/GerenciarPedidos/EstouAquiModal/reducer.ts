import { DADOS_DO_INPUT_MODAL, SET_LOADING } from './action';

const INITIALSTATE = {
  inputValues: {},
  onLoading: false,
  // inputValuesOnSequence: [],
};

const estouAqui = (state = INITIALSTATE, action: any) => {
  switch (action.type) {
    case DADOS_DO_INPUT_MODAL:
      return { ...state, inputValues: action.payload };
    case SET_LOADING:
      return { ...state, onLoading: action.payload };

    default:
      return state;
  }
};

export default estouAqui;
