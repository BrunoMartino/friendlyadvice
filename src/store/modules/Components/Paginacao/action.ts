import Qs from 'qs';
import { ETypePagination } from '../../../../components/Paginacao/interfacePaginacao';
import { TipoMensagem } from '../../../../components/SnackBar/interface';
import api from '../../../../services/api';
import {
  TOTAL_ITENS_PAGINA,
  TOTAL_ITENS_PAGINA_GERENCIAMENTO,
} from '../../../../utils/consts';
import { getTokenDashboard } from '../../../../utils/fn';
import trataExcecao from '../../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../SnackBar/action';

export const SET_PAGINAATUAL = '[Paginação] SET_PAGINAATUAL';
export const SET_TOTALPAGINA = '[Paginação] SET_TOTALPAGINA';
export const SET_DATAPAGINACAO = '[Paginação] SET_DATAPAGINACAO';
export const SET_VALORPESQUISA = '[Paginação] SET_VALORPESQUISA';
export const SET_LIMPARPESQUISA = '[Paginação] SET_LIMPARPESQUISA';
export const SET_LIMPARDADOS = '[Paginação] SET_LIMPARDADOS';
export const SET_LIMPARDATA = '[Paginação] SET_LIMPARDATA';
export const SET_CHECK_ITEM = '[Paginação] SET_CHECK_ITEM';
export const SET_CHECK_ONE_ITEM = '[Paginação] SET_CHECK_ONE_ITEM';
export const SET_ALL_ITEM = '[Paginação] SET_ALL_ITEM';
export const SET_DATA = '[Paginação] SET_DATA';
export const REMOVE_DATA = '[Paginação] REMOVE_DATA';
export const SET_CHANGE_DATA_PEDIDO = '[Paginação] SET_CHANGE_DATA_PEDIDO';
export const DELETE_DATA = '[Paginação] DELETE_DATA';
export const SET_ORIGEM = '[Paginação] SET_ORIGEM';
export const SET_LOADING = '[Paginação] SET_LOADING';
export const SET_NAVIGATE_SUBPAGE_VISION =
  '[Paginação] SET_NAVIGATE_SUBPAGE_VISION';
export const SET_CLEAR_SUBPAGES_VISION =
  '[Paginação] SET_CLEAR_SUBPAGES_VISION';
export const SET_REFRESH_DATA_PAGINATION =
  '[Paginação] SET_REFRESH_DATA_PAGINATION';
export const SET_FILTROSELECIONADO = '[Paginação] SET_FILTROSELECIONADO';
export const SET_LIMPARFILTRO = '[Paginação] SET_LIMPARFILTRO';

export const setAllItem = (value: boolean) => ({
  type: SET_ALL_ITEM,
  payload: value,
});

export const setCheckItem = (id: any, value: boolean, key: any = null) => ({
  type: SET_CHECK_ITEM,
  payload: { id, value, key },
});

export const setCheckOneItem =
  (id: any, value: boolean) => async (dispatch: any) => {
    dispatch({
      type: SET_CHECK_ONE_ITEM,
      payload: { id, value },
    });
  };

export const setOrigem = (origem: string | undefined) => ({
  type: SET_ORIGEM,
  payload: origem,
});

