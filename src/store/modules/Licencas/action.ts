import { TipoMensagem } from '../../../components/SnackBar/interface';
import api from '../../../services/api';
import { getTokenDashboard } from '../../../utils/fn';
import trataExcecao from '../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../Components/SnackBar/action';

export const SET_LICENCAS = '[EMPRESA_LICENCAS]SET_LICENCAS';
export const SET_LOADING_LICENCA = '[EMPRESA_LICENCAS]SET_LOADING_LICENCA';
export const SET_LICENSE_SETED = '[EMPRESA_LICENCAS]SET_LICENSE_SETED';
export const SET_LICENCAS_EMPRESA = '[EMPRESA_LICENCAS]SET_LICENCAS_EMPRESA';

export const setLicencaAtualizada =
  (licenca: Array<{}>): any =>
  async (dispatch: any) => {
    await dispatch({
      type: SET_LICENCAS_EMPRESA,
      payload: licenca,
    });
    return await licenca;
  };

export const setLicenseSave = (bool: boolean) => ({
  type: SET_LICENSE_SETED,
  payload: bool,
});

export const setEmpresaLicencas =
  (exibeMensagem?: boolean, onload?: any): any =>
  async (dispatch: any) => {
    let returnLicencaEmpresa = null;
    try {
      dispatch({ type: SET_LOADING_LICENCA, payload: true });

      let showText = false;
      if (exibeMensagem === undefined) {
        showText = true;
      }

      const licenca = await api.get('api/v1/licencas/atualizarLicencas', {
        headers: {
          authorization: `Bearer ${getTokenDashboard()}`,
        },
      });

      if (!licenca.data) {
        // dispatch({ type: SET_LICENCAS, payload: [] });
        throw new Error('erro');
      }
      returnLicencaEmpresa = licenca.data.licencasAtualizadas;

      dispatch(setLicencaAtualizada(licenca.data.licencasAtualizadas)).then(
        () => {
          if (showText === true) {
            if (onload) {
              onload.location.reload();
            }

            dispatch(
              abrirMensagem({
                mensagem: 'Licenças atualizadas com sucesso',
                tipo: TipoMensagem.SUCESSO,
                open: true,
              }),
            );
          }
          if (onload) {
            dispatch({ type: SET_LOADING_LICENCA, payload: false });
            dispatch(setLicenseSave(false));
          } else {
            setTimeout(() => {
              dispatch({ type: SET_LOADING_LICENCA, payload: false });
            }, 2000);
          }
        },
      );
    } catch (err) {
      dispatch({ type: SET_LOADING_LICENCA, payload: false });
      if (onload) {
        dispatch(setLicenseSave(false));
      }
      const errorLicenca: any = err;
      if (
        errorLicenca &&
        errorLicenca.response &&
        errorLicenca.response.data &&
        errorLicenca.response.data.error
      ) {
        dispatch(
          abrirMensagem({
            mensagem: `${errorLicenca.response.data.error}`,
            tipo: TipoMensagem.ERRO,
            open: true,
          }),
        );
      } else {
        dispatch(
          abrirMensagem({
            mensagem: trataExcecao(errorLicenca),
            tipo: TipoMensagem.ERRO,
            open: true,
          }),
        );
      }
    }
    return returnLicencaEmpresa;
  };
