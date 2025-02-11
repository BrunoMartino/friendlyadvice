import {
  ALTERAR_FORMA_TAXA_ENTREGA,
  ALTERAR_IMAGEMS_BACKGROUND,
  ALTERAR_IMAGEMS_LOGOTIPO,
  CARREGAR_DADOS_EMPRESA_ADMIN,
  CARREGAR_DADOS_USUARIOS_INPERA,
  SET_LICENCAS,
  SET_LOADING_DASHBOARD,
  SET_TEMPO_ENTREGA_EMPRESA_ADMIN,
  SET_LOADING_LICENCA,
  SET_LICENSE_SETED,
  SET_TEMPO_RETIRADA_EMPRESA_ADMIN,
} from './actions';

const initialState = {
  id: '',
  nomeFantasia: '',
  razao: '',
  imagemEmpresa: '',
  background: '',
  endereco: '',
  cidade: '',
  telefone: [],
  cep: '',
  textoLojaAberta: '',
  textoLojaFechada: '',
  aliasEmpresa: '',
  acessoDelivery: [],
  local: '',
  tempoEntrega: 0,
  tempoDeRetirada: 0,
  formaTaxaEntrega: 'CEP',
  imagem: {},
  usuariosInpera: {},
  loading: false,
  loadingLicenca: false,
  licenseSeted: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case CARREGAR_DADOS_EMPRESA_ADMIN:
      return {
        ...state,
        ...action.payload.telaInicial.empresa,
      };
    case CARREGAR_DADOS_USUARIOS_INPERA:
      return {
        ...state,
        usuariosInpera: action.payload,
      };
    case SET_TEMPO_ENTREGA_EMPRESA_ADMIN:
      return {
        ...state,
        tempoEntrega: action.payload,
      };
    case SET_TEMPO_RETIRADA_EMPRESA_ADMIN:
      return {
        ...state,
        tempoDeRetirada: action.payload,
      };
    case SET_LICENCAS:
      return {
        ...state,
        acessoDelivery:
          action.payload &&
          typeof action.payload.licencasAtualizadas === 'object'
            ? Object.values(action.payload.licencasAtualizadas)
            : [],
      };
    case ALTERAR_IMAGEMS_LOGOTIPO:
      return {
        ...state,
        imagemEmpresa: action.payload.logotipoEmpresa,
      };
    case ALTERAR_IMAGEMS_BACKGROUND:
      return {
        ...state,
        background: action.payload.background,
      };
    case ALTERAR_FORMA_TAXA_ENTREGA:
      return {
        ...state,
        formaTaxaEntrega: action.payload.formaTaxa,
      };
    case SET_LOADING_DASHBOARD:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_LOADING_LICENCA:
      return {
        ...state,
        loadingLicenca: action.payload,
      };
    case SET_LICENSE_SETED:
      return {
        ...state,
        licenseSeted: action.payload,
      };
    default:
      return state;
  }
};
