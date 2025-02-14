import mapKeys from 'lodash/mapKeys';
import { TOTAL_ITENS_PAGINA } from "../../../../../utils/consts";
import { CARREGA_DADOS_CONFFACILITESMART,
         LOADING_CONFIG_FACILITE_SMART,
         SET_DATA_CONFFACILITESMART,
         SHOW_CONF_SELECTED,
         SET_CONFFACILITE,
         NEW_CONFFACSMART,
         SET_PAGINA_ATUAL_CONFFACILITESMART,
         LIMPA_CONF,
         EDICAO_CONFIGS,
         TOGGLE_IMPRIMIR_RELATORIOS} from "./action";

const initialState: any = {
  confFaciliteSmart: {},
  verificaConfFaciliteSmart: {},
  carregaConfFaciliteSmart: {},
  confFaciliteSmartSelecionada: {},
  novoConfFacSmart: {},
  data: [],
  pagina: 1,
  totalPaginas: 0,
  loading: false,
};


const calcTotalPaginas = (qtdItens: number) => {
  return Math.ceil(qtdItens / TOTAL_ITENS_PAGINA);
}

interface Conf {
  id: string;
  imprimirRelatorios: boolean;
}


const confFaciliteSmart = (state = initialState, action: any) => {
  switch (action.type) {
    case TOGGLE_IMPRIMIR_RELATORIOS:
      return {
        ...state,
        data: state.data.map((conf: Conf) => {
          if (conf.id === action.payload) {
            return { ...conf, imprimirRelatorios: !conf.imprimirRelatorios };
          }
          return conf;
        }),
      };
    case EDICAO_CONFIGS:
      return { ...state, ...action.payload };
    case LIMPA_CONF:
      return state;
    case CARREGA_DADOS_CONFFACILITESMART:
      return {
        ...state,
        carregaConfFaciliteSmart: mapKeys(action.payload, 'id'),
        totalPaginas: calcTotalPaginas(action.payload.length),
      };

      case SET_CONFFACILITE:
        return {
          ...state,
          confFaciliteSmart: { ...action.payload },
        }

      case NEW_CONFFACSMART:
        return {
          ...state, novoConfFacSmart: { ...action.payload }
        };

      case SET_PAGINA_ATUAL_CONFFACILITESMART:
        return {
          ...state,
          pagina: action.payload,
        };

      case SET_DATA_CONFFACILITESMART:
        return {
          ...state,
          data: action.payload,
        };

      case LOADING_CONFIG_FACILITE_SMART:
        return {
          ...state,
          loading: action.payload,
        };

      case SHOW_CONF_SELECTED:
        return {
          ...state, confFaciliteSmartSelecionada: { ...action.payload }
        }

      default:
        return state;
  }
}

export default confFaciliteSmart;
