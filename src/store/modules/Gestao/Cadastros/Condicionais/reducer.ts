import omit from 'lodash/omit';
import mapKeys from 'lodash/mapKeys';
import { TOTAL_ITENS_PAGINA } from '../../../../../utils/consts';
import {
  CARREGA_CONDICIONAL_SELECIONADO,
  GRAVA_CONDICIONAL,
  CARREGA_ITEM_SELECIONADO,
  LIMPAR_DADOS_CONDICIONAIS,
  CARREGA_COMPLEMENTO,
  ADD_NOVO_COMPLEMENTO,
  LIMPA_CONDICIONAIS_ITENS,
  SET_ALTERACAO_CONDICIONAL_ITEM,
  CARREGA_CONDICIONAIS_ITENS,
  SET_DATA_CONDICIONAIS_ITENS,
  SET_PAGINA_ATUAL_CONDICIONAIS_ITENS,
  ADD_NOVO_COMPLEMENTO_CONDICIONAL,
  UPDATE_COMPLEMENTO_CONDICIONAL_ITEM,
  REMOVE_CONDICIONAL_ITENS,
  SET_LOADING_COMPLEMENTOS,
} from './action';

const initialState: any = {
  condicionalItensSelecionado: {},
  condicionalItemAlterado: '',

  condicionaisComplementos: {},
  condicionalSelecionado: {},

  novosCondicionais: {
    condicional: {
      id: '',
      descricao: '',
      obrigatorio: false,
      qtdMinima: 0,
      qtdMaxima: 0,
      principal: false,
    },
  },

  complementos: {},

  condicionaisItens: {},

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
    case CARREGA_COMPLEMENTO:
      return {
        ...state,
        complementos: {
          ...mapKeys(action.payload, 'id'),
          '0': { id: 0, descricao: '', inputValue: '' },
        },
      };

    case ADD_NOVO_COMPLEMENTO:
      return {
        ...state,
        complementos: {
          ...state.complementos,
          [action.payload.id]: action.payload,
        },
      };

    case SET_DATA_CONDICIONAIS_ITENS:
      return {
        ...state,
        data: action.payload,
      };

    case SET_PAGINA_ATUAL_CONDICIONAIS_ITENS:
      return {
        ...state,
        pagina: action.payload,
      };

    case CARREGA_CONDICIONAIS_ITENS:
      return {
        ...state,
        condicionaisItens: mapKeys(action.payload, 'id'),
        totalPaginas: calcTotalPaginas(action.payload.length),
      };

    case ADD_NOVO_COMPLEMENTO_CONDICIONAL:
      return {
        ...state,
        totalPaginas: calcTotalPaginas(
          Object.keys(state.condicionaisItens).length + 1,
        ),
        condicionaisItens: {
          ...state.condicionaisItens,
          [action.payload.id]: action.payload,
        },
      };

    case UPDATE_COMPLEMENTO_CONDICIONAL_ITEM:
      return {
        ...state,
        condicionaisItens: {
          ...state.condicionaisItens,
          [action.payload.id]: action.payload,
        },
      };

    case REMOVE_CONDICIONAL_ITENS:
      const novoTotalPagina = calcTotalPaginas(
        Object.keys(state.condicionaisItens).length - 1,
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
        condicionaisItens: omit(state.condicionaisItens, action.payload),
      };
    //condicional
    case GRAVA_CONDICIONAL:
      return {
        ...state,
        novosCondicionais: { condicional: { ...action.payload } },
      };

    case CARREGA_ITEM_SELECIONADO:
      return { ...state, condicionalItensSelecionado: { ...action.payload } };

    case CARREGA_CONDICIONAL_SELECIONADO:
      return {
        ...state,
        condicionalSelecionado: { ...action.payload },
      };

    case SET_ALTERACAO_CONDICIONAL_ITEM:
      return {
        ...state,
        condicionalItemAlterado: action.payload,
      };

    case LIMPAR_DADOS_CONDICIONAIS:
      return {
        ...initialState,
      };

    case LIMPA_CONDICIONAIS_ITENS:
      return {
        ...state,
        condicionalItensSelecionado: {},
      };

    case SET_LOADING_COMPLEMENTOS:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
