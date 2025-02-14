export const SET_DADOSMODALCONFIRMACAO = 'SET_DADOSMODALCONFIRMACAO';
export const SET_FECHARMODALCONFIRMACAO = 'SET_FECHARMODALCONFIRMACAO';

export const dadosModalConfirmacao = (
  mensagem: String, aviso: String, mostrar: boolean, handleConfirmar: any, handleCancelar?: any
) => {
  return {type: SET_DADOSMODALCONFIRMACAO, payload: { mensagem, aviso, mostrar, handleConfirmar, handleCancelar }}
}

export const fecharModalConfirmacao = () => {
  return { type: SET_FECHARMODALCONFIRMACAO }
}