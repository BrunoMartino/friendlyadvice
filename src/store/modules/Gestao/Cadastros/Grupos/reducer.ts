import mapKeys from 'lodash/mapKeys';
import {
  CARREGAR_CADASTRO_GRUPOS,
  CARREGA_HORARIOS,
  LIMPAR_DADOS_GRUPO,
} from './action';

const initialState: any = {
  grupo: {},
  horariosEspeciais: {},
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case CARREGAR_CADASTRO_GRUPOS:
      return { ...state, grupo: { ...action.payload } };

    case CARREGA_HORARIOS:
      return {
        ...state,
        horariosEspeciais: {
          ...mapKeys(action.payload, 'id'),
          '0': { id: 0, descricao: '' },
        },
      };

    case LIMPAR_DADOS_GRUPO:
      return {
        ...state,
        grupo: {},
      };
    default:
      return state;
  }
};
