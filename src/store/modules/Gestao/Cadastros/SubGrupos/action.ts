import { ETypePagination } from '../../../../../components/Paginacao/interfacePaginacao';
import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { getTokenDashboard } from '../../../../../utils/fn';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { setDataPaginacao } from '../../../Components/Paginacao/action';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const CARREGAR_GRUPO_SUBGRUPO = '[SUBGRUPO]CARREGAR_GRUPO_SUBGRUPO';
export const ADD_GRUPO_SUBGRUPO = '[SUBGRUPO]ADD_GRUPO_SUBGRUPO';
export const ADD_NOVO_GRUPO_DO_SUBGRUPO = '[SUBGRUPO]ADICIONAR_GRUPO';

export const EDICAO_CADASTRO_SUBGRUPOS = '[SUBGRUPO]EDICAO';
export const LIMPAR_DADOS_SUBGRUPO = '[SUBGRUPO]LIMPAR';
export const INSERT_FILTER_GRUPO = '[SUBGRUPO]INSERT_FILTER_GRUPO';

export const urlSubGrupo = 'api/v1/subgrupos';
export const origemSubGrupo = 'subgrupos';

//grupo

export const carregaGrupoDoSubgrupo = () => async (dispatch: any) => {
  try {
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

    const { data } = await api.get(`/api/v1/grupos`);

    if (!data || data.rows === 0) {
      throw new Error();
    }
    dispatch({
      type: CARREGAR_GRUPO_SUBGRUPO,
      payload: data.grupos.rows.map((el: any) => ({
        id: el.id,
        descricao: el.descricao,
        inputValue: '',
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

export const gravaNovoGrupoDoSubGrupo =
  (setFieldValue: any, values: any) => async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const { data } = await api.post(`/api/v1/grupos`, {
        id: values.id,
        descricao: values.descricao,
      });
      dispatch({
        type: ADD_NOVO_GRUPO_DO_SUBGRUPO,
        payload: data.grupo,
      });
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: `Sucesso ao cadastrar novo Grupo.`,
          tipo: TipoMensagem.SUCESSO,
        }),
      );
      setFieldValue('Grupo', {
        id: data.grupo.id,
        descricao: data.grupo.descricao,
        inputValue: '',
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

//subgrupo

export const carregarSubGrupos =
  (paginaAtual: any) => async (dispatch: any) => {
    try {
      dispatch(
        setDataPaginacao(
          `${urlSubGrupo}`,
          paginaAtual - 1,
          `${origemSubGrupo}`,
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

export const orderUp =
  (id: string, url: string, origem: string) =>
  async (dispatch: any, getState: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.put(`api/v1/subgrupos/orderup/${id}`);

      const { paginaAtual, valorPesquisado } = getState().session.paginacao;
      await dispatch(
        setDataPaginacao(
          url,
          paginaAtual - 1,
          origem,
          valorPesquisado,
          undefined,
          ETypePagination.CADASTROS,
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

export const orderDown =
  (id: string, url: string, origem: string) =>
  async (dispatch: any, getState: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.put(`api/v1/subgrupos/orderdown/${id}`);

      const { paginaAtual, valorPesquisado } = getState().session.paginacao;

      await dispatch(
        setDataPaginacao(
          url,
          paginaAtual - 1,
          origem,
          valorPesquisado,
          undefined,
          ETypePagination.CADASTROS,
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

export const edicaoSubGrupo = (obj: any) => async (dispatch: any) => {
  dispatch({ type: EDICAO_CADASTRO_SUBGRUPOS, payload: obj });
};

export const limparDadosSubGrupos = () => async (dispatch: any) => {
  dispatch({ type: LIMPAR_DADOS_SUBGRUPO });
};

export const insertFilterGrupo = (grupo: any) => (dispatch: any) => {
  dispatch({ type: INSERT_FILTER_GRUPO, payload: grupo });
};
