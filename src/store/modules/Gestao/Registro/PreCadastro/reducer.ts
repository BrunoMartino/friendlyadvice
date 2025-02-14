import {
  SAVE_DATA_CADASTRO,
  SET_LIMPAR_DADOS_PRE_CADASTRO,
  SET_ORIGEM_PRE_CADASTRO,
  SET_PRE_CADASTRO,
} from './action';

const initialState = {
  id: '',
  email: '',
  telefone: '',
  cadastroEnviado: false,
  cadastroConfirmado: false,
  integradoLahar: false,
  isOrigemPreCadastro: '',
  salvarDadosDoCadastro: {
    nome: '',
    cpfCnpj: '',
    cep: '',
    numero: '',
    complemento: '',
    ieRg: '',
  },
};

const preCadastro = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PRE_CADASTRO:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        telefone: action.payload.telefone,
        cadastroEnviado: action.payload.cadastroEnviado,
        cadastroConfirmado: action.payload.cadastroConfirmado,
        integradoLahar: action.payload.integradoLahar,
      };
    case SET_LIMPAR_DADOS_PRE_CADASTRO:
      return initialState;
    case SET_ORIGEM_PRE_CADASTRO:
      return {
        ...state,
        isOrigemPreCadastro: action.payload,
      };
    case SAVE_DATA_CADASTRO:
      return {
        ...state,
        salvarDadosDoCadastro: { ...action.payload.salvarDadosDoCadastro },
      };
    default:
      return state;
  }
};

export default preCadastro;
