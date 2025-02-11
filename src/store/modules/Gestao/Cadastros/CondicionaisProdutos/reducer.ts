import omit from 'lodash/omit';
import mapKeys from 'lodash/mapKeys';
import { TOTAL_ITENS_PAGINA } from '../../../../../utils/consts';
import {
  SET_CARREGA_CONDICIONAIS_CADASTROPRODUTO,
  CARREGA_CONDICIONAL_PRODUTO,
  SET_PRODUTO_SELECIONADO_CONDICIONAL,
  LIMPAR_DADOS_CONDICIONAL_PRODUTO,
  ADD_CONDICIONAL_PRODUTO,
  SET_DATA_CONDICIONAL_PRODUTO,
  SET_PAGINA_ATUAL_CONDICIONAL_PRODUTO,
  LIMPAR_DATA,
  REMOVER_CONDICIONAL_PRODUTO,
  LOAD_SELECTED_PRODUCTS,
  TOGGLE_SELECTION,
  LIMPAR_PRODUTOS,
  SET_LOADING,
} from './action';

const initialState: any = {
  produtoSelecionado: {},

  condicionais: {},
  condicionaisProduto: {},

  data: [],

  produtos: [],
  modal: {},
  produtosSelecionados: [],

  pagina: 1,
  totalPaginas: 0,

  loading: false,
};

const calcTotalPaginas = (qtdeItens: number) => {
  return Math.ceil(qtdeItens / TOTAL_ITENS_PAGINA);
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case LOAD_SELECTED_PRODUCTS:
      return { ...state, produtos: action.payload };
    case TOGGLE_SELECTION:
      let cpProdutos: any = [...state.produtos];
      const idx = cpProdutos.findIndex(
        (pIdx: any) => pIdx.id === action.payload.produtoId,
      );
      if (idx >= 0) cpProdutos[idx].checked = action.payload.value;
      return {
        ...state,
        produtos: cpProdutos,
      };
    case SET_PRODUTO_SELECIONADO_CONDICIONAL:
      return { ...state, produtoSelecionado: action.payload };

    case SET_CARREGA_CONDICIONAIS_CADASTROPRODUTO:
      return {
        ...state,
        condicionais: {
          ...mapKeys(action.payload, 'id'),
          '0': { id: 0, descricao: '', inputValue: '' },
        },
      };

    case SET_DATA_CONDICIONAL_PRODUTO:
      return {
        ...state,
        data: action.payload,
      };
    case SET_PAGINA_ATUAL_CONDICIONAL_PRODUTO:
      return {
        ...state,
        pagina: action.payload,
      };

    case CARREGA_CONDICIONAL_PRODUTO:
      return {
        ...state,
        condicionaisProduto: mapKeys(action.payload, 'idCondicionalProduto'),
        totalPaginas: calcTotalPaginas(action.payload.length),
      };

    case ADD_CONDICIONAL_PRODUTO:
      return {
        ...state,
        totalPaginas: calcTotalPaginas(
          Object.keys(state.condicionaisProduto).length + 1,
        ),
        condicionaisProduto: {
          ...state.condicionaisProduto,
          [action.payload.idCondicionalProduto]: action.payload,
        },
      };

    case REMOVER_CONDICIONAL_PRODUTO:
      const novoTotalPagina = calcTotalPaginas(
        Object.keys(state.condicionaisProduto).length - 1,
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
        condicionaisProduto: omit(state.condicionaisProduto, action.payload),
      };

    case LIMPAR_DADOS_CONDICIONAL_PRODUTO:
      return {
        ...state,
        produtoSelecionado: {},
        condicionaisProduto: {},
        idNovoCondicionalProduto: '',
        data: [],
        pagina: 1,
        totalPaginas: 0,
      };
    case LIMPAR_PRODUTOS:
      return {
        ...state,
        produtos: [],
      };
    case LIMPAR_DATA:
      return {
        ...state,
        data: [],
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
