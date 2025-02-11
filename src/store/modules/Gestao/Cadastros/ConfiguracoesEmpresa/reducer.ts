import mapKeys from 'lodash/mapKeys';

import {
  CARREGA_CONFIGURACOES_EMPRESA,
  LIMPA_CONFIGURACOES_EMPRESA,
  CARREGAR_CLIENTES,
  ADD_CLIENTE,
  LOADING_CONFIGURACOES_EMPRESA,
} from './action';

const intialValue: any = {
  empresa: {},
  configuracoes: {
    precoDiferenciado: false,
    finalizarSemCadastro: false,
    clientePadrao: '',
    habilitaProdutoFiscal: false,
  },
  clientes: {},
  loading: false,
};

export default (state = intialValue, action: any) => {
  switch (action.type) {
    case CARREGA_CONFIGURACOES_EMPRESA: {
      return {
        ...state,
        configuracoes: action.payload.configuracoes,
        empresa: action.payload.empresa,
      };
    }
    case LIMPA_CONFIGURACOES_EMPRESA: {
      return { ...state, configuracoes: {} };
    }
    case LOADING_CONFIGURACOES_EMPRESA: {
      return { ...state, loading: action.payload };
    }
    case CARREGAR_CLIENTES:
      return {
        ...state,
        clientes: {
          0: { id: '', descricao: '', inputValue: '' },
          ...mapKeys(action.payload, 'id'),
        },
      };
    case ADD_CLIENTE:
      return {
        ...state,
        clientes: {
          ...state.clientes,
          [action.payload.id]: { ...action.payload },
        },
      };
    default:
      return state;
  }
};
