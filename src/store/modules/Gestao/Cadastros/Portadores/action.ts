import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { getTokenDashboard } from '../../../../../utils/fn';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const LIMPAR_PORTADORES = '[PORTADORES]LIMPAR';
export const GET_ALL_PORTADORES = '[PORTADORES]GET_ALL_PORTADORES';

export const getPortadores = () => async (dispatch: any) => {
  try {
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
    const { data } = await api.get('api/v1/portadores');
    dispatch({ type: GET_ALL_PORTADORES, payload: data.portadores.rows });
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
