import {
  SET_REFERENCIAS,
  SET_PRODUTO_SELECIONADO,
  LOAD_PRODUTO_REFERENCIAS,
  ADD_PRODUTO_REFERENCIA,
  CLEAR_PRODUTO_SELECIONADO,
  REMOVE_PRODUTO_REFERENCIA,
  SET_DATA,
  SET_PAGINA_ATUAL,
  UPDATE_PRODUTO_REFERENCIA,
  ADD_REFERENCIA,
  SET_LOADING_REFERENCIA,
} from './action';

import omit from 'lodash/omit';
import mapKeys from 'lodash/mapKeys';
import { TOTAL_ITENS_PAGINA } from '../../../../../utils/consts';

const initialState = {
  produtoSelecionado: null,
  referencias: {},
  produtoReferencias: {},
  data: [],
  pagina: 1,
  totalPaginas: 0,
  loading: false,
};

const calcTotalPaginas = (qtdeItens: number) => {
  return Math.ceil(qtdeItens / TOTAL_ITENS_PAGINA);
};

const referenciaProduto = (state = initialState, action: any) => {
  switch (action.type) {
    case CLEAR_PRODUTO_SELECIONADO:
      return initialState;
    case SET_PAGINA_ATUAL:
      return {
        ...state,
        pagina: action.payload,
      };
    case SET_PRODUTO_SELECIONADO:
      return {
        ...state,
        produtoSelecionado: action.payload,
      };
    case ADD_REFERENCIA:
      return {
        ...state,
        referencias: {
          ...state.referencias,
          [action.payload.id]: action.payload,
        },
      };
    case SET_REFERENCIAS:
      return {
        ...state,
        referencias: {
          ...mapKeys(action.payload, 'id'),
          '0': { id: '', descricao: '' },
        },
      };
    case LOAD_PRODUTO_REFERENCIAS:
      let qtde = 1;
      if (action.payload && action.payload.length > 0) {
        qtde = action.payload.length;
      }
      return {
        ...state,
        produtoReferencias: mapKeys(action.payload, 'id'),
        totalPaginas: calcTotalPaginas(qtde),
      };
    case ADD_PRODUTO_REFERENCIA:
      return {
        ...state,
        totalPaginas: calcTotalPaginas(
          Object.keys(state.produtoReferencias).length + 1,
        ),
        produtoReferencias: {
          ...state.produtoReferencias,
          [action.payload.id]: action.payload,
        },
      };
    case REMOVE_PRODUTO_REFERENCIA:
      const novoTotalPagina = calcTotalPaginas(
        Object.keys(state.produtoReferencias).length - 1,
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
        produtoReferencias: omit(state.produtoReferencias, action.payload),
      };
    case UPDATE_PRODUTO_REFERENCIA:
      return {
        ...state,
        produtoReferencias: {
          ...state.produtoReferencias,
          [action.payload.id]: action.payload,
        },
      };
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };

    case SET_LOADING_REFERENCIA:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default referenciaProduto;
