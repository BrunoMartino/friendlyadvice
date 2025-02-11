import mapKeys from 'lodash/mapKeys';
// import { TipoCadEmpresa } from '../../../../../pages/Gestao/Cadastros/Empresas/Cadastro/index-empresa-cadastros';

import {
  ADD_NOVO_TIPO_TELEFONE,
  CARREGAR_EMPRESA,
  CARREGA_VISAO_FINANCEIRA,
  DETALHE_TABSELECT,
  LIMPAR_DADOS_EMPRESA,
  MENU_TABSELECT,
  SET_CARREGA_CIDADES,
  SET_CARREGA_ESTADOS,
  SET_CARREGA_TIPO_TELEFONE,
  SET_LICENCA_LIBERADA,
  UPDATE_DADOS_EMPRESA,
  EMPRESA_LOADING,
  LOADING_UPDATE_EMPRESA,
  LOADING_EMPRESA_UPDATE,
  EMPRESA_ONLOAD_SCREEN,
} from './action';

const initialState: any = {
  empresa: {},
  cidades: {},
  estados: {},
  financeiro: {},
  tipoTelefone: {},
  licencaLiberada: {},
  // tab: TipoCadEmpresa.GERAL,
  loading: false,
  onload: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case CARREGAR_EMPRESA:
      return {
        ...state,
        empresa: { ...action.payload },
      };
    case UPDATE_DADOS_EMPRESA:
      return {
        ...state,
        empresa: {
          ...action.paylod,
        },
      };

    case SET_CARREGA_TIPO_TELEFONE:
      return {
        ...state,
        tipoTelefone: {
          ...mapKeys(action.payload, 'id'),
          '0': { id: '', descricao: '', inputValue: '' },
        },
      };
    case SET_CARREGA_ESTADOS:
      return {
        ...state,
        estados: {
          ...mapKeys(action.payload, 'id'),
          '0': { id: '', descricao: '', inputValue: '' },
        },
      };
    case SET_CARREGA_CIDADES:
      return {
        ...state,
        cidades: {
          ...mapKeys(action.payload, 'id'),
          '0': { id: '', descricao: '', inputValue: '' },
        },
      };
    case CARREGA_VISAO_FINANCEIRA:
      return {
        ...state,
        financeiro: {
          ...mapKeys(action.payload, 'id'),
          '0': { id: '', descricao: '', value: '' },
        },
      };

    case ADD_NOVO_TIPO_TELEFONE:
      let arrayTipo: any = [];
      let stateGrupo = Object.values(state.tipoTelefone);
      if (stateGrupo && stateGrupo.length > 0) {
        arrayTipo = [...stateGrupo];
      }
      arrayTipo.push({
        id: action.payload.id,
        descricao: action.payload.descricao,
        inputValue: '',
      });

      return {
        ...state,
        tipoTelefone: arrayTipo,
      };

    case SET_LICENCA_LIBERADA: {
      return {
        ...state,
        licencaLiberada: action.payload,
      };
    }
    case MENU_TABSELECT: {
      return {
        ...state,
        tab: action.payload,
      };
    }

    case LIMPAR_DADOS_EMPRESA:
      return {
        ...state,
        empresa: {},
        licencaLiberada: {},
      };

    case EMPRESA_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case DETALHE_TABSELECT:
      return {
        ...state,
        regrasFiscais: {
          detTab: action.payload,
        },
      };
    case EMPRESA_ONLOAD_SCREEN:
      return {
        ...state,
        onload: action.payload,
      };
    default:
      return state;
  }
};
