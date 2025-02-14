import { ETypePagination } from '../../../../../components/Paginacao/interfacePaginacao';
import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { getTokenDashboard } from '../../../../../utils/fn';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import {
  setDataPaginacao,
  setLoading,
} from '../../../Components/Paginacao/action';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const urlComplementos = '/api/v1/complementos';
export const origemComplementos = 'complementos';

export const EDICAO_COMPLEMENTOS = '[COMPLEMENTOS]EDICAO';
export const LIMPAR_DADOS_COMPLEMENTOS = '[COMPLEMENTOS]LIMPAR';

export const carregaTodosComplementos =
  (paginaAtual: any) => async (dispatch: any) => {
    try {
      dispatch(
        setDataPaginacao(
          `${urlComplementos}`,
          paginaAtual - 1,
          `${origemComplementos}`,
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

export const complementoSelecionadoEdicao = (obj: any) => (dispatch: any) => {
  dispatch({ type: EDICAO_COMPLEMENTOS, payload: obj });
};

export const limparDadosComplemento = () => async (dispatch: any) => {
  dispatch({ type: LIMPAR_DADOS_COMPLEMENTOS });
};

export const desabilitaComplementos =
  (id: string, sinc: boolean) => async (dispatch: any, getState: any) => {
    dispatch(setLoading(true));
    try {
      await api.patch(
        `${urlComplementos}/${id}`,
        { pause: !sinc },
        {
          headers: {
            authorization: `bearer ${getTokenDashboard()}`,
          },
        },
      );
      const { paginaAtual, valorPesquisado } = getState().session.paginacao;
      await dispatch(
        setDataPaginacao(
          urlComplementos,
          paginaAtual - 1,
          origemComplementos,
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
