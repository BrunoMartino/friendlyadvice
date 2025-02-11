import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { TOTAL_ITENS_PAGINA } from '../../../../../utils/consts';
import { getTokenDashboard } from '../../../../../utils/fn';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const SET_PRODUTO_SELECIONADO_CONDICIONAL =
  '[CONDICIONAL_PRODUTO]PRODUTO_SELECIONADO';

export const SET_CARREGA_CONDICIONAIS_CADASTROPRODUTO =
  '[CONDICIONAL_PRODUTO]CARREGAR_CONDICONAIS';

export const ADD_CONDICIONAL_PRODUTO = '[CONDICIONAL_PRODUTO]ADICIONAR';

export const REMOVER_CONDICIONAL_PRODUTO = '[CONDICIONAL_PRODUTO]REMOVER';
export const CARREGA_CONDICIONAL_PRODUTO = '[CONDICIONAL_PRODUTO]CARREGAR';
export const LIMPAR_DADOS_CONDICIONAL_PRODUTO = '[CONDICIONAL_PRODUTO]LIMPAR';
export const LIMPAR_DATA = '[CONDICIONAL_PRODUTO]LIMPAR_DATA';

export const SET_DATA_CONDICIONAL_PRODUTO = '[CONDICIONAL_PRODUTO]SET_DATA';
export const SET_PAGINA_ATUAL_CONDICIONAL_PRODUTO =
  '[CONDICIONAL_PRODUTO]SET_PAGINA_ATUAL';

export const LOAD_SELECTED_PRODUCTS =
  '[CONDICIONAL_PRODUTO] LOAD_SELECTED_PRODUCTS';
export const TOGGLE_SELECTION = '[CONDICIONAL_PRODUTO] TOGGLE_SELECTION';
export const SEND_DATA_COMPLEMENTOS =
  '[CONDICIONAL_PRODUTO] SEND_DATA_COMPLEMENTOS';
export const INATIVAR_TODOS_COMPLEMENTOS =
  '[CONDICIONAL_PRODUTO] INATIVAR_TODOS_COMPLEMENTOS';
export const LIMPAR_PRODUTOS = '[CONDICIONAL_PRODUTO]LIMPAR_PRODUTOS';
export const SET_LOADING = '[CONDICIONAL_PRODUTO]SET_LOADING';

//Condicionais Produto
export const toggleSelectionCondProduto = (
  produtoId: string,
  value: boolean,
) => ({
  type: TOGGLE_SELECTION,
  payload: { produtoId, value },
});

export const inativarTodosProdutos =
  (cbOnClose?: () => void) => async (dispatch: any, getState: any) => {
    try {
      const id = getState().session.cadastroCondicional.condicionalItensSelecionado.id;
      if (!id)
        dispatch(
          abrirMensagem({
            open: true,
            tipo: TipoMensagem.ERRO,
            mensagem: 'Nenhum condicional foi selecionado',
          }),
        );

      await api.patch(
        `/api/v1/condicionaisComplementos/inativarComplementos/${id}`,
        {},
        {
          headers: {
            authorization: `bearer ${getTokenDashboard()}`,
          },
        },
      );
      dispatch({ type: INATIVAR_TODOS_COMPLEMENTOS });
      if (cbOnClose) cbOnClose();
    } catch (err) {
      dispatch(
        abrirMensagem({
          open: true,
          tipo: TipoMensagem.ERRO,
          mensagem: trataExcecao(err),
        }),
      );
    }
  };

export const sendDataComplementos =
  (cbOnClose?: () => void) => async (dispatch: any, getState: any) => {
    try {
      const complementoId =
        getState().session.cadastroCondicional.condicionalItensSelecionado
          .idComplemento;
      const condicionalId =
        getState().session.cadastroCondicional.condicionalSelecionado.id;
      let produtos = [];
      const selecionados = getState().session.cadastroCondicionalProduto.produtos;
      if (selecionados.length > 0) {
        produtos = selecionados.map((prod: any) => ({
          produtoId: prod.id,
          checked: prod.checked,
        }));
      }

      await api.patch(
        `/api/v1/condicionalProduto/complemento/${condicionalId}`,
        { complementoId, produtosSelecionados: produtos },
        {
          headers: {
            authorization: `bearer ${getTokenDashboard()}`,
          },
        },
      );

      dispatch({ type: SEND_DATA_COMPLEMENTOS });
      if (cbOnClose) {
        cbOnClose();
      }
    } catch (err) {
      dispatch(
        abrirMensagem({
          open: true,
          tipo: TipoMensagem.ERRO,
          mensagem: trataExcecao(err),
        }),
      );
    }
  };

