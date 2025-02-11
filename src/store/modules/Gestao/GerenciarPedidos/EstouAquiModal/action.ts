import api from '../../../../../services/api';
import { getTokenDashboard } from '../../../../../utils/fn';

export const DADOS_DO_INPUT_MODAL = '[EstouAquiModal] DADOS_DO_INPUT_MODAL';
export const DADOS_DO_INPUT_MODAL_NUMERATED =
  '[EstouAquiModal] DADOS_DO_INPUT_MODAL_NUMERATED';
export const SET_LOADING = '[EstouAquiModal] SET_LOADING';

export const setLoading = (bool: boolean) => ({
  type: SET_LOADING,
  payload: bool,
});

export const getDataInput =
  (inputInicial: number, inputFinal: number) =>
  async (dispatch: any, getState: any) => {
    try {
      const aliasName = getState().global.empresaAdmin.aliasEmpresa;
      const countOnBetweenNumber = (inicial: number, final: number) => {
        return Array.from(
          { length: final - inicial + 1 },
          (_, i) => inicial + i,
        );
      };
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      dispatch(setLoading(true));

      const qrCodeCreate = await api.post('/api/v1/geraqrcode', {
        alias: aliasName,
        dados: countOnBetweenNumber(inputInicial, inputFinal),
      });

      if (qrCodeCreate) {
        const response = await api.get('/api/v1/geraqrcode/download', {
          responseType: 'blob',
        });

        const fileURL = window.URL.createObjectURL(
          new Blob([response.data], { type: response.headers['content-type'] }),
        );

        const fileLink = document.createElement('a');

        fileLink.href = fileURL;

        fileLink.setAttribute('download', 'QrCodes');

        fileLink.setAttribute('target', '_blank');

        document.body.appendChild(fileLink);

        fileLink.click();
        fileLink.remove();
      }

      dispatch(setLoading(false));
      dispatch({
        type: DADOS_DO_INPUT_MODAL,
        payload: { inputInicial, inputFinal },
      });
    } catch (err) {}
  };
