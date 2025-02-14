import mapKeys from 'lodash/mapKeys';
import {
  CLEAN_CASHIER_SELECTED,
  CLEAN_FILTERS,
  GET_CASHIER,
  GET_CASHIER_SELECTED,
  SET_FILTERS,
  SET_LOADING,
} from './action';

const intialValues = {
  caixas: {
    id: '',
    caixa: {},
    dataAbertura: '',
    valorAbertura: '0.000000',
    fechado: false,
    dataFechamento: null,
    valorFechamento: '0.000000',
    Usuario: null,
  },
  selected: {},
  filter: {},
  loading: true,
};
const gerenciamentoCaixas = (state = intialValues, action: any) => {
  switch (action.type) {
    case GET_CASHIER:
      return state = {
        ...state,
        caixas: {
          ...action.payload,
          caixa: {
            ...mapKeys(action.payload, 'id'),
            '0': { id: '0', description: 'Todos os caixas' },
          },
        },
      };
      // return state;

    case GET_CASHIER_SELECTED: {
      return { ...state, selected: { ...action.payload } };
    }

    case CLEAN_CASHIER_SELECTED: {
      return { ...state, selected: {} };
    }

    case SET_FILTERS: {
      return { ...state, filter: action.payload };
    }

    case SET_LOADING:
      return { ...state, loading: action.payload };

    case CLEAN_FILTERS: {
      return { ...state, filter: {} };
    }
    default:
      return state;
  }
};

export default gerenciamentoCaixas;
