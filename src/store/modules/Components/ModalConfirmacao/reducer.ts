import {
  SET_DADOSMODALCONFIRMACAO,
  SET_FECHARMODALCONFIRMACAO,
} from './action';

const initialState = {
  mensagem: '',
  aviso: '',
  mostrar: false,
  handleConfirmar: '',
};

const ModalConfirmacao = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_DADOSMODALCONFIRMACAO:
      return {
        ...state,
        mostrar: action.payload.mostrar,
        mensagem: action.payload.mensagem,
        aviso: action.payload.aviso,
        handleConfirmar: action.payload.handleConfirmar,
        handleCancelar: action.payload.handleCancelar,
      };
    case SET_FECHARMODALCONFIRMACAO:
      return { ...state, mostrar: false };
    default:
      return state;
  }
};

export default ModalConfirmacao;
