import mapKeys from 'lodash/mapKeys';
import {
  ADD_NOVO_GRUPO_DO_SUBGRUPO,
  CARREGAR_GRUPO_SUBGRUPO,
  EDICAO_CADASTRO_SUBGRUPOS,
  INSERT_FILTER_GRUPO,
  LIMPAR_DADOS_SUBGRUPO,
} from './action';

const initialState = {
  gruposDoSubGrupo: {},
  subgrupo: {},
  filtroGrupo: { grupo: { id: '', descricao: '' } },
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case CARREGAR_GRUPO_SUBGRUPO:
      return {
        ...state,
        gruposDoSubGrupo: {
          ...mapKeys(action.payload, 'id'),
          '0': { id: 0, descricao: '', inputValue: '' },
        },
      };

    case EDICAO_CADASTRO_SUBGRUPOS:
      return { ...state, subgrupo: { ...action.payload } };

    case ADD_NOVO_GRUPO_DO_SUBGRUPO:
      let arrayGrupoSubgrupo: any = [];
      let stateGrupo = Object.values(state.gruposDoSubGrupo);
      if (stateGrupo && stateGrupo.length > 0) {
        arrayGrupoSubgrupo = [...stateGrupo];
      }
      arrayGrupoSubgrupo.push({
        id: action.payload.id,
        descricao: action.payload.descricao,
        inputValue: '',
      });

      return {
        ...state,
        gruposDoSubGrupo: arrayGrupoSubgrupo,
      };

    case LIMPAR_DADOS_SUBGRUPO:
      return {
        ...state,
        subgrupo: {},
      };

    case INSERT_FILTER_GRUPO:
      return {
        ...state,
        filtroGrupo: action.payload,
      };
    default:
      return state;
  }
};
