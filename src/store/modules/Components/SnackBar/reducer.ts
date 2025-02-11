import {
  TipoMensagem,
  TipoPosicao,
} from '../../../../components/SnackBar/interface';

import { ABRIR_MENSAGEM, FECHAR_MENSAGEM, LIMPAR_DADOS } from './action';

const initial_State = {
  open: false,
  mensagem: '',
  tipo: TipoMensagem.INFO,
  posicao: TipoPosicao.TOP_RIGHT,
  personalTime: null
};

const SnackReducer = (state = initial_State, action: any) => {
  switch (action.type) {
    case ABRIR_MENSAGEM:
      return {
        ...state,
        open: action.payload.open,
        mensagem: action.payload.mensagem,
        tipo: action.payload.tipo,
        posicao: action.payload.posicao,
        personalTime: action.payload.personalTime
      };
    case FECHAR_MENSAGEM:
      return {
        ...state,
        open: false,
      };
    case LIMPAR_DADOS:
      return {
        ...initial_State,
      };
    default:
      return state;
  }
};

export default SnackReducer;
