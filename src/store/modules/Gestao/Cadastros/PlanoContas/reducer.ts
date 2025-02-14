import mapKeys from 'lodash/mapKeys';
import {
  EDITAR_PLANOCONTAS,
  GETALL_PLANOCONTAS,
  GET_CLASSIFICACAOCONTA,
  GET_PLANOCONTAS,
  LIMPAR_PLANOCONTAS,
} from './action';

const intialValues = {
  data: [],
  edicaoPlanoContas: {
    codigo: '',
    descricao: '',
    tipo: '',
    grau: '',
    fluxoCaixa: { id: '', descricao: '' },
  },
  contas: {},
  planoContas: {},
};

const cadastroPlanoContas = (state = intialValues, action: any) => {
  switch (action.type) {
    case GETALL_PLANOCONTAS:
      return { ...state, data: [...action.payload] };
    case GET_PLANOCONTAS:
      return {
        ...state,
        planoContas: {
          ...mapKeys(action.payload, 'id'),
          '0': { id: '', descricao: '', codigo: '' },
        },
      };

    case LIMPAR_PLANOCONTAS:
      return intialValues;

    case EDITAR_PLANOCONTAS:
      return { ...state, edicaoPlanoContas: { ...action.payload } };

    case GET_CLASSIFICACAOCONTA:
      return {
        ...state,
        contas: {
          ...mapKeys(action.payload, 'id'),
          '0': { id: '', descricao: '' },
        },
      };

    default:
      return state;
  }
};

export default cadastroPlanoContas;
