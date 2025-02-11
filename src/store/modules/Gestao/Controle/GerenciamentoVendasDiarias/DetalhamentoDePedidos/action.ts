import api from '../../../../../../services/api';
import { abrirMensagem } from '../../../../Components/SnackBar/action';
import trataExcecao from '../../../../../../utils/tratamentoExcecao';
import { TipoMensagem } from '../../../../../../components/SnackBar/interface';
import { getTokenDashboard } from '../../../../../../utils/fn';

export const SETDATAPEDIDOS = '[DetalhamentoDePedido] SETDATAPEDIDOS';
export const SETDATAPEDIDOSGRANDTOTAL =
  '[DetalhamentoDePedido] SETDATAPEDIDOSGRANDTOTAL';
export const SETDATAPEDIDOSTOTALPAGE =
  '[DetalhamentoDePedido] SETDATAPEDIDOSTOTALPAGE';
export const SET_LIMPAR_DADOS_VENDA =
  '[DetalhamentoDePedido] LIMPAR_DADOS_VENDA';

export const setLimparDadosVenda = () => async (dispatch: any) => {
  dispatch({
    type: SET_LIMPAR_DADOS_VENDA,
  });
};

export const setDataPedido =
  (itens: any, history: any) => async (dispatch: any) => {
    try {
      dispatch({
        type: SETDATAPEDIDOS,
        payload: itens,
      });
      if (history) {
        history.push('/resumos/vendasdiarias/detalhespedidos');
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

export const setDataPedidoGrandTotal =
  (valorPesquisado: string) => async (dispatch: any) => {
    try {
      if (valorPesquisado) {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
        const { data } = await api.get('api/v1/pedidos/dailySalesByDate', {
          params: {
            q: valorPesquisado,
          },
        });
        dispatch({
          type: SETDATAPEDIDOSGRANDTOTAL,
          payload: data.dailySalesByDate.total,
        });
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
