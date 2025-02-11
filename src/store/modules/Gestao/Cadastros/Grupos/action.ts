import { ETypePagination } from '../../../../../components/Paginacao/interfacePaginacao';
import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { getTokenDashboard } from '../../../../../utils/fn';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import {
  setCheckItem,
  setDataPaginacao,
  setLoading,
} from '../../../Components/Paginacao/action';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const LIMPAR_DADOS_GRUPO = '[CADASTRO_GRUPO]LIMPAR_DADOS_GRUPO';
export const CARREGAR_CADASTRO_GRUPOS =
  '[CADASTRO_GRUPO]CARREGAR_CADASTRO_GRUPOS';
export const CARREGA_HORARIOS = '[CADASTRO_GRUPO]CARREGA_HORARIOS';

export const urlGrupos = 'api/v1/grupos';
export const origemGrupos = 'grupos';

export const carregaHorarios: any = () => async (dispatch: any) => {
  try {
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
    const { data } = await api.get('api/v1/horarioEspecial');

    dispatch({
      type: CARREGA_HORARIOS,
      payload: data.horariosEspeciais.rows.map((el: any) => ({
        id: el.id,
        descricao: el.descricao,
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

export const orderUp =
  (id: string, url: string, origem: string) =>
  async (dispatch: any, getState: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.put(`api/v1/grupos/orderup/${id}`);

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
      await api.put(`api/v1/grupos/orderdown/${id}`);

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

export const carregarGruposEdicao = (obj: any) => async (dispatch: any) => {
  dispatch({ type: CARREGAR_CADASTRO_GRUPOS, payload: obj });
};

export const limparDadosGrupos = () => async (dispatch: any) => {
  dispatch({ type: LIMPAR_DADOS_GRUPO });
};

export const habilitaAgregacaoGrupo =
  (id: string, sinc: boolean) => async (dispatch: any, getState: any) => {
    dispatch(setLoading(true));
    try {
      await api.put(
        `${urlGrupos}/${id}`,
        { agregacao: !sinc },
        {
          headers: {
            authorization: `bearer ${getTokenDashboard()}`,
          },
        },
      );
      const { paginaAtual, valorPesquisado } = getState().session.paginacao;
      await dispatch(
        setDataPaginacao(
          urlGrupos,
          paginaAtual - 1,
          'grupos',
          valorPesquisado,
          undefined,
          ETypePagination.CADASTROS,
        ),
      );
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
