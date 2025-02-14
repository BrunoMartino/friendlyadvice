import { TipoMensagem } from '../../../../../../components/SnackBar/interface';
import api from '../../../../../../services/api';
import { getTokenDashboard } from '../../../../../../utils/fn';
import trataExcecao from '../../../../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../../../../Components/SnackBar/action';

export const SETVENDASDIARIAS = '[VendasDiarias] SETVENDASDIARIAS';
export const SETEMPRESASFILTRO = '[VendasDiarias] SETEMPRESASFILTRO';
export const SETCAIXASFILTRO = '[VendasDiarias] SETCAIXASFILTRO';
export const SETLOADING = '[VendasDiarias] SETLOADING';

export const setCaixasFiltro = () => async (dispatch: any) => {
  try {
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
    const { data } = await api.get('/api/v1/caixas/cashierWithSale');

    const arrayData = data.caixas.rows.map((el: any) => ({
      id: el.id,
      description: el.caixa,
    }));

    await dispatch({
      type: SETCAIXASFILTRO,
      payload: arrayData,
    });
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

export const setEmpresasFiltro = () => async (dispatch: any) => {
  try {
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
    const empresasFiltro = await api.get('/api/v1/empresas/all');
    dispatch({
      type: SETEMPRESASFILTRO,
      payload: empresasFiltro.data.empresas.rows.map((el: any) => ({
        id: el.id,
        description: el.razao,
      })),
    });
  } catch (erro) {
    dispatch(
      abrirMensagem({
        open: true,
        tipo: TipoMensagem.ERRO,
        mensagem: trataExcecao(erro),
      }),
    );
  }
};

export const setVendasDiarias = (filtro: any) => async (dispatch: any) => {
  try {
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
    const vendasDiarias = await api.get('/api/v1/pedidos/dailySales', {
      params: {
        q: JSON.stringify(filtro),
      },
    });
    dispatch({
      type: SETVENDASDIARIAS,
      payload: vendasDiarias.data,
    });
  } catch (erro) {
    dispatch(
      abrirMensagem({
        open: true,
        tipo: TipoMensagem.ERRO,
        mensagem: trataExcecao(erro),
      }),
    );
  }
};
