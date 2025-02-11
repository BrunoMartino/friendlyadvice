import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { getTokenDashboard } from '../../../../../utils/fn';
import { removerMascara } from '../../../../../utils/mascaras';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const LIMPAR_REPRESENTANTES = '[REPRESENTANTES]LIMPAR';
export const EDITAR_REPRESENTANTES = '[REPRESENTANTES]EDITAR';

export const postRepresentantes =
  (values: any, actions: any) => async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.post('/api/v1/representantes', {
        nome: values.nome,
        codIntegracao: values.codIntegracao ? values.codIntegracao : undefined,
        documento: values.documento ? removerMascara(values.documento) : null,
        funcao: values.funcao.descricao ? values.funcao.descricao : null,
        telefone: values.telefone ? values.telefone : null
      });

      dispatch(limpaRepresentantes());
      actions.setFieldValue('codIntegracao', '');
      actions.resetForm();
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

export const limpaRepresentantes = () => (dispatch: any) => {
  dispatch({ type: LIMPAR_REPRESENTANTES });
};

export const editRepresentantes = (obj: any) => (dispatch: any) => {
  dispatch({ type: EDITAR_REPRESENTANTES, payload: obj });
};

export const patchRepresentantes =
  (id: any, values: any, actions: any, history: any) =>
  async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const { data } = await api.put(`/api/v1/representantes/${id}`, {
        nome: values.nome,
        codIntegracao: values.codIntegracao ? values.codIntegracao : null,
        documento: values.documento ? removerMascara(values.documento) : null,
        funcao: values.funcao.descricao ? values.funcao.descricao : null,
        telefone: values.telefone ? values.telefone : null,
      });

      actions.resetForm();
      dispatch(limpaRepresentantes());

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
      history.push('/listagem/representantes');
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
