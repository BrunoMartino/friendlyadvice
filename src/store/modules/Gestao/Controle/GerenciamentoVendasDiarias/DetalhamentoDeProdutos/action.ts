import trataExcecao from '../../../../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../../../../Components/SnackBar/action';
import { TipoMensagem } from '../../../../../../components/SnackBar/interface';
import { getTokenDashboard } from '../../../../../../utils/fn';
import api from '../../../../../../services/api';

export const SETPRODUTODATA = '[DetalhamentoDeProdutos] SETPRODUTODATA';

export const setDataProdutos =
  (valorPesquisado: string) => async (dispatch: any) => {
    try {
      if (valorPesquisado) {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
        const { data } = await api.get('api/v1/itensPedido/soldInPeriod', {
          params: {
            q: valorPesquisado,
          },
        });
        dispatch({
          type: SETPRODUTODATA,
          payload: data.soldInPeriod.total,
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
