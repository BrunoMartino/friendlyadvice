import { GET_ALL_PORTADORES, LIMPAR_PORTADORES } from './action';

const intialValues = {
  data: [],
};

const cadastroPortadores = (state = intialValues, action: any) => {
  switch (action.type) {
    case GET_ALL_PORTADORES:
      return { ...state, data: [...action.payload] };

    case LIMPAR_PORTADORES:
      return intialValues;

    default:
      return state;
  }
};

export default cadastroPortadores;
