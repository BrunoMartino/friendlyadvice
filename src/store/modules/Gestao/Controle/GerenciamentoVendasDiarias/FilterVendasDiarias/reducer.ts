import {
  SETCLEAROBJECT,
  SETDEFINECARROUSEL,
  SETFILTERVENDAS,
  SETFILTERVENDASSAVED,
  SETLIMPARFILTROSVENDAS,
  SETLIMPARSALENUMBER,
  SETNEWREPLACEOBJECT,
  SETSAVENUMBERSALE,
  SET_DATA_CARROSSEL_API,
  SET_HEADERS_VALUES_TO_SEARCH,
  SET_SEARCH_FILTER_SAVE,
} from './action';

const initialFilter = {
  caixa: {
    id: '',
    description: '',
  },
  empresa: {
    id: '',
    description: '',
  },
  periodo: {
    tipo: '',
    inicial: undefined,
    final: undefined,
  },
};

const initialState: any = {
  saved: false,
  filter: { ...initialFilter },
  numberSale: 0,
  replaceObject: {},
  carrouselChange: 'Pedidos',
  headerGrid: [],
  savedSearchFilter: '',
  dadosDaApi: {},
};

const filterVendasDiarias = (state = initialState, action: any) => {
  switch (action.type) {
    case SETFILTERVENDAS:
      state = { ...state, filter: action.payload };
      return state;
    case SETFILTERVENDASSAVED:
      state = { ...state, saved: action.payload };
      return state;
    case SETLIMPARFILTROSVENDAS:
      state = { ...state, filter: initialFilter, saved: false };
      return state;
    case SETSAVENUMBERSALE:
      state = { ...state, numberSale: action.payload };
      return state;
    case SETLIMPARSALENUMBER:
      state = { ...state, numberSale: 0 };
    case SETNEWREPLACEOBJECT:
      state = { ...state, replaceObject: action.payload };
      return state;
    case SETCLEAROBJECT:
      state = { ...state, replaceObject: action.payload };
      return state;
    case SETDEFINECARROUSEL:
      state = { ...state, carrouselChange: action.payload };
      return state;
    case SET_HEADERS_VALUES_TO_SEARCH:
      return {
        ...state,
        headerGrid: action.payload,
      };
    case SET_SEARCH_FILTER_SAVE:
      return {
        ...state,
        savedSearchFilter: action.payload,
      };
    case SET_DATA_CARROSSEL_API:
      return {
        ...state,
        dadosDaApi: action.payload,
      };
    default:
      return state;
  }
};

export default filterVendasDiarias;
