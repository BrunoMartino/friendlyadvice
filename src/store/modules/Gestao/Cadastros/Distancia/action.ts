import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { getTokenDashboard } from '../../../../../utils/fn';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const CLEAR_DISTANCIACAD = '[DISTANCIACAD]CLEAR';
export const EDIT_DISTANCIACAD = '[DISTANCIACAD]EDIT';

export type typeCadDistancia = {
  id?: string;
  distanciaInicial: string;
  distanciaFinal: string;
  valorFrete: string;
};

export const postDistancia =
  (values: typeCadDistancia, actions: any) => async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const kmInicial = values.distanciaInicial.replaceAll('.', '');
      const kmFinal = values.distanciaFinal.replaceAll('.', '');

      await api.post('/api/v1/distancia', {
        distanciaInicial: parseFloat(kmInicial.replace(',', '.')),
        distanciaFinal: parseFloat(kmFinal.replace(',', '.')),
        valorFrete: parseFloat(values.valorFrete.replace(',', '.')),
      });

      actions.resetForm();
      dispatch(clearDistancia());
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Sucesso ao cadastrar o registro!',
          tipo: TipoMensagem.SUCESSO,
        }),
      );
    } catch (e) {
      actions.setSubmitting(false);
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const patchDistancia =
  (id: string, values: typeCadDistancia, actions: any, history: any) =>
  async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const kmInicial = values.distanciaInicial.replaceAll('.', '');
      const kmFinal = values.distanciaFinal.replaceAll('.', '');
      await api.patch(`/api/v1/distancia/${id}`, {
        distanciaInicial: parseFloat(kmInicial.replace(',', '.')),
        distanciaFinal: parseFloat(kmFinal.replace(',', '.')),
        valorFrete: parseFloat(values.valorFrete.replace(',', '.')),
      });

      actions.resetForm();
      dispatch(clearDistancia());
      history.push('/listagem/distancia');
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Sucesso ao editar o registro!',
          tipo: TipoMensagem.SUCESSO,
        }),
      );
    } catch (e) {
      actions.setSubmitting(false);
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const edicaoDistancia =
  (obj: typeCadDistancia): any =>
  (dispatch: any) => {
    dispatch({ type: EDIT_DISTANCIACAD, payload: obj });
  };

export const clearDistancia = () => (dispatch: any) => {
  dispatch({ type: CLEAR_DISTANCIACAD });
};
