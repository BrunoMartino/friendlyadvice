import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import { apiEmissor } from '../../../../../services/api';
import { getTokenDashboard } from '../../../../../utils/fn';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { setDataPaginacao } from '../../../Components/Paginacao/action';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const urlNotasFiscais = 'api/v1/notasFiscais';
export const origemNotasFiscais = 'notasFiscais';

export const SHOW_NOTA_FISCAL_SELECTED = '[NOTAS_FISCAIS]NOTA_FISCAL_SELECTED';
export const SET_ALL_NOTAS_FISCAIS = '[NOTAS_FISCAIS]TODAS_AS_NOTAS_FISCAIS';
export const SET_LOADING_NOTAS_FISCAIS = '[NOTAS_FISCAIS]CARREGA';

export const SET_CLEAN = '[NOTAS_FISCAIS]LIMPAR';

interface NotaFiscal {
  checked: boolean;
  codigoUF: number;
  dataEmissao: string;
  disabled: false;
  idFiscalCab: string;
  nomeCliente: string;
  numeroNotaFiscal: number;
  serie: number;
  siglaUF: string;
  somaTotalNF: string;
  status: boolean | null;
  valor: string;
}

export const loadingNotasFiscais = (paginaAtual: any) => (dispatch: any) => {
  try {
    dispatch(
      setDataPaginacao(
        `${urlNotasFiscais}`,
        paginaAtual - 1,
        `${origemNotasFiscais}`,
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

export const notaFiscalSelected =
  (nf: NotaFiscal | Record<string, any>, history?: any) =>
  async (dispatch: any) => {
    apiEmissor.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
    try {
      const { data } = await apiEmissor.get(
        `v1/fiscalComplete/numero/${nf.numeroNotaFiscal}/serie/${nf.serie}`,
      );

      dispatch({ type: SHOW_NOTA_FISCAL_SELECTED, payload: data.fiscalCab });

      // if (history) await history.push('/cadastros/notasfiscais/');
    } catch (err) {
      console.error(err);
    }
  };

export const setLoadingNotasFiscais = (value: boolean) => (dispatch: any) => {
  dispatch({ type: SET_LOADING_NOTAS_FISCAIS, payload: value });
};

export const setCleanNotaFiscal = () => (dispatch: any) => {
  dispatch({ type: SET_CLEAN });
};
