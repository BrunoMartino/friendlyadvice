import omit from 'lodash/omit';
import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { getTokenDashboard } from '../../../../../utils/fn';
import { abrirMensagem } from '../../../Components/SnackBar/action';
import tratarExcessao from '../../../../../utils/tratamentoExcecao';
import { TOTAL_ITENS_PAGINA } from '../../../../../utils/consts';
import trataExcecao from '../../../../../utils/tratamentoExcecao';

export const SET_REFERENCIAS = '[ReferenciaProduto] SET_REFERENCIAS';
export const SET_PRODUTO_SELECIONADO =
  '[ReferenciaProduto] SET_PRODUTO_SELECIONADO';
export const CLEAR_PRODUTO_SELECIONADO =
  '[ReferenciaProduto] CLEAR_PRODUTO_SELECIONADO';
export const LOAD_PRODUTO_REFERENCIAS =
  '[ReferenciaProduto] LOAD_PRODUTO_REFERENCIAS';
export const ADD_PRODUTO_REFERENCIA =
  '[ReferenciaProduto] ADD_PRODUTO_REFERENCIA';
export const REMOVE_PRODUTO_REFERENCIA =
  '[ReferenciaProduto] REMOVE_PRODUTO_REFERENCIA';
export const SET_DATA = '[ReferenciaProduto] SET_DATA';
export const SET_PAGINA_ATUAL = '[ReferenciaProduto] SET_PAGINA_ATUAL';
export const UPDATE_PRODUTO_REFERENCIA =
  '[ReferenciaProduto] UPDATE_PRODUTO_REFERENCIA';
export const ADD_REFERENCIA = '[ReferenciaProduto] ADD_REFERENCIA';
export const SET_LOADING_REFERENCIA =
  '[ReferenciaProduto] SET_LOADING_REFERENCIA';

const URL_BASE = `api/v1/produtosIngredientes`;
const URL_REFERENCIAS = `api/v1/ingredientes`;

export const addReferencia =
  (
    ingrediente: any,
    closeModal: any = false,
    setValue: any = false,
    setSubmitting: any = false,
  ) =>
  async (dispatch: any) => {
    try {
      const { data } = await api.post('api/v1/ingredientes', ingrediente, {
        headers: {
          authorization: `Bearer ${getTokenDashboard()}`,
        },
      });

      const info = omit(data.ingrediente, 'codigoOrigem');

      dispatch({ type: ADD_REFERENCIA, payload: info });

      if (setValue) {
        setValue('referencia', { ...info, inputValue: '' });
      }

      if (closeModal) {
        closeModal();
      }
    } catch (err) {
      if (setSubmitting) {
        setSubmitting(false);
      }
      dispatch(
        abrirMensagem({
          open: true,
          tipo: TipoMensagem.ERRO,
          mensagem: tratarExcessao(err),
        }),
      );
    }
  };

export const clearProdutoSelecionado = () => ({
  type: CLEAR_PRODUTO_SELECIONADO,
});

export const setProdutoSelecionado = (produto: any) => ({
  type: SET_PRODUTO_SELECIONADO,
  payload: produto,
});

export const setData = (pagina: number) => (dispatch: any, getState: any) => {
  const dados = Object.values(getState().session.referenciaProduto.produtoReferencias);
  const show = dados.slice(
    (pagina - 1) * TOTAL_ITENS_PAGINA,
    (pagina - 1) * TOTAL_ITENS_PAGINA + TOTAL_ITENS_PAGINA,
  );
  dispatch(setPaginaAtual(pagina));
  dispatch({ type: SET_DATA, payload: show });
};

export const setPaginaAtual = (pagina: number) => ({
  type: SET_PAGINA_ATUAL,
  payload: pagina,
});

export const loadProdutoReferencia =
  (pagina?: number) => async (dispatch: any, getState: any) => {
    try {
      const { id } = getState().session.referenciaProduto.produtoSelecionado;
      const { data } = await api.get(`${URL_BASE}/${id}`, {
        headers: {
          authorization: `Bearer ${getTokenDashboard()}`,
        },
      });

      dispatch({
        type: LOAD_PRODUTO_REFERENCIAS,
        payload: data.produtosIngredientes.rows.ingredientes,
      });
      dispatch(setData(pagina ? pagina : 1));
    } catch (err) {
      dispatch(
        abrirMensagem({
          open: true,
          tipo: TipoMensagem.ERRO,
          mensagem: tratarExcessao(err),
        }),
      );
    }
  };

