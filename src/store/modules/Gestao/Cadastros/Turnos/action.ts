import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { getTokenDashboard } from '../../../../../utils/fn';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const EDICAO_TURNOS = '[TURNOS]EDICAO';
export const LIMPAR_DADOS_TURNOS = '[TURNOS]LIMPAR';

export const editarTurnos = (object: any) => async (dispatch: any) => {
  dispatch({ type: EDICAO_TURNOS, payload: object });
};

export const gravaTurno =
  (values: any, objeto: any, actions: any) => async (dispatch: any) => {
    try {
      if (
        values.segundaMin ||
        values.tercaMin ||
        values.quartaMin ||
        values.quintaMin ||
        values.sextaMin ||
        values.sabadoMin ||
        values.domingoMin
      ) {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
        await api.post('api/v1/configuracaoTurnos', {
          turnoDescricao: objeto.turnoDescricao.trim(),
          horarios: objeto.horarios,
        });
        dispatch(
          abrirMensagem({
            open: true,
            mensagem: 'Sucesso ao cadastrar o registro.',
            tipo: TipoMensagem.SUCESSO,
          }),
        );
      } else {
        dispatch(
          abrirMensagem({
            open: true,
            mensagem: 'Cadastre pelo menos um turno para continuar',
            tipo: TipoMensagem.ERRO,
          }),
        );
      }
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

export const updateTurnos =
  (actions: any, history: any, objeto: any, id: any) =>
  async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const { data } = await api.patch(`api/v1/configuracaoTurnos/${id}`, {
        turnoDescricao: objeto.turnoDescricao.trim(),
        horarios: objeto.horarios,
      });

      history.push('/listagem/turnos');
      dispatch(limparTurnos());
      if (data) {
        dispatch(
          abrirMensagem({
            open: true,
            mensagem: 'Sucesso ao editar o registro.',
            tipo: TipoMensagem.SUCESSO,
          }),
        );
      }
      actions.setSubmitting(false);
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

export const limparTurnos = () => (dispatch: any) => {
  dispatch({ type: LIMPAR_DADOS_TURNOS });
};
