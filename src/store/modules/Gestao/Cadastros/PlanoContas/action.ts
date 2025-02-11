import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { getTokenDashboard } from '../../../../../utils/fn';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { setDataPaginacao } from '../../../Components/Paginacao/action';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const LIMPAR_PLANOCONTAS = '[PLANOCONTAS]LIMPAR';
export const EDITAR_PLANOCONTAS = '[PLANOCONTAS]EDITAR';
export const GETALL_PLANOCONTAS = '[PLANOCONTAS]GETALL_PLANOCONTAS';
export const GET_PLANOCONTAS = '[PLANOCONTAS]GET_PLANOCONTAS';
export const GET_CLASSIFICACAOCONTA = '[PLANOCONTAS]GET_CLASSCONTA';

export const getClassificacaoContas =
  (objeto: any) => async (dispatch: any) => {
    try {
      await dispatch({
        type: GET_CLASSIFICACAOCONTA,
        payload: objeto.map((item: any) => ({
          id: item.id,
          descricao: item.descricao,
        })),
      });
    } catch (e) {
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const getPlanoContas = () => async (dispatch: any) => {
  try {
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
    const { data } = await api.get('api/v1/planoContas');
    dispatch({ type: GETALL_PLANOCONTAS, payload: data.planoContas.rows });
    dispatch({
      type: GET_PLANOCONTAS,
      payload: data.planoContas.rows.map((pc: any) => ({
        id: pc.id,
        descricao: pc.descricao,
        codigo: pc.codigo,
      })),
    });
  } catch (e) {
    dispatch(
      abrirMensagem({
        open: true,
        mensagem: trataExcecao(e),
        tipo: TipoMensagem.ERRO,
      }),
    );
  }
};

export const postPlanoContas =
  (values: any, actions: any) => async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.post('/api/v1/planoContas', {
        codigo: values.codigo,
        descricao: values.descricao,
        tipo: values.tipo,
        grau: values.grau.toString(),
        clasFluxoCaixa: values.fluxoCaixa.descricao || null,
      });

      actions.resetForm();
      dispatch(limpaPlanoContas());
      dispatch(getPlanoContas());
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

export const limpaPlanoContas = () => (dispatch: any) => {
  dispatch({ type: LIMPAR_PLANOCONTAS });
};

export const editPlanoContas = (obj: any) => (dispatch: any) => {
  dispatch({ type: EDITAR_PLANOCONTAS, payload: obj });
};

export const patchPlanoContas =
  (id: any, values: any, actions: any, history: any) =>
  async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const { data } = await api.put(`/api/v1/planoContas/${id}`, {
        codigo: values.codigo,
        descricao: values.descricao,
        tipo: values.tipo,
        grau: values.grau.toString(),
        clasFluxoCaixa: values.fluxoCaixa.descricao || null,
      });

      actions.resetForm();
      dispatch(limpaPlanoContas());

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
      history.push('/listagem/planoContas');
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

export const deletePlanoContas =
  (url: string, origem: string, values: any) =>
  async (dispatch: any, getState: any) => {
    try {
      const tipoParam = typeof values;
      if (
        tipoParam !== 'string' &&
        tipoParam !== 'object' &&
        values.length <= 0
      )
        return { type: '' };

      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      if (tipoParam === 'string') await api.delete(`${url}/${values}`);
      else {
        for await (let codigo of values) {
          await api.delete(`${url}/${codigo}`);
        }
      }
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Sucesso ao remover os registros!',
          tipo: TipoMensagem.SUCESSO,
        }),
      );
      dispatch({ type: 'DELETE_DATA', payload: values });
      const { paginaAtual, valorPesquisado } = getState().session.paginacao;
      await dispatch(
        setDataPaginacao(
          `${url}?sort=PCON_CODIGO`,
          paginaAtual - 1,
          origem,
          valorPesquisado,
        ),
      );
    } catch (err) {
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(err),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };
