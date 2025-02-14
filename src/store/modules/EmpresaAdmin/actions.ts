import { TipoMensagem } from '../../../components/SnackBar/interface';
import api from '../../../services/api';
import { getTokenDashboard } from '../../../utils/fn';
import trataExcecao from '../../../utils/tratamentoExcecao';
import { setLoadingDashboard } from '../Gestao/Dashboard/action';
import { fecharModalConfirmacao } from '../Components/ModalConfirmacao/action';
import { abrirMensagem } from '../Components/SnackBar/action';
import { SET_LICENCAS_EMPRESA } from '../Licencas/action';

export const CARREGAR_DADOS_EMPRESA_ADMIN = 'CARREGAR_DADOS_EMPRESA_ADMIN';
export const CARREGAR_DADOS_RELATORIO_ADMIN = 'CARREGAR_DADOS_RELATORIO_ADMIN';
export const CARREGAR_DADOS_USUARIOS_INPERA = 'CARREGAR_DADOS_USUARIOS_INPERA';
export const SET_TEMPO_ENTREGA_EMPRESA_ADMIN = 'SET_TEMPO_ENTREGA_EMPRESA_ADIM';
export const SET_LICENCAS = 'SET_LICENCAS';
export const ALTERAR_IMAGEMS_LOGOTIPO = '[EMPRESA_ADMIN]ALTERAR_LOGOTIPO';
export const ALTERAR_IMAGEMS_BACKGROUND = '[EMPRESA_ADMIN]ALTERAR_BACKGROUND';
export const ALTERAR_FORMA_TAXA_ENTREGA = '[EMPRESA_ADMIN]ALTERAR_TAXAENTREGA';
export const SET_TOKEN_ADMINISTRACAO = '[EMPRESA_ADMIN]TOKEN_ADM';
export const SET_LOADING_DASHBOARD = '[EMPRESA_ADMIN]SET_LOADING_DASHBOARD';
export const SET_LOADING_LICENCA = '[EMPRESA_ADMIN]SET_LOADING_LICENCA';
export const SET_LICENSE_SETED = '[EMPRESA_ADMIN]SET_LICENSE_SETED';
export const SET_TEMPO_RETIRADA_EMPRESA_ADMIN =
  '[EMPRESA_ADMIN] SET_TEMPO_RETIRADA_EMPRESA_ADMIN';

export const setLicenseSave = (bool: boolean) => ({
  type: SET_LICENSE_SETED,
  payload: bool,
});

export const setLicencas =
  (exibeMensagem?: boolean, onload?: any) => async (dispatch: any) => {
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
        dispatch({ type: SET_LICENCAS, payload: [] });
        throw new Error('erro');
      }

      await dispatch({ type: SET_LICENCAS, payload: licenca.data });

      if (showText === true) {
        dispatch(
          abrirMensagem({
            mensagem: 'Licenças atualizadas com sucesso',
            tipo: TipoMensagem.SUCESSO,
            open: true,
          }),
        );
        if (onload) onload.location.reload();
      }

      dispatch({ type: SET_LOADING_LICENCA, payload: false });

      dispatch(setLicenseSave(true));
      setTimeout(() => {}, 2000);
    } catch (err) {
      dispatch({ type: SET_LOADING_LICENCA, payload: false });
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
  };

export const carregarDadosEmpresaToken = () => async (dispatch: any) => {
  dispatch(setLoadingDashboard(true));
  api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

  const { data } = await api.get(`api/front/v1/pedidos/telaInicialToken`);

  // dispatch({ type: SET_LOADING_DASHBOARD, payload: false });
  if (
    data.telaInicial.empresa &&
    data.telaInicial.empresa.acessoDelivery &&
    data.telaInicial.empresa.acessoDelivery.length > 0
  ) {
    await dispatch({
      type: SET_LICENCAS_EMPRESA,
      payload: data.telaInicial.empresa.acessoDelivery,
    });
  }
  dispatch({ type: CARREGAR_DADOS_EMPRESA_ADMIN, payload: data });
  dispatch(setLoadingDashboard(false));
};

export const carregarDadosUsuariosInpera =
  (value: string) => async (dispatch: any) => {
    if (value) {
      dispatch(setLoadingDashboard(true));
      let arrayUsers = [];

      const { data } = await api.get(`api/usuarios/usuariosInpera/${value}`);
      if (data && data.usuarios && data.usuarios[0]) {
        arrayUsers = data.usuarios[0];
      }

      await dispatch({
        type: CARREGAR_DADOS_USUARIOS_INPERA,
        payload: arrayUsers,
      });
      dispatch(setLoadingDashboard(false));
    }
  };

export const setTempoEntregaEmpresaAdmin =
  (tempoEntrega: number) => async (dispatch: any, getState: any) => {
    try {
      await api.patch(
        `/api/v1/configuracaoMenuDigital/${
          getState().global.empresaAdmin.idConfiguracaoDelivery
        }`,
        {
          tempoEntrega,
        },
        {
          headers: {
            authorization: `Bearer ${getTokenDashboard()}`,
          },
        },
      );

      // dispatch(setTempoEntrega(tempoEntrega));
      dispatch({
        type: SET_TEMPO_ENTREGA_EMPRESA_ADMIN,
        payload: tempoEntrega,
      });

      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Dados alterados com sucesso!',
          tipo: TipoMensagem.SUCESSO,
        }),
      );
    } catch (err) {
      dispatch(fecharModalConfirmacao());
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(err),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const setTempoRetiradaEmpresaAdmin =
  (tempoDeRetirada: number) => async (dispatch: any, getState: any) => {
    try {
      await api.patch(
        `/api/v1/configuracaoMenuDigital/${
          getState().global.empresaAdmin.idConfiguracaoDelivery
        }`,
        {
          tempoDeRetirada,
        },
        {
          headers: {
            authorization: `Bearer ${getTokenDashboard()}`,
          },
        },
      );

      // dispatch(setTempoEntrega(tempoEntrega));
      dispatch({
        type: SET_TEMPO_RETIRADA_EMPRESA_ADMIN,
        payload: tempoDeRetirada,
      });
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Dados alterados com sucesso!',
          tipo: TipoMensagem.SUCESSO,
        }),
      );
    } catch (err) {
      dispatch(fecharModalConfirmacao());
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(err),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const alterarLogotipoEmpresa = (logotipo: any) => (dispatch: any) => {
  dispatch({
    type: ALTERAR_IMAGEMS_LOGOTIPO,
    payload: {
      logotipoEmpresa: logotipo,
    },
  });
};

export const alterarBackgroundEmpresa =
  (background: any) => (dispatch: any) => {
    dispatch({
      type: ALTERAR_IMAGEMS_BACKGROUND,
      payload: {
        background,
      },
    });
  };

export const alterarFormaTaxaEntregaEmpresa =
  (formaTaxa: string) => (dispatch: any) => {
    dispatch({
      type: ALTERAR_FORMA_TAXA_ENTREGA,
      payload: {
        formaTaxa,
      },
    });
  };
