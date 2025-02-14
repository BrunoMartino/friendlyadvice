import api from '../../../../../../services/api';
import { abrirMensagem } from '../../../../Components/SnackBar/action';
import trataExcecao from '../../../../../../utils/tratamentoExcecao';
import { TipoMensagem } from '../../../../../../components/SnackBar/interface';
import { getTokenDashboard } from '../../../../../../utils/fn';

export const SETDETALHAMENTO = '[DetalhamentoDeColaborador] SETDETALHAMENTO';

export const setDetalhesColaborador =
  (valorPesquisado: string) => async (dispatch: any) => {
    try {
      if (valorPesquisado) {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
        const { data } = await api.get(
          'api/v1/representantes/agentInThePeriod',
          {
            params: {
              q: valorPesquisado,
            },
          },
        );
        dispatch({
          type: SETDETALHAMENTO,
          payload: data.SoldPerAgentInThePeriod.total,
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
