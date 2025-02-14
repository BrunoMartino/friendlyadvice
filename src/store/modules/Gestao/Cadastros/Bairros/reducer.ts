import mapKeys from 'lodash/mapKeys';
import {
  EDICAO_BAIRROS,
  LIMPAR_DADOS_BAIRROS,
  SET_CIDADES_BAIRROS,
  SET_IDULTIMACIDADE,
} from './action';

const initialState: any = {
  bairroSelecionado: {},
  cidadesDoBairro: {},
  idUltimaCidade: '',
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case EDICAO_BAIRROS:
      return { ...state, bairroSelecionado: action.payload };
    case SET_CIDADES_BAIRROS:
      return {
        ...state,
        cidadesDoBairro: {
          ...mapKeys(action.payload, 'id'),
          '0': { id: 0, descricao: '', inputValue: '' },
        },
      };
    case LIMPAR_DADOS_BAIRROS:
      return {
        ...initialState,
      };
    case SET_IDULTIMACIDADE:
      return {
        ...state,
        idUltimaCidade: action.payload,
      };
    default:
      return state;
  }
};
