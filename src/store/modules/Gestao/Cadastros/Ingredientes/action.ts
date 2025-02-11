import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { getTokenDashboard } from '../../../../../utils/fn';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { setDataPaginacao } from '../../../Components/Paginacao/action';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const EDICAO_INGREDIENTES = '[INGREDIENTES]EDICAO';
export const REMOVER_INGREDIENTE_CADASTRO = '[INGREDIENTES]REMOVER';
export const LIMPAR_DADOS_INGREDIENTES = '[INGREDIENTES]LIMPAR';

export const urlIngredientes = '/api/v1/ingredientes';
export const origemIngredientes = 'ingredientes';

export const ingredienteSelecionadoEdicao =
  (obj: any) => async (dispatch: any) => {
    dispatch({ type: EDICAO_INGREDIENTES, payload: obj });
  };

export const limparDadosIngredientes = () => async (dispatch: any) => {
  dispatch({ type: LIMPAR_DADOS_INGREDIENTES });
};

export const carregarIngredientes =
  (paginaAtual: any) => async (dispatch: any) => {
    try {
      dispatch(
        setDataPaginacao(
          `${urlIngredientes}`,
          paginaAtual - 1,
          `${origemIngredientes}`,
        ),
      );
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

export const existeIngrediente =
  (descricao: any, codigo: string) => async (getState: any) => {
    const dadosIngredientes = getState().session.paginacao.data;
    if (dadosIngredientes && dadosIngredientes.length > 0) {
      const ingrediente = await dadosIngredientes.filter((i: any) => {
        return (
          (i.descricao.trim().toLowerCase() === descricao.toLowerCase() &&
            i.codigoOrigem === codigo) ||
          i.descricao.trim().toLowerCase() === descricao.toLowerCase() ||
          i.codigoOrigem === codigo
        );
      });
      return ingrediente.length > 0;
    }
  };

export const gravarIngredientes =
  (values: any, actions: any, id: string, history: any) =>
  async (dispatch: any) => {
    try {
      if (id) {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
        await api.patch(`${urlIngredientes}/${values.id}`, {
          descricao: values.descricao.trim(),
          codigoOrigem:
            values.codigoOrigem.length > 0
              ? values.codigoOrigem.padStart(7, '0')
              : null,
        });
        dispatch(
          abrirMensagem({
            open: true,
            mensagem: `Sucesso ao editar o registro.`,
            tipo: TipoMensagem.SUCESSO,
          }),
        );
        dispatch(limparDadosIngredientes());
        history.push('/listagem/ingredientes');
      } else {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
        await api.post(`${urlIngredientes}`, {
          descricao: values.descricao.trim(),
          codigoOrigem:
            values.codigoOrigem.length > 0
              ? values.codigoOrigem.padStart(5, '0')
              : null,
        });
        dispatch(
          abrirMensagem({
            open: true,
            mensagem: `Sucesso ao cadastrar o registro.`,
            tipo: TipoMensagem.SUCESSO,
          }),
        );

        await dispatch(
          setDataPaginacao(`${urlIngredientes}`, 0, `${origemIngredientes}`),
        );

        actions.resetForm({
          codigo: '',
          codigoOrigem: '',
          descricao: '',
          id: '',
          editar: false,
        });
        dispatch(limparDadosIngredientes());
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
