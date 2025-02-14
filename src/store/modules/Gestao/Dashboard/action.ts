export const CHANGE_MODAL_DASHBOARD = 'CHANGE_MODAL_DASHBOARD';
export const LOADING_DASHBOARD = '[DASHBOARD] LOADING';
export const SET_CHECK_LICENCAS = '[DASHBOARD] SET_CHECK_LICENCAS';

export const changeModalDashboard = (value: boolean) => {
  return { type: CHANGE_MODAL_DASHBOARD, payload: value };
};
export const setLoadingDashboard = (value: boolean) => {
  return { type: LOADING_DASHBOARD, payload: value };
};

export const licencasExpiradas = () => async (dispatch: any, getState: any) => {
  let value = false;
  const licencas = getState().global.empresaLicencas?.licencas;
  if (licencas && licencas.length > 0) {
    const dataAtual = Date.parse(String(new Date()));

    licencas.forEach((dt: any) => {
      const dataLicenca = Date.parse(String(new Date(dt.ultimaLiberacao)));

      if (dataAtual > dataLicenca) {
        value = true;
      } else {
        value = false;
      }
    });
  }
  dispatch({ type: SET_CHECK_LICENCAS, payload: value });
};
