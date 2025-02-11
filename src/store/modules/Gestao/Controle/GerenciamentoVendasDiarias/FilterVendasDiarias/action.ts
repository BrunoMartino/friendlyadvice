import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { TipoMensagem } from '../../../../../../components/SnackBar/interface';
import trataExcecao from '../../../../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../../../../Components/SnackBar/action';

export const SETFILTERVENDAS = '[FilterVendasDiarias] SETFILTERVENDAS';

export const SETFILTERVENDASSAVED =
  '[FilterVendasDiarias] SETFILTERVENDASSAVED';

export const SETLIMPARFILTROSVENDAS =
  '[FilterVendasDiarias] SETLIMPARFILTROSVENDAS';

export const SETSAVENUMBERSALE = '[FilterVendasDiarias] SETSAVENUMBERSALE';

export const SETNEWREPLACEOBJECT = '[FilterVendasDiarias] SETNEWREPLACEOBJECT';

export const SETCLEAROBJECT = '[FilterVendasDiarias] SETCLEAROBJECT';

export const SETLIMPARSALENUMBER = '[FilterVendasDiarias] SETLIMPARSALENUMBER';

export const SETDEFINECARROUSEL = '[FilterVendasDiarias] SETDEFINECARROUSEL';

export const SET_SEARCH_FILTER_SAVE = '[FilterVendasDiarias] SET_SEARCH_FILTER_SAVE';

export const SET_DATA_CARROSSEL_API = '[FilterVendasDiarias] SET_DATA_CARROSSEL_API';

export const SET_HEADERS_VALUES_TO_SEARCH =
'[FilterVendasDiarias] SET_HEADERS_VALUES_TO_SEARCH';
interface Iempresas {
  id: string;
  description: string;
}

interface Icaixas {
  id: string;
  description: string;
}
interface IData {
  tipo: string;
  inicial: Date | undefined;
  final: Date | undefined;
}

interface IFilterValues {
  empresa: Iempresas;
  caixa: Icaixas;
  periodo: IData;
}

export const setFilterOnReduxVendasDiarias =
  (setFilter: IFilterValues) => (dispatch: any) => {
    try {
      if (setFilter) {
        dispatch({
          type: SETFILTERVENDAS,
          payload: setFilter,
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

export const setFilterOnReduxVendasDiariasSave =
  (bool: boolean) => (dispatch: any) => {
    dispatch({
      type: SETFILTERVENDASSAVED,
      payload: bool,
    });
  };

export const SetLimparFiltrosVendasDiarias = () => (dispatch: any) => {
  dispatch({
    type: SETLIMPARFILTROSVENDAS,
  });
};

export const setSaveNumberOfSale = (captureData: number) => (dispatch: any) => {
  try {
    if (captureData) {
      dispatch({
        type: SETSAVENUMBERSALE,
        payload: captureData,
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

export const setLimparSaleNumber = () => async (dispatch: any) => {
  dispatch({
    type: SETLIMPARSALENUMBER,
  });
};

export const setReplaceObject =
  (objDefault: any) => async (dispatch: any, getState: any) => {
    try {
      const number = getState().session.filterVendasDiarias.numberSale;

      let obj =
        number === 0
          ? objDefault
          : Object.assign(objDefault, { numeroPedido: number });

      if (obj && Object.keys(obj).length > 0) {
        await dispatch({
          type: SETNEWREPLACEOBJECT,
          payload: obj,
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

export const setClearReplaceObject =
  (trataFiltros: {}) =>
  async (dispatch: ThunkDispatch<string, string, AnyAction>) => {
    dispatch({
      type: SETCLEAROBJECT,
      payload: trataFiltros,
    });
  };

export const setCarroselItemChange =
  () =>
  (dispatch: ThunkDispatch<string, string, AnyAction>, getState: () => any) => {
    try {
      const object = getState().session.filterVendasDiarias.replaceObject;
      if (object && Object.keys(object).length >= 3) {
        // dispatch(setPaginaAtual(1));
        // dispatch(resetSubPages())
        dispatch({
          type: SETDEFINECARROUSEL,
          payload: 'Produtos',
        });
      } else {
        dispatch({
          type: SETDEFINECARROUSEL,
          payload: 'Pedidos',
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

export const setHeaderValuesKeyToSearch = (data: any) => (dispatch: any) => {
  dispatch({
    type: SET_HEADERS_VALUES_TO_SEARCH,
    payload: data,
  });
};

export const saveFilterSearch = (data: string) => ({
  type: SET_SEARCH_FILTER_SAVE,
  payload: data
})

export const saveCarrosselApiData = (data: {origem: string, url: string}) => ({
  type: SET_DATA_CARROSSEL_API,
  payload: data
})
