import {
  CARREGAR_DADOS_EMPRESA,
  TROCAR_EMPRESA_STATUS,
  CHANGE_MODO_CARDAPIO,
  SET_LOADING_TELA_INICIAL,
  RESET_EMPRESA,
  SET_TEMPO_ENTREGA,
  CARREGAR_DADOS_EMPRESA_ALL,
  SET_TEMPO_RETIRADA,
  LOADING_EMPRESA_UPDATE,
  SAVE_IMAGE_NAME_EMPRESA,
  ALTERAR_IMAGEMS_LOGOTIPO,
} from './actions';

const initialState = {
  info: {
    id: '',
    nomeFantasia: '',
    imagemEmpresa: '',
    background: '',
    endereco: '',
    cidade: '',
    telefone: [],
    cep: '',
    textoLojaAberta: '',
    textoLojaFechada: '',
    licencas: [],
    tempoEntrega: 0,
    tempoDeRetirada: 0,
    formaTaxaEntrega: 'CEP',
  },
  status: false,
  turnos: {},
  modoCardapio: false,
  loading: false,
  empresaAll: {},
  nomeImagemLogoEmpresa: '',
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case RESET_EMPRESA:
      return {
        ...initialState,
      };
    case SET_LOADING_TELA_INICIAL:
      return {
        ...state,
        loading: action.payload,
      };
    case CHANGE_MODO_CARDAPIO:
      return {
        ...state,
        modoCardapio: action.payload,
      };
    case CARREGAR_DADOS_EMPRESA:
      return {
        ...state,
        info: { ...action.payload.telaInicial.empresa },
        turnos: { ...action.payload.telaInicial.turnos },
      };
    case CARREGAR_DADOS_EMPRESA_ALL:
      return {
        ...state,
        empresaAll: { ...action.payload },
      };
    case TROCAR_EMPRESA_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case SET_TEMPO_ENTREGA:
      return {
        ...state,
        info: {
          ...state.info,
          tempoEntrega: action.payload,
        },
      };
    case SET_TEMPO_RETIRADA:
      return {
        ...state,
        info: {
          ...state.info,
          tempoDeRetirada: action.payload,
        },
      };
    case LOADING_EMPRESA_UPDATE:
      return {
        ...state,
        loading: action.payload,
      };
    case SAVE_IMAGE_NAME_EMPRESA:
      return {
        ...state,
        nomeImagemLogoEmpresa: action.payload,
      };
    case ALTERAR_IMAGEMS_LOGOTIPO:
      return {
        ...state,
        empresaAll: { ...state.empresaAll, logoTipoImagem: action.payload },
      };
    default:
      return state;
  }
};
