import mapKeys from 'lodash/mapKeys';
import {
  CARREGA_INTEGRACOES,
  CLEAN_EDIT_INTEGRATION,
  EDIT_INTEGRATION,
  SET_CLEAN_INTEGRATION,
  SET_INTEGRATION_SELECTED,
  SET_INTEGRATION_SAVE_DATA,
  SET_INTEGRATION_PRE_SAVE_DATA,
  SET_DADOS_INTEGRACAO,
  SET_NUMERO_PARCELAS,
} from './action';

const initialState: any = {
  integrationSelected: { id: '', descricao: '' },
  dadosIntegracao: {},
  editIntegration: {},
  iFoodDataPreSave: {},
  iFoodDataSave: {},
  integracoes: {},
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case CARREGA_INTEGRACOES:
      return {
        ...state,
        integracoes: {
          ...mapKeys(action.payload, 'id'),
          // '0': { id: '', descricao: '' },
        },
      };

    case SET_DADOS_INTEGRACAO:
      return {
        ...state,
        dadosIntegracao: {
          ...state.dadosIntegracao,
          ...action.payload,
        },
      };

    case SET_NUMERO_PARCELAS:
      return {
        ...state,
        dadosIntegracao: {
          ...state.dadosIntegracao,
          parcelas: action.payload,
        },
      };

    case SET_INTEGRATION_SELECTED:
      return { ...state, integrationSelected: action.payload };

    case SET_CLEAN_INTEGRATION:
      return {
        ...state,
        integrationSelected: initialState.integrationSelected,
      };

    case EDIT_INTEGRATION:
      return { ...state, editIntegration: { ...state.editIntegration, ...action.payload } };
    case CLEAN_EDIT_INTEGRATION:
      return { ...state, editIntegration: {} };
    case SET_INTEGRATION_PRE_SAVE_DATA:
      return { ...state, iFoodDataPreSave: action.payload };
    case SET_INTEGRATION_SAVE_DATA:
      return { ...state, iFoodDataSave: action.payload };
    default:
      return state;
  }
};
