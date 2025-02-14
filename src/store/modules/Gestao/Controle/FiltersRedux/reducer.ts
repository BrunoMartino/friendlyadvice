import {
  CLEARFILTERREDUX,
  SAMEORIGINTHROWFALSE,
  SETBOOLEANFILTER,
  SETFILTERTOSAVE,
  SETORIGINFILTERREDUX,
  SET_ORIGEM_BY,
  SET_FILTER_VENDAS
} from './action';

const INITIALSTATE = {
  saved: false,
  source: {},
  origem: '',
  origemBy: '',
  sourceVendas: {},
};

const filtrosRedux = (state = INITIALSTATE, action: any) => {
  switch (action.type) {
    case SETBOOLEANFILTER:
      state = { ...state, saved: action.payload };
      return state;
    case SETFILTERTOSAVE:
      state = { ...state, source: action.payload };
      return state;
    case SET_FILTER_VENDAS:
      return {
        ...state,
        sourceVendas: action.payload,
      };
    case SETORIGINFILTERREDUX:
      state = { ...state, origem: action.payload };
      return state;
    case SET_ORIGEM_BY:
      return {
        ...state,
        origemBy: action.payload,
      };
    case CLEARFILTERREDUX:
      state = { ...state, source: {} };
      return state;
    case SAMEORIGINTHROWFALSE:
      state = { ...state, saved: false };
      return state;
    default:
      return state;
  }
};

export default filtrosRedux;
