import { TipoMensagem } from '../../../components/SnackBar/interface';
import api from '../../../services/api';
import { getTokenDashboard } from '../../../utils/fn';
import trataExcecao from '../../../utils/tratamentoExcecao';
import { setLoadingDashboard } from '../Gestao/Dashboard/action';
import { abrirMensagem } from '../Components/SnackBar/action';

export const LOAD_CIDADES = 'LOAD_CIDADES';

export const loadCidades = () => async (dispatch: any, getState: any) => {
  dispatch(setLoadingDashboard(true));
  try {
    const cidadesRedux = await getState().global.cidades;

    if (await (cidadesRedux && cidadesRedux.length === 0)) {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const { data } = await api.get(`api/v1/cidades`, {
        params: {
          det: 'COMPLETA',
        },
      });

      if (!data || data.cidades.length === 0) {
        dispatch(
          abrirMensagem({
            open: true,
            mensagem: trataExcecao(
              'Ops ocorreu um erro ao tentar carregar as cidades, entre em contato um representante por favor.',
            ),
            tipo: TipoMensagem.ERRO,
          }),
        );

        dispatch({
          type: LOAD_CIDADES,
          payload: [],
        });
      } else {
        dispatch({
          type: LOAD_CIDADES,
          payload: data.cidades.rows,
        });
      }
    }
    dispatch(setLoadingDashboard(false));
  } catch (err) {
    dispatch(setLoadingDashboard(false));
    dispatch(
      abrirMensagem({
        open: true,
        mensagem: trataExcecao(err),
        tipo: TipoMensagem.ERRO,
      }),
    );
  }
};
