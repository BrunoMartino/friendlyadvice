import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { setDataPaginacao } from '../../../Components/Paginacao/action';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const urlContasReceber = 'api/v1/contasReceber?det=COMPLETA';
export const origemContasReceber = 'contasReceber';

export const SHOW_CONTA_RECEBER_SELECTED =
  '[CONTAS_RECEBER]CONTA_RECEBER_SELECTED';
export const SET_ALL_CONTAS_RECEBER = '[CONTAS_RECEBER]TODOS_OS_CONTAS_RECEBER';
export const SET_LOADING_CONTAS_RECEBER = '[CONTAS_RECEBER]CARREGA';

export const SET_CLEAN = '[CONTAS_RECEBER]LIMPAR';

export const loadingContasReceber = (paginaAtual: any) => (dispatch: any) => {
  try {
    dispatch(
      setDataPaginacao(
        `${urlContasReceber}`,
        paginaAtual - 1,
        `${origemContasReceber}`,
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

export const contaReceberSelected = (obj: any) => (dispatch: any) => {
  dispatch({ type: SHOW_CONTA_RECEBER_SELECTED, payload: obj });
};

export const setLoadingContasReceber = (value: boolean) => (dispatch: any) => {
  dispatch({ type: SET_LOADING_CONTAS_RECEBER, payload: value });
};

export const setCleanContasReceber = () => (dispatch: any) => {
  dispatch({ type: SET_CLEAN });
};
