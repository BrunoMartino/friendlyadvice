import { TipoMensagem } from "../../../../../components/SnackBar/interface";
import api from "../../../../../services/api";
import { getTokenDashboard } from "../../../../../utils/fn";
import { abrirMensagem } from "../../../Components/SnackBar/action";

export const ENVIA_MENSAGEM = '[WHATSCHATIA]ENVIA_MENSAGEM';

export const URL_PATH = `api/v1/inperaWhatsApp`;

export const postMessageWhatsAppNfce =
  (values: any, history: any, actions?: any ) => async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.post(`${URL_PATH}`, values);


      // actions.resetForm();
      history.push('/admin/gerenciar-pedidos');
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Sucesso ao enviar mensagem!',
          tipo: TipoMensagem.SUCESSO,
        }),
      );
    } catch(e) {
      history.push('/admin/gerenciar-pedidos');
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Não foi possível enviar mensagem, revise as configurações em Integrações, WhatsApp ChatIA. Verifique se o endereço ou token estão corretos.',
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };
