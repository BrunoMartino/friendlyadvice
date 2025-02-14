import {
  SET_LICENCAS_EMPRESA,
  SET_LICENSE_SETED,
  SET_LOADING_LICENCA,
} from './action';

const initialState = {
  licencas: [],
  loadingLicenca: false,
  setLicenseSeted: false,
};

const empresaLicencas = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LICENCAS_EMPRESA:
      return {
        ...state,
        licencas:
          typeof action.payload === 'object'
            ? Object.values(action.payload)
            : action.payload,
      };
    case SET_LOADING_LICENCA:
      return {
        ...state,
        loadingLicenca: action.payload,
      };
    case SET_LICENSE_SETED:
      return {
        ...state,
        setLicenseSeted: action.payload,
      };
    default:
      return state;
  }
};

export default empresaLicencas;
