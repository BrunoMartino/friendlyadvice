import { TipoMensagem } from '../../../../../components/SnackBar/interface';
// import { IFilters } from '../../../../../pages/Gestao/Controle/GerenciamentoCaixas/index-gerenciamento-caixas';
import api from '../../../../../services/api';
import { getTokenDashboard } from '../../../../../utils/fn';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const GET_CASHIER = '[GERENCIAMENTOCAIXAS]GET';
export const GET_CASHIER_SELECTED = '[CAIXAS]GET_CASHIER';
export const SET_FILTERS = '[CAIXAS]SET_FILTERS';
export const CLEAN_FILTERS = '[CAIXAS]CLEAN_FILTERS';
export const CLEAN_CASHIER_SELECTED = '[CAIXAS]CLEAN_CASHIER';
export const SET_LOADING = '[CAIXAS]SET_LOADING';

export const getCaixas = () => async (dispatch: any) => {
  try {
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
    const { data } = await api.get('api/v1/caixas');

    const arrayData = data.caixas.rows.map((el: any) => ({
      id: el.id,
      description: el.caixa,
    }));

    dispatch({ type: GET_CASHIER, payload: arrayData });
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

export const caixaSelectedToReport =
  (value: string | null, cb?: any): any =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      api.defaults.headers.authorization = ` Bearer ${getTokenDashboard()}`;
      const { data } = await api.get(`/api/v1/caixas/${value}`);

      dispatch({ type: GET_CASHIER_SELECTED, payload: data.caixa });

      if (cb) cb();
    } catch (e) {
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
    dispatch(setLoading(false));
  };

// export const setFiltersExisting = (filter: IFilters) => ({
//   type: SET_FILTERS,
//   payload: filter,
// });

export const setLoading = (loading: boolean) => (dispatch: any) => {
  dispatch({ type: SET_LOADING, payload: loading });
};

export const cleanFiltersExisting = () => ({ type: CLEAN_FILTERS });

export const cleanCashierSelected = () => ({ type: CLEAN_CASHIER_SELECTED });