export const deleteData =
  (
    urlDelete: string,
    origem: string,
    values: any,
    typePagination: ETypePagination = ETypePagination.CADASTROS,
    urlDataPaginacao?: string,
    exibirMensagem: boolean = true,
  ): any =>
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
        if (tipoParam === 'string') await api.delete(`${urlDelete}/${values}`);
        else {
          for await (let codigo of values) {
            await api.delete(`${urlDelete}/${codigo}`);
          }
        }
        if (exibirMensagem) {
          dispatch(
            abrirMensagem({
              open: true,
              mensagem: 'Sucesso ao remover os registros!',
              tipo: TipoMensagem.SUCESSO,
            }),
          );
        }
        dispatch({ type: DELETE_DATA, payload: values });
        const { paginaAtual, valorPesquisado } = getState().session.paginacao;
        await dispatch(
          setDataPaginacao(
            urlDataPaginacao ? urlDataPaginacao : urlDelete,
            paginaAtual - 1,
            origem,
            valorPesquisado,
            undefined,
            typePagination,
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

export const setValorPesquisado = (texto: string) => {
  return { type: SET_VALORPESQUISA, payload: texto };
};

export const setPaginaAtual = (pagina: number) => {
  return { type: SET_PAGINAATUAL, payload: pagina };
};

export const setTotalPagina = (totalPagina: number) => {
  return { type: SET_TOTALPAGINA, payload: totalPagina };
};

export const setLimparPesquisa = () => async (dispatch: any) => {
  dispatch({ type: SET_LIMPARPESQUISA });
};

export const setNavigationPages =
  (origem: string | undefined, page: number) => async (dispatch: any) => {
    await dispatch({
      type: SET_NAVIGATE_SUBPAGE_VISION,
      payload: { origem, page },
    });
  };

export const atualizarDataPaginacao =
  (url: string) => async (dispatch: any, getState: any) => {
    const origemAtual = getState().session.paginacao.origem;
    const paginaAtual = getState().session.paginacao.paginaAtual - 1;


    const { data } = await api.get(`${url}`, {
      params: {
        page: paginaAtual,
        limit: 10,
        // q: '',
        // order: order || undefined,
      },
    });


    dispatch({ type: SET_DATA, payload: data[`${origemAtual}`].rows });
  };

export const setDataPaginacao =
  (
    url?: string,
    pagina?: number,
    origem?: string,
    valorPesquisado?: string | {},
    order?: any,
    typePagination: ETypePagination = ETypePagination.CADASTROS,
    shouldResetPage: boolean = true,
  ): any =>
    async (dispatch: any, getState: any) => {
      dispatch(setLoading(true));
      try {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

        const rdOrigem = getState().session.paginacao.origem;

        const { data } = await api.get(`${url}`, {
          params: {
            page: rdOrigem !== origem && shouldResetPage ? 0 : pagina,
            limit:
              typePagination === ETypePagination.CADASTROS
                ? TOTAL_ITENS_PAGINA
                : TOTAL_ITENS_PAGINA_GERENCIAMENTO,
            q:
              valorPesquisado && rdOrigem === origem
                ? valorPesquisado
                : undefined,
            order: order || undefined,
          },
          paramsSerializer: (params) => Qs.stringify(params),
        });

        if (valorPesquisado && origem === rdOrigem) {
          dispatch(setValorPesquisado(String(valorPesquisado)));
        }
        if (rdOrigem !== origem && shouldResetPage) {
          dispatch(setOrigem(origem));
          dispatch(setPaginaAtual(1));
          dispatch(setLimparPesquisa());
        }

        if (pagina === 0 && !valorPesquisado) {
          dispatch(setPaginaAtual(1));
        }

        dispatch({
          type: SET_DATAPAGINACAO,
          payload: data[`${origem}`] || [],
          totalItensPagina:
            typePagination === ETypePagination.CADASTROS
              ? TOTAL_ITENS_PAGINA
              : TOTAL_ITENS_PAGINA_GERENCIAMENTO,
        });

        dispatch(setLoading(false));
      } catch (error) {
        dispatch(
          abrirMensagem({
            open: true,
            mensagem: trataExcecao(error),
            tipo: TipoMensagem.ERRO,
          }),
        );
      }
      dispatch(setLoading(false));
    };

export const setLoading = (loading: boolean) => (dispatch: any) => {
  dispatch({ type: SET_LOADING, payload: loading });
};

export const setLimparDados = () => async (dispatch: any) => {
  dispatch({ type: SET_LIMPARDADOS });
};
export const setLimparData = () => async (dispatch: any) => {
  dispatch({ type: SET_LIMPARDATA });
};

export const setChangeDataGerenciamentoPedido =
  (values: any) => async (dispatch: any) => {
    dispatch({ type: SET_CHANGE_DATA_PEDIDO, payload: values });
  };

export const refreshDataPagination =
  (value: any, origem?: string) => (dispatch: any, getState: any) => {
    dispatch({
      type: SET_REFRESH_DATA_PAGINATION,
      payload: { value, origem },
    });
  };

export const resetSubPages = () => async (dispatch: any) => {
  dispatch({ type: SET_CLEAR_SUBPAGES_VISION });
};

export const setFiltroSelecionado = (obj: any) => (dispatch: any) => {
  dispatch({ type: SET_FILTROSELECIONADO, payload: obj });
};

export const setLimparFiltro = () => (dispatch: any) => {
  dispatch({ type: SET_LIMPARFILTRO });
};

export const setData = (value: any) => (dispatch: any) => {
  dispatch({ type: SET_DATA, payload: value });
};

export const removeData =
  (fieldActual: string, fieldRemove: string) => (dispatch: any) => {
    dispatch({
      type: REMOVE_DATA,
      payload: { fieldActual: fieldActual, fieldRemove: fieldRemove },
    });
  };
