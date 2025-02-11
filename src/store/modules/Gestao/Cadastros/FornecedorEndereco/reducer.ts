import omit from 'lodash/omit'
import mapKeys from 'lodash/mapKeys'
import { TOTAL_ITENS_PAGINA } from '../../../../../utils/consts'
import {
  ADD_ADDRESS,
  ADDRESS_OF_CLIENT_SELECTED,
  LOADING_ALL_ADDRESS,
  SAVE_NEW_ADDRESS_OF_CLIENT,
  SET_CLEAN_ADDRESS,
  SET_CLEAN_ADDRESS_SELECTED,
  SET_CLEAN_DATA_ADDRESS,
  SET_DATA_CLIENTE_ENDERECOS,
  SET_LOADING_ADDRESS_SELECTED,
  SET_PAGINA_ATUAL_CLIENTE_ENDERECOS,
  SET_REMOVE_ADDRESS,
  UPDATE_ADDRESS_AT_LIST,
} from './action'

const initialState: any = { fornecedorSelecionado: '', enderecosByFor: {}, enderecoSelecionado: {}, novoEndereco: {}, data: [], pagina: 1, totalPaginas: 0 }

const calcTotalPaginas = (qtdeItens: number) => { return Math.ceil(qtdeItens / TOTAL_ITENS_PAGINA) }

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ADDRESS_OF_CLIENT_SELECTED: {
      return { ...state, fornecedorSelecionado: action.payload };
    }

    case SET_DATA_CLIENTE_ENDERECOS:
      return {
        ...state,
        data: action.payload,
      };

    case SET_PAGINA_ATUAL_CLIENTE_ENDERECOS:
      return {
        ...state,
        pagina: action.payload,
      };

    case SET_LOADING_ADDRESS_SELECTED:
      return { ...state, enderecoSelecionado: { ...action.payload } };

    case SAVE_NEW_ADDRESS_OF_CLIENT: {
      return {
        ...state,
        novoEndereco: { ...action.payload },
      };
    }

    case LOADING_ALL_ADDRESS: {
      return {
        ...state,
        enderecosByFor: mapKeys(action.payload, 'idEndereco'),
        totalPaginas: calcTotalPaginas(action.payload.length),
      };
    }

    case ADD_ADDRESS: {
      return {
        ...state,
        totalPaginas: calcTotalPaginas(
          Object.keys(state.enderecosByFor).length + 1,
        ),
        enderecosByFor: {
          ...state.enderecosByFor,
          [action.payload.idEndereco]: action.payload,
        },
      };
    }

    case UPDATE_ADDRESS_AT_LIST:
      return {
        ...state,
        enderecosByFor: {
          ...state.enderecosByFor,
          [action.payload.idEndereco]: action.payload,
        },
      };

    case SET_REMOVE_ADDRESS:
      const novoTotalPagina = calcTotalPaginas(
        Object.keys(state.enderecosByFor).length - 1,
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
        enderecosByFor: omit(state.enderecosByFor, action.payload),
      };

    case SET_CLEAN_ADDRESS:
      return {
        ...initialState,
      };

    case SET_CLEAN_ADDRESS_SELECTED:
      return {
        ...state,
        enderecoSelecionado: {},
        novoEndereco: {},
      };
    case SET_CLEAN_DATA_ADDRESS:
      return {
        ...state,
        data: [],
      };

    default:
      return state;
  }
}