export const loadSelectedProducts =
  (complementoId: string, condicionalId: string) => async (dispatch: any) => {
    try {
      if (!complementoId || !condicionalId)
        throw new Error('Erro na identificação do complemento');
      const { data } = await api.get(
        `/api/v1/condicionaisComplementos/condicional/${complementoId}/produtos/${condicionalId}`,
      );

      dispatch({ type: LOAD_SELECTED_PRODUCTS, payload: data.products });
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

export const setProdutoSelecionadoDoCondicional =
  (obj: any) => async (dispatch: any) => {
    dispatch({ type: SET_PRODUTO_SELECIONADO_CONDICIONAL, payload: obj });
  };

export const setCarregaCondicionais = () => async (dispatch: any) => {
  dispatch(setLoadingCondProdutos(true));
  try {
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
    const { data } = await api.get(`/api/v1/condicionais/`);

    if (!data || data.condicionais === 0) {
      throw new Error();
    }
    dispatch({
      type: SET_CARREGA_CONDICIONAIS_CADASTROPRODUTO,
      payload: data.condicionais.rows.map((cond: any) => ({
        id: cond.id,
        descricao: cond.descricao,
        inputValue: '',
      })),
    });
  } catch (err) {
    dispatch(
      abrirMensagem({
        open: true,
        mensagem: trataExcecao(err),
        tipo: TipoMensagem.ERRO,
      }),
    );
  }
  dispatch(setLoadingCondProdutos(false));
};

export const carregaCondicionalProduto =
  () => async (dispatch: any, getState: any) => {
    dispatch(setLoadingCondProdutos(true));
    try {
      const { id } = getState().session.cadastroCondicionalProduto.produtoSelecionado;
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const { data } = await api.get(`api/v1/condicionalProduto/${id}`);

      dispatch({
        type: CARREGA_CONDICIONAL_PRODUTO,
        payload: data.condicionais,
      });

      dispatch(setDataCondicionalProduto(1));
    } catch (err) {
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(err),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
    dispatch(setLoadingCondProdutos(false));
  };

export const gravaNovoCondicionalProduto =
  (idProduto: any, values: any) => async (dispatch: any, getState: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const { data } = await api.post(`/api/v1/condicionalProduto`, {
        idProduto: idProduto,
        idCondicional: values.idCondicional.id,
      });

      dispatch({
        type: ADD_CONDICIONAL_PRODUTO,
        payload: {
          ...data.condicionalProduto,
        },
      });

      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Sucesso ao cadastrar o registro.',
          tipo: TipoMensagem.SUCESSO,
        }),
      );

      dispatch(
        setDataCondicionalProduto(getState().session.cadastroCondicionalProduto.pagina),
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

export const removerCondicionalProduto =
  (idCondicionalProduto: any) => async (dispatch: any, getState: any) => {
    try {
      await api.delete(`api/v1/condicionalProduto/${idCondicionalProduto}`, {
        headers: {
          authorization: `Bearer ${getTokenDashboard()}`,
        },
      });
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Sucesso ao remover condicional do produto.',
          tipo: TipoMensagem.SUCESSO,
        }),
      );
      dispatch({
        type: REMOVER_CONDICIONAL_PRODUTO,
        payload: idCondicionalProduto,
      });
      dispatch(
        setDataCondicionalProduto(getState().session.cadastroCondicionalProduto.pagina),
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

export const limparDadosCondicionalProduto = () => async (dispatch: any) => {
  try {
    dispatch({ type: LIMPAR_DADOS_CONDICIONAL_PRODUTO });
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

export const orderUp = (id: string) => async (dispatch: any, getState: any) => {
  try {
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
    await api.put(`api/v1/condicionalProduto/orderup/${id}`);

    await dispatch(carregaCondicionalProduto());
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

export const orderDown =
  (id: string) => async (dispatch: any, getState: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.put(`api/v1/condicionalProduto/orderdown/${id}`);

      await dispatch(carregaCondicionalProduto());
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

export const limparDataCondicionalProduto = () => async (dispatch: any) => {
  dispatch({ type: LIMPAR_DATA });
};
export const limparProdutoLoadCondicional = () => async (dispatch: any) => {
  dispatch({ type: LIMPAR_PRODUTOS });
};

//Paginação Interna
const ordenar = (a: any, b: any) => {
  if (a.descricao > b.descricao) return 1;
  if (a.descricao < b.descricao) return -1;
  return 0;
};

export const setPaginaAtualCondicionalProduto = (pagina: number) => ({
  type: SET_PAGINA_ATUAL_CONDICIONAL_PRODUTO,
  payload: pagina,
});

export const setDataCondicionalProduto =
  (pagina: number) => (dispatch: any, getState: any) => {
    const dados = Object.values(
      getState().session.cadastroCondicionalProduto.condicionaisProduto,
    );
    const exibeDados = dados.slice(
      (pagina - 1) * TOTAL_ITENS_PAGINA,
      (pagina - 1) * TOTAL_ITENS_PAGINA + TOTAL_ITENS_PAGINA,
    );
    // .sort(ordenar );
    dispatch(setPaginaAtualCondicionalProduto(pagina));
    dispatch({ type: SET_DATA_CONDICIONAL_PRODUTO, payload: exibeDados });
  };

export const setLoadingCondProdutos = (loading: boolean) => (dispatch: any) => {
  dispatch({ type: SET_LOADING, payload: loading });
};
