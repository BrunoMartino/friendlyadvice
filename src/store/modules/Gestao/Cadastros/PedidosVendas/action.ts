import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { setDataPaginacao } from '../../../Components/Paginacao/action';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const urlPedidosVendas = 'api/v1/pedidosVendas';
export const origemPedidosVendas = 'pedidosVendas';

export const SHOW_PEDIDO_VENDA_SELECTED =
  '[PEDIDOS_VENDAS]PEDIDO_VENDA_SELECTED';
export const SET_ALL_PEDIDOS_VENDAS = '[PEDIDOS_VENDAS]TODOS_OS_PEDIDOS_VENDAS';
export const SET_LOADING_PEDIDOS_VENDAS = '[PEDIDOS_VENDAS]CARREGA';

export const SET_CLEAN = '[PEDIDOS_VENDAS]LIMPAR';

export const loadingPedidosVendas = (paginaAtual: any) => (dispatch: any) => {
  try {
    dispatch(
      setDataPaginacao(
        `${urlPedidosVendas}`,
        paginaAtual - 1,
        `${origemPedidosVendas}`,
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

export const pedidoVendaSelected = (obj: any) => (dispatch: any) => {
  dispatch({ type: SHOW_PEDIDO_VENDA_SELECTED, payload: obj });
};

export const setLoadingPedidosVendas = (value: boolean) => (dispatch: any) => {
  dispatch({ type: SET_LOADING_PEDIDOS_VENDAS, payload: value });
};

export const setCleanPedidosVendas = () => (dispatch: any) => {
  dispatch({ type: SET_CLEAN });
};
