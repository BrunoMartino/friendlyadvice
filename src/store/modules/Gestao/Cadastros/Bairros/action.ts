import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const EDICAO_BAIRROS = '[BAIRROS]EDICAO';
export const LIMPAR_DADOS_BAIRROS = '[BAIRROS]LIMPAR';

export const SET_CIDADES_BAIRROS = '[BAIRROS]CARREGA_CIDADE';

export const SET_IDULTIMACIDADE = '[BAIRROS]CARREGA_IDULTIMACIDADE';

export const urlBairros = '/api/v1/bairros';
export const origemBairros = 'bairros';

export const bairroSelecionado = (obj: any) => async (dispatch: any) => {
  dispatch({ type: EDICAO_BAIRROS, payload: obj });
};

export const limparDadosBairro = () => async (dispatch: any) => {
  dispatch({ type: LIMPAR_DADOS_BAIRROS });
};

export const loadingCidadesEstado =
  () => async (dispatch: any, getState: any) => {
    try {
      const cidade = getState().global.cidades;
      if (cidade) {
        dispatch({
          type: SET_CIDADES_BAIRROS,
          payload: cidade.map((cid: any) => ({
            id: cid.id,
            descricao: `${cid.descricao}/${cid.Estado.sigla}`,
            inputValue: '',
          })),
        });
      }
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

export const idUltimaCidade =
  (idNovaCidade: string) => async (dispatch: any) => {
    dispatch({ type: SET_IDULTIMACIDADE, payload: idNovaCidade });
  };
