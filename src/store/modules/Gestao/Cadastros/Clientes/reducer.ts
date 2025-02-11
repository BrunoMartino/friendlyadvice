import {
  LOADING_ADDRESS_BY_CLIENT,
  NEW_ADDRESS,
  NEW_CLIENT,
  SET_CLEAN,
  SET_ALL_CLIENTS,
  SET_ALL_CONFIG_SMART,
  SET_LOANDING_CLIENTS,
  SHOW_CLIENT_SELECTED,
} from './action';

const initialState: any = {
  clienteSelecionado: {},
  novoCliente: {},
  novoEndereco: {},
  enderecoPrincipal: {},
  allClientes: [],
  allConfigFaciliteSmart: [],
  loading: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case NEW_CLIENT: {
      return { ...state, novoCliente: { ...action.payload } };
    }
    case NEW_ADDRESS: {
      return { ...state, novoEndereco: { ...action.payload } };
    }
    case SHOW_CLIENT_SELECTED: {
      return { ...state, clienteSelecionado: { ...action.payload } };
    }
    case LOADING_ADDRESS_BY_CLIENT: {
      return { ...state, enderecoPrincipal: { ...action.payload } };
    }
    case SET_ALL_CLIENTS: {
      return { ...state, allClientes: { ...action.payload } }
    }
    case SET_ALL_CONFIG_SMART: {
      return { ...state, allConfigFaciliteSmart: { ...action.payload } }
    }
    case SET_LOANDING_CLIENTS: {
      return { ...state, loading: action.payload };
    }
    case SET_CLEAN:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
