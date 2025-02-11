import { PropsAlert } from '../../../../components/SnackBar/interface';

export const ABRIR_MENSAGEM = 'ABRIR_MENSAGEM';
export const FECHAR_MENSAGEM = 'FECHAR_MENSAGEM';
export const LIMPAR_DADOS = 'LIMPAR_DADOS';

export const abrirMensagem = (values: PropsAlert) => {
  return {
    type: ABRIR_MENSAGEM,
    payload: values,
  };
};

export const fecharMensagem = () => {
  return {
    type: FECHAR_MENSAGEM,
  };
};
