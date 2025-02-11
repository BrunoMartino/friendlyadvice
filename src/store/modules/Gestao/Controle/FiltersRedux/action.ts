import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const SETBOOLEANFILTER = '[FILTER_REDUX] SETBOOLEANFILTER';
export const SETFILTERTOSAVE = '[FILTER_REDUX] SETFILTERTOSAVE';
export const SETFILTERTOSAVEREDUCER = '[FILTER_REDUX] SETFILTERTOSAVEREDUCER';
export const SETORIGINFILTERREDUX = '[FILTER_REDUX] SETORIGINFILTERREDUX';
export const CLEARFILTERREDUX = '[FILTER_REDUX] CLEARFILTERREDUX';
export const SETNEWSCREENREDIRECTION = '[FILTER_REDUX] SETNEWSCREENREDIRECTION';
export const SAMEORIGINTHROWFALSE = '[FILTER_REDUX] SAMEORIGINTHROWFALSE';
export const SET_ORIGEM_BY = '[FILTER_REDUX] SET_ORIGEM_BY';
export const SET_FILTER_VENDAS = '[FILTER_REDUX] SET_FILTER_VENDAS';

export const setBooleanSaved = (bool: Boolean) => (dispatch: any) => {
  try {
    dispatch({
      type: SETBOOLEANFILTER,
      payload: bool,
    });
  } catch (err) {
    dispatch(
      abrirMensagem({
        open: true,
        mensagem: trataExcecao(err),
        tipo: TipoMensagem.ERRO,
      }),
    );
  }
};

export const setFilterToSave =
  (filter: any) => (dispatch: any, getState: any) => {
    try {
      if (filter) {
        dispatch({
          type: SETFILTERTOSAVE,
          payload: filter,
        });
      }
    } catch (err) {
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(err),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };
export const setFilterToSaveVendas =
  (filter: any) => (dispatch: any, getState: any) => {
    try {
      if (filter) {
        dispatch({
          type: SET_FILTER_VENDAS,
          payload: filter,
        });
      }
    } catch (err) {
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(err),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const setOriginManagement = (origin: any) => (dispatch: any) => {
  dispatch({ type: SETORIGINFILTERREDUX, payload: origin });
};

export const setOrigemBy = (origem: string) => ({
  type: SET_ORIGEM_BY,
  payload: origem,
});

export const setClearDataSource =
  (origin: any, originBy?: string) => async (dispatch: any, getState: any) => {
    const outSideOrigin = getState().session.filtrosRedux.origem;
    const outSideOriginBy = getState().session.filtrosRedux.origemBy;
    if (originBy !== outSideOriginBy) {
      dispatch(setClean()); //limpou
      dispatch({ type: SAMEORIGINTHROWFALSE }); //setou false
    }
    if (origin !== outSideOrigin) {
      dispatch(setClean()); //limpou
      dispatch({ type: SAMEORIGINTHROWFALSE }); //setou false
    } else {
      // dispatch({ type: SAMEORIGINTHROWFALSE }); //setou false
    }
  };

export const setClean = () => (dispatch: any) => {
  dispatch({ type: CLEARFILTERREDUX });
};
