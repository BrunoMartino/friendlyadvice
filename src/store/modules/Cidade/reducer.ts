import { LOAD_CIDADES } from './action';

const initialState: Array<any> = [];

export default (state = initialState, action: any) => {
  switch (action.type) {
    case LOAD_CIDADES:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
