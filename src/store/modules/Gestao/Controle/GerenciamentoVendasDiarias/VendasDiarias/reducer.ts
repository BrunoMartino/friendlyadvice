import mapKeys from 'lodash/mapKeys';
import {
  SETVENDASDIARIAS,
  SETEMPRESASFILTRO,
  SETCAIXASFILTRO,
  SETLOADING,
} from './action';

const INITIALSTATE = {
  dailySales: [],
  empresas: {},
  caixas: {},
  isLoading: false,
};

const vendasDiarias = (state = INITIALSTATE, action: any) => {
  switch (action.type) {
    case SETVENDASDIARIAS:
      state = { ...state, dailySales: action.payload.dailySales };
      return state;

    case SETEMPRESASFILTRO:
      state = { ...state, empresas: action.payload };
      return state;

    case SETCAIXASFILTRO:
      state = {
        ...state,
        caixas: {
          ...mapKeys(action.payload, 'description'),
          '0': { id: '0', description: 'Todos os Caixas' },
        },
      };
      return state;
    case SETLOADING:
      state = { ...state, isLoading: action.payload };
      return state;
    default:
      return state;
  }
};

export default vendasDiarias;
