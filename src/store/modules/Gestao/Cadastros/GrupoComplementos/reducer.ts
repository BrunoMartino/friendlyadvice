import omit from 'lodash/omit';
import mapKeys from 'lodash/mapKeys';
import { TOTAL_ITENS_PAGINA } from '../../../../../utils/consts';
import {
  ADD_NOVO_COMPLEMENTO_DO_GRUPO,
  CARREGA_COMPLEMENTO_DO_GRUPO,
  CARREGA_DADOS_DO_GRUPOCOMPLEMENTO,
  CARREGA_GRUPO_DO_COMPLEMENTO,
  EDICAO_GRUPO_COMPLEMENTO,
  ADD_NOVOS_COMPLEMENTO_DO_GRUPO,
  LIMPAR_DADOS_GRUPO_COMPLEMENTO,
  LIMPAR_TODOS_DADOS_DO_GRUPO_COMPLEMENTO,
  SET_ALTERACAO_GRUPO_DO_COMPLEMENTO,
  SET_DATA_GRUPOCOMPLEMENTO,
  SET_PAGINA_ATUAL_GRUPOCOMPLEMENTO,
  REMOVER_GRUPO_COMPLEMENTO,
  UPDATE_GRUPO_COMPLEMENTO,
  SET_LOADING_GPCOMPLEMENTOS,
} from './action';

const initialState: any = {
  complementos: {},
  grupoDoComplemento: {},
  verificaItemGrupoComplemento: '',

  complementoDoGrupoSelecionado: {},

  carregaGrupoComplemento: {},

  data: [],
  pagina: 1,
  totalPaginas: 0,

  loading: false,
};

const calcTotalPaginas = (qtdeItens: number) => {
  return Math.ceil(qtdeItens / TOTAL_ITENS_PAGINA);
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case CARREGA_COMPLEMENTO_DO_GRUPO:
      return {
        ...state,
        complementos: {
          ...mapKeys(action.payload, 'id'),
          '0': { id: 0, descricao: '', inputValue: '' },
        },
      };

    case ADD_NOVO_COMPLEMENTO_DO_GRUPO:
      return {
        ...state,
        complementos: {
          ...state.complementos,
          [action.payload.id]: action.payload,
        },
      };

    case CARREGA_GRUPO_DO_COMPLEMENTO:
      return { ...state, grupoDoComplemento: { ...action.payload } };

    case SET_DATA_GRUPOCOMPLEMENTO:
      return {
        ...state,
        data: action.payload,
      };

    case SET_PAGINA_ATUAL_GRUPOCOMPLEMENTO:
      return {
        ...state,
        pagina: action.payload,
      };

    case CARREGA_DADOS_DO_GRUPOCOMPLEMENTO:
      return {
        ...state,
        carregaGrupoComplemento: mapKeys(action.payload, 'id'),
        totalPaginas: calcTotalPaginas(action.payload.length),
      };

    case ADD_NOVOS_COMPLEMENTO_DO_GRUPO:
      return {
        ...state,
        totalPaginas: calcTotalPaginas(
          Object.keys(state.carregaGrupoComplemento).length + 1,
        ),
        carregaGrupoComplemento: {
          ...state.carregaGrupoComplemento,
          [action.payload.id]: action.payload,
        },
      };

    case EDICAO_GRUPO_COMPLEMENTO:
      return { ...state, complementoDoGrupoSelecionado: { ...action.payload } };

    case UPDATE_GRUPO_COMPLEMENTO:
      return {
        ...state,
        carregaGrupoComplemento: {
          ...state.carregaGrupoComplemento,
          [action.payload.id]: action.payload,
        },
      };

    case REMOVER_GRUPO_COMPLEMENTO:
      const novoTotalPagina = calcTotalPaginas(
        Object.keys(state.carregaGrupoComplemento).length - 1,
      );

      let novaPagina = state.pagina;
      if (novoTotalPagina > 0 && state.pagina > novoTotalPagina) {
        novaPagina = novoTotalPagina;
      }
      if (novoTotalPagina === 0) {
        novaPagina = 1;
      }

      return {
        ...state,
        totalPaginas: novoTotalPagina,
        pagina: novaPagina,
        carregaGrupoComplemento: omit(
          state.carregaGrupoComplemento,
          action.payload,
        ),
      };

    case SET_ALTERACAO_GRUPO_DO_COMPLEMENTO:
      return {
        ...state,
        verificaItemGrupoComplemento: action.payload,
      };

    case LIMPAR_DADOS_GRUPO_COMPLEMENTO:
      return {
        ...state,
        complementoDoGrupoSelecionado: {},
        novoItemGrupoComplemento: {},
      };

    case LIMPAR_TODOS_DADOS_DO_GRUPO_COMPLEMENTO:
      return {
        ...initialState,
      };

    case SET_LOADING_GPCOMPLEMENTOS:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