export const addProdutoReferencia =
  (referencia: any, actions: any = null) =>
  async (dispatch: any, getState: any) => {
    try {
      const { data } = await api.post(URL_BASE, referencia, {
        headers: {
          authorization: `Bearer ${getTokenDashboard()}`,
        },
      });

      const itemReferencia: any = Object.values(
        getState().session.referenciaProduto.referencias,
      ).find((el: any) => el.id === data.produtoIngrediente.ingrediente);

      dispatch(
        abrirMensagem({
          open: true,
          tipo: TipoMensagem.SUCESSO,
          mensagem: 'Sucesso ao cadastrar o registro.',
        }),
      );

      dispatch({
        type: ADD_PRODUTO_REFERENCIA,
        payload: {
          id: data.produtoIngrediente.id,
          ingredienteId: data.produtoIngrediente.ingrediente,
          descricao: itemReferencia.descricao,
          consumo: data.produtoIngrediente.consumo,
        },
      });
      dispatch(setData(getState().session.referenciaProduto.pagina));
    } catch (err) {
      if (actions) {
        actions.setSubmitting(false);
      }
      dispatch(
        abrirMensagem({
          open: true,
          tipo: TipoMensagem.ERRO,
          mensagem: tratarExcessao(err),
        }),
      );
    }
  };

export const setReferencias = () => async (dispatch: any) => {
  try {
    const { data } = await api.get(URL_REFERENCIAS, {
      headers: {
        authorization: `Bearer ${getTokenDashboard()}`,
      },
    });

    const info = data.ingredientes.rows.map((item: any) =>
      omit(item, 'codigoOrigem'),
    );

    dispatch({ type: SET_REFERENCIAS, payload: info });
  } catch (err) {
    dispatch(
      abrirMensagem({
        open: true,
        tipo: TipoMensagem.ERRO,
        mensagem: tratarExcessao(err),
      }),
    );
  }
};

export const removeProdutoReferencia =
  (id: string) => async (dispatch: any, getState: any) => {
    try {
      await api.delete(`${URL_BASE}/${id}`, {
        headers: {
          authorization: `Bearer ${getTokenDashboard()}`,
        },
      });
      dispatch(
        abrirMensagem({
          open: true,
          tipo: TipoMensagem.SUCESSO,
          mensagem: 'Sucesso ao remover Ingrediente!',
        }),
      );
      dispatch({ type: REMOVE_PRODUTO_REFERENCIA, payload: id });
      dispatch(setData(getState().session.referenciaProduto.pagina));
    } catch (err) {}
  };

export const updateProdutoReferencia =
  (id: string, referencia: any, actions: any = false) =>
  async (dispatch: any, getState: any) => {
    try {
      const { data } = await api.patch(
        `${URL_BASE}/${id}`,
        { consumo: referencia.consumo },
        {
          headers: {
            authorization: `Bearer ${getTokenDashboard()}`,
          },
        },
      );
      dispatch(
        abrirMensagem({
          open: true,
          tipo: TipoMensagem.SUCESSO,
          mensagem: 'Sucesso ao editar o registro.',
        }),
      );

      const itemReferencia: any = Object.values(
        getState().session.referenciaProduto.referencias,
      ).find((el: any) => el.id === data.produtoIngrediente.ingrediente);

      dispatch({
        type: UPDATE_PRODUTO_REFERENCIA,
        payload: {
          id: data.produtoIngrediente.id,
          ingredienteId: data.produtoIngrediente.ingrediente,
          descricao: itemReferencia.descricao,
          consumo: data.produtoIngrediente.consumo,
        },
      });
      dispatch(setData(getState().session.referenciaProduto.pagina));
    } catch (err) {
      if (actions) {
        actions.setSubmitting(false);
        dispatch(
          abrirMensagem({
            open: true,
            tipo: TipoMensagem.ERRO,
            mensagem: tratarExcessao(err),
          }),
        );
      }
    }
  };

export const orderUpReferencia =
  (id: string) => async (dispatch: any, getState: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.put(`${URL_BASE}/orderup/${id}`);

      const paginaAtual = getState().session.referenciaProduto.pagina;

      dispatch(setLoadingReferencia(true));
      await dispatch(loadProdutoReferencia(paginaAtual));
      dispatch(setLoadingReferencia(false));
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

export const orderDownReferencia =
  (id: string) => async (dispatch: any, getState: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.put(`${URL_BASE}/orderdown/${id}`);

      const paginaAtual = getState().session.referenciaProduto.pagina;

      dispatch(setLoadingReferencia(true));
      await dispatch(loadProdutoReferencia(paginaAtual));
      dispatch(setLoadingReferencia(false));
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

export const setLoadingReferencia = (loading: boolean) => (dispatch: any) => {
  dispatch({ type: SET_LOADING_REFERENCIA, payload: loading });
};
