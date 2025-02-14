import {
  GRAVAR_PRODUTO_PRECADASTRO,
  GRAVAR_TOKEN_PRECADASTRO,
  LIMPAR_PRODUTO_E_TOKEN_PRECADASTRO,
} from './action';

type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type payload = CreateMutable<typeof initialState>;

const initialState = {
  token: '',
  produtoSelecionado: '',
};

const produtosPreCadastro = (
  state = initialState,
  action: { type: string; payload: payload },
) => {
  switch (action.type) {
    case GRAVAR_PRODUTO_PRECADASTRO:
      return {
        ...state,
        produtoSelecionado: action.payload.produtoSelecionado,
      };
    case GRAVAR_TOKEN_PRECADASTRO:
      return {
        ...state,
        token: action.payload.token,
      };
    case LIMPAR_PRODUTO_E_TOKEN_PRECADASTRO:
      return {
        ...state,
        token: '',
        produtoSelecionado: '',
      };
    default:
      return state;
  }
};

export default produtosPreCadastro;
