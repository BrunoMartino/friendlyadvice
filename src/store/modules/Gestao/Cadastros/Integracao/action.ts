import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api, { apiFidelidade } from '../../../../../services/api';
import { getTokenDashboard } from '../../../../../utils/fn';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../../../Components/SnackBar/action';
import {
  deleteData,
  removeData,
  setData,
} from '../../../Components/Paginacao/action';
import moment from 'moment';
import { ETypePagination } from '../../../../../components/Paginacao/interfacePaginacao';
import { solicitarAutorizacao } from '../../../../../services/apiPB';
import axios from 'axios';

export const urlIntegracao = 'api/v1/integrador';
export const origemIntegracao = 'integradores';

export const CARREGA_INTEGRACOES = '[CADASTRO_INTEGRACAO]CARREGAR_INTEGRACOES';
export const SET_CLEAN_INTEGRATION = '[CADASTRO_INTEGRACAO]INTEGRATION_CLEAN';
export const SET_INTEGRATION_SELECTED = '[CADASTRO_INTEGRACAO]INTEGRATION_SET';
export const EDIT_INTEGRATION = '[CADASTRO_INTEGRACAO]EDIT';
export const CLEAN_EDIT_INTEGRATION = '[CADASTRO_INTEGRACAO]EDIT_CLEAN';
export const DELETE_INTEGRACAO = '[CADASTRO_INTEGRACAO] DELETE_INTEGRACAO';
export const SET_DADOS_INTEGRACAO = '[CADASTRO_INTEGRACAO] SET_DADOSINTEGRACAO';
export const SET_INTEGRATION_SAVE_DATA =
  '[CADASTRO_INTEGRACAO] SET_INTEGRATION_SAVE_DATA';
export const SET_INTEGRATION_PRE_SAVE_DATA =
  '[CADASTRO_INTEGRACAO] SET_INTEGRATION_PRE_SAVE_DATA';
export const SET_NUMERO_PARCELAS = '[CADASTRO_INTEGRACAO] SET_NUMERO_PARCELAS';

export const URL_PATH = `api/v1/integrador`;
export const ORIGEM = 'integradores';

export enum tipoIntegracao {
  TRAY = 'Tray',
  MAPS = 'Google Maps',
  MERCADOPAGO = 'Mercado Pago',
  INPERA_FIDELIDADE = 'INPERA Fidelidade',
  IFOOD = 'iFood',
  WHATSAPPCHATIA = 'WhatsApp ChatIA',
  PIXEL = 'Facebook Pixel',
  PAGBANK = 'PagBank',
  IMPORTACAOCSV = 'ImportCSV',
}

export const setNumeroParcelas = (parcela: number) => (dispatch: any) => {
  dispatch({ type: SET_NUMERO_PARCELAS, payload: parcela });
};

export const setDadosIntegracao = (data: any) => (dispatch: any) => {
  dispatch({ type: SET_DADOS_INTEGRACAO, payload: data });
};

export const deleteIntegracao =
  (id: string, history: any) => async (dispatch: any) => {
    try {
      await api.delete(`${URL_PATH}/${id}`);

      if (history) {
        history.push(`/listagem/integracoes`);
      }
      // dispatch();
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

export const setCleanIntegration = () => (dispatch: any) => {
  dispatch({ type: SET_CLEAN_INTEGRATION });
};

export const getAllIntegrationAdmin = () => async (dispatch: any) => {
  const _integracoesParaDesabilitar = ['Mercado Pago'];

  // if (process.env.REACT_APP_ENV! !== 'DEV')
  //   _integracoesParaDesabilitar.push('PagBank');
  try {
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

    const { data } = await api.get(`api/v1/integrador/admin`);

    if (!data) {
      throw new Error('Nenhum integração foi localizada');
    }

    dispatch({
      type: CARREGA_INTEGRACOES,
      payload: data.integracoes.filter(
        (f: any) => !_integracoesParaDesabilitar.includes(f.descricao),
      ),
    });
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

export const postIntegrationMaps =
  (values: any, actions: any, history: any) => async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.post(`${URL_PATH}/maps`, {
        idIntegracaoInpera: values.integracao.id,
        descricao: values.integracao.descricao,
        maps_key: values.key,
      });

      actions.resetForm();
      dispatch(setCleanIntegration());
      history.push('/listagem/integracoes');
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Sucesso ao cadastrar o registro!',
          tipo: TipoMensagem.SUCESSO,
        }),
      );
    } catch (e) {
      actions.setSubmitting(false);
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const postIntegrationTray =
  (values: any, actions: any, history: any) => async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.post(`${URL_PATH}/tray`, {
        idIntegracaoInpera: values.integracao.id,
        descricao: values.integracao.descricao,
        consumerKey: values.key,
        consumerSecret: values.consumerSecret,
        code: values.code,
        url: values.url,
        enviarImagem: values.enviarImagem,
        // storeCode: values.storecode,
      });

      actions.resetForm();
      dispatch(setCleanIntegration());
      history.push('/listagem/integracoes');
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Sucesso ao cadastrar o registro!',
          tipo: TipoMensagem.SUCESSO,
        }),
      );
    } catch (e) {
      actions.setSubmitting(false);
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const postIntegrationWhatsAppChatIA =
  (values: any, actions: any, history: any) => async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.post(`${URL_PATH}/whatsapp`, {
        idIntegracaoInpera: values.integracao.id,
        descricao: values.integracao.descricao,
        url: values.url,
        token: values.token,
      });

      actions.resetForm();
      dispatch(setCleanIntegration());
      history.push('/listagem/integracoes');
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Sucesso ao cadastrar o registro!',
          tipo: TipoMensagem.SUCESSO,
        }),
      );
    } catch (err) {
      // actions.setSubmitting(false);
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(err),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const saveFacebookPixel =
  (values: any, actions: any, history: any) => async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.post(`api/v1/integrador/pixel/save`, {
        idIntegracao: values.idIntegracao,
        pixel: values.pixel,
        dadosAdicionais: values.dadosAdicionais,
        token: values.token,
      });
      actions.resetForm();
      dispatch(setCleanIntegration());
      history.push('/listagem/integracoes');
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Sucesso ao cadastrar o registro!',
          tipo: TipoMensagem.SUCESSO,
        }),
      );
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

export const updateFacebookPixel =
  (values: any, actions: any, history: any) => async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.patch(
        `api/v1/integrador/pixel/patch?id=${values.idIntegracao}`,
        {
          idIntegracao: values.idIntegracao,
          pixel: values.pixel,
          dadosAdicionais: values.dadosAdicionais,
          token: values.token,
        },
      );
      actions.resetForm();
      dispatch(setCleanIntegration());
      history.push('/listagem/integracoes');
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Sucesso ao atualizar o registro!',
          tipo: TipoMensagem.SUCESSO,
        }),
      );
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

export const patchIntegrationWhatsAppChatIA =
  (id: any, values: any, actions: any, history: any) =>
  async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const { data } = await api.patch(`${URL_PATH}/whatsapp/${id}`, {
        idIntegracaoInpera: values.integracao.id,
        url: values.url,
        pixel: values.pixel,
        token: values.token,
      });

      actions.resetForm();
      dispatch(setCleanIntegration());
      if (data) {
        dispatch(
          abrirMensagem({
            open: true,
            mensagem: 'Sucesso ao editar o registro',
            tipo: TipoMensagem.SUCESSO,
          }),
        );
      }
      history.push('/listagem/integracoes');
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

export const criarIntegracaoPagBank =
  (history: any, data: any, setLoading: any) => async (dispatch: any) => {
    setLoading(true);
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const res = await api.post(`${URL_PATH}/pagbank`, {
        code: data.code,
      });

      dispatch(
        setDadosIntegracao({ code: data.code, acess_token: data.token }),
      );

      await api.post('/api/v1/cobrancas', {
        descricao: 'PagBank',
        ordenacao: 0,
        informativa: false,
        aVista: true,
        iconeVenda: null,
        exibirDelivery: true,
        habilitarPix: false,
        chavePix: null,
        descricaoPix: null,
        emiteNF: false,
        formaPagamento: 'Outros',
      });
    } catch (err) {
      setLoading(false);
      history.replace('/listagem/integracoes');
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(err),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
    setLoading(false);
  };

export const refreshTokenGeneration =
  (refresh_token: string) => async (dispatch: any) => {
    try {
      const refreshToken = await api.post(
        // '/api/front/v1/integracoes/pagbank/refreshToken',
        '/api/v1/integrador/pagbank/refreshToken',
        {
          refresh_token,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(editIntegration(refreshToken.data));
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

export const savePagBankToken = (token: string, history: any) => async (dispatch: any) => {
  try {
    const savedToken = await api.patch(
      '/api/v1/integrador/pagbank/updateToken',
      { token },
      { withCredentials: true },
    );
    dispatch(editIntegration(savedToken.data));
    history.push('/listagem/integracoes');
  } catch (err) {
    dispatch(
      abrirMensagem({
        open: true,
        tipo: TipoMensagem.ERRO,
        mensagem: 'Não foi possível atualizar o token'
      })
    )
  }
};

export const accessTokenGeneration =
  (codigoIntegracao: string) => async (dispatch: any) => {
    try {
      const accessToken = await api.post(
        // '/api/front/v1/integracoes/pagbank/generateToken',
        '/api/v1/integrador/pagbank/generateToken',
        { code: codigoIntegracao },
        {
          withCredentials: true,
        },
      );

      dispatch(editIntegration(accessToken.data));
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

export const postIntegrationMercadoPago =
  (values: any, actions: any, history: any, setLoading: any) =>
  async (dispatch: any) => {
    setLoading(true);
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.post(`${URL_PATH}/mercadopago`, {
        idIntegracaoInpera: values.integracao.id,
        descricao: values.integracao.descricao,
        mercadopago_code: values.mercadopago_code,
      });

      await api.post('/api/v1/cobrancas', {
        descricao: 'Pague pelo APP',
        ordenacao: 0,
        informativa: false,
        aVista: true,
        iconeVenda: null,
        exibirDelivery: true,
        habilitarPix: false,
        chavePix: null,
        descricaoPix: null,
        // emiteNF: true,
        emiteNF: false,
        formaPagamento: 'Outros',
      });

      actions.resetForm();
      dispatch(setCleanIntegration());
      history.replace('/listagem/integracoes');
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Sucesso ao cadastrar o registro!',
          tipo: TipoMensagem.SUCESSO,
        }),
      );
    } catch (e) {
      history.replace('/listagem/integracoes');
      actions.setSubmitting(false);
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
    setLoading(false);
  };

export const patchIntegrationMercadoPago =
  (id: any, values: any, actions: any, history: any, setLoading: any) =>
  async (dispatch: any) => {
    setLoading(true);
    try {
      // await dispatch(postMercadoPagoAuthToken(values.mercadopago_code));

      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const { data } = await api.patch(`${URL_PATH}/mercadopago/${id}`, {
        idIntegracaoInpera: values.integracao.id,
        mercadopago_code: values.mercadopago_code,
      });

      actions.resetForm();
      dispatch(setCleanIntegration());
      if (data) {
        dispatch(
          abrirMensagem({
            open: true,
            mensagem: 'Sucesso ao editar o registro.',
            tipo: TipoMensagem.SUCESSO,
          }),
        );
      }
      actions.setSubmitting(false);
      history.replace('/listagem/integracoes');
    } catch (e) {
      history.replace('/listagem/integracoes');
      actions.setSubmitting(false);
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
    setLoading(false);
  };

export const removeIntegrationIfood = (): any => {
  return async (dispatch: any, getState: any) => {
    try {
      await api.post(`/api/v1/integrador/ifood/remove`);
      return Promise.resolve(); // Resolving the Promise
    } catch (err) {
      return Promise.reject(err); // Rejecting the Promise with the error
    }
  };
};

export const postIntegrationIfoodPreSave =
  (
    idIntegracao: string,
    idLoja: string,
    jornada: { id: string; descricao: string },
  ): any =>
  async (dispatch: any, getState: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      // dispatch(selectIntegration(tipoIntegracao.IFOOD, idIntegracao));

      const { data } = await api.post(`/api/v1/integrador/ifood/presave`, {
        idIntegracaoInpera: idIntegracao,
        idLojaIfood: idLoja,
        jornadaTrabalho: jornada,
      });

      return new Promise((resolve) => resolve(data));
    } catch (err) {
      // dispatch(removeIntegrationIfood());
      return new Promise((_, reject) => reject(false));
    }
  };

export const postIntegrationIfoodSave =
  (
    idLoja: string,
    journey: [
      {
        diaFuncionamento: string;
        horarioAberto: string;
        horarioFechado: string;
      },
    ],
    authCodeVerifier: string,
    userCode: string,
    integradorId: string,
  ): any =>
  async (dispatch: any, getState: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const { data } = await api.post(`/api/v1/integrador/ifood/save`, {
        authCode: userCode,
        authCodeVerifier: authCodeVerifier,
        idLojaIfood: idLoja,
        journey: journey,
        idIntegracao: integradorId,
      });

      return new Promise((resolve) => resolve(data));
    } catch (err) {
      // dispatch(removeIntegrationIfood());
    }
  };

export const patchIntegrationFood =
  (
    idLoja: string,
    journey: [
      {
        diaFuncionamento: string;
        horarioAberto: string;
        horarioFechado: string;
      },
    ],
  ): any =>
  async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const { data } = await api.patch(`/api/v1/integrador/ifood/patch`, {
        journey,
        idLojaIfood: idLoja,
      });

      return new Promise((resolve) => resolve(data));
    } catch (err) {
      return new Promise((_, reject) => reject(false));
    }
  };

export const refreshAuthToken = (id: string) => async (dispatch: any) => {
  try {
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
    await api.patch(`${URL_PATH}/mercadopago/refresh/${id}`);
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

export const checkIntegracaoesExpired =
  () => async (dispatch: any, getState: any) => {
    await dispatch(getAllIntegrationAdmin());

    const { data } = await api.get(`${URL_PATH}`);

    const mercado_pago: any = data?.integradores?.rows
      ? data.integradores.rows.find(
          (item: any) => item.I_NOMEINTEGRACAO === tipoIntegracao.MERCADOPAGO,
        )
      : undefined;

    if (mercado_pago) {
      try {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
        const { data } = await api.get(
          `${URL_PATH}/integracao/${mercado_pago.ID_INTEGRACAO}`,
        );
        const expires = new Date(data.expires_in);
        const today = new Date();

        if (today >= expires) {
          await dispatch(refreshAuthToken(mercado_pago.ID_INTEGRACAO));
        }
      } catch (err) {
        dispatch(deleteData(URL_PATH, ORIGEM, mercado_pago.ID_INTEGRADORES));
        return;
      }
    }

    const inpera_fidelidade = data?.integradores?.rows
      ? data.integradores.rows.find(
          (item: any) =>
            item.I_NOMEINTEGRACAO === tipoIntegracao.INPERA_FIDELIDADE,
        )
      : undefined;

    if (inpera_fidelidade) {
      await dispatch(
        verificaIntegracaoInperaFidelidade(inpera_fidelidade.ID_INTEGRADORES),
      );
    }
  };

export const patchIntegrationMaps =
  (id: any, values: any, actions: any, history: any) =>
  async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const { data } = await api.patch(`${URL_PATH}/maps/${id}`, {
        idIntegracaoInpera: values.integracao.id,
        maps_key: values.key,
      });

      actions.resetForm();
      dispatch(setCleanIntegration());
      if (data) {
        dispatch(
          abrirMensagem({
            open: true,
            mensagem: 'Sucesso ao editar o registro.',
            tipo: TipoMensagem.SUCESSO,
          }),
        );
      }
      actions.setSubmitting(false);
      history.push('/listagem/integracoes');
    } catch (e) {
      actions.setSubmitting(false);
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const patchIntegrationTray =
  (id: any, values: any, actions: any, history: any) =>
  async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const { data } = await api.patch(`${URL_PATH}/tray/${id}`, {
        idIntegracaoInpera: values.integracao.id,
        // descricao: values.integracao,
        consumerKey: values.key,
        consumerSecret: values.consumerSecret,
        code: values.code,
        url: values.url,
        enviarImagem: values.enviarImagem,
        // storeCode: values.storecode,
      });

      actions.resetForm();
      dispatch(setCleanIntegration());
      if (data) {
        dispatch(
          abrirMensagem({
            open: true,
            mensagem: 'Sucesso ao editar o registro.',
            tipo: TipoMensagem.SUCESSO,
          }),
        );
      }
      actions.setSubmitting(false);
      history.push('/listagem/integracoes');
    } catch (e) {
      actions.setSubmitting(false);
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const selectIntegration =
  (tipo: tipoIntegracao, id: string) => (dispatch: any) => {
    dispatch({
      type: SET_INTEGRATION_SELECTED,
      payload: { id, descricao: tipo },
    });
  };

export const getMapsKey = (): any => async (dispatch: any, getState: any) => {
  try {
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

    const {
      data: response,
    }: {
      data: {
        integradores: {
          rows: [{ I_NOMEINTEGRACAO: string; ID_INTEGRACAO: string }];
        };
      };
    } = await api.get(`${URL_PATH}`);
    const mapper = new Map();

    if (response.integradores.rows.length > 0) {
      const maps = response.integradores.rows.find(
        (el) => el.I_NOMEINTEGRACAO === 'Google Maps',
      );
      mapper.set('id', maps?.ID_INTEGRACAO);
    }

    if (mapper.has('id')) {
      const id_integracao = mapper.get('id');
      const { data } = await api.get(`${URL_PATH}/integracao/${id_integracao}`);

      return data?.maps_key;
    }

    return undefined;
  } catch (err) {
    return undefined;
  }
};

export const editIntegration = (values: any) => (dispatch: any) => {
  dispatch({ type: EDIT_INTEGRATION, payload: values });
};

export const cleanEditIntegration = () => (dispatch: any) => {
  dispatch({ type: CLEAN_EDIT_INTEGRATION });
};

export const patchInperaFidelidade =
  (integracao: any, cb: () => void, cbCancel: () => void) =>
  async (dispatch: any, getState: any) => {
    cb();
    try {
      const cnpj = getState().global?.empresa?.empresaAll?.cnpjCpf;
      const email =
        cnpj === '00254455000133'
          ? 'tdp@tdp.com.br'
          : getState().global?.empresa?.empresaAll?.email;

      const body = { cnpj, email };

      const result = await apiFidelidade.post('/authorization', body, {
        headers: {
          authorization: `Bearer ${process.env.REACT_APP_TOKEN_BUBBLE}`,
        },
      });

      if (result?.data) {
        const { exists } = result.data;
        if (exists) {
          api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
          const post = await api.patch(
            `api/v1/integrador/inperaFidelidade/${integracao.ID_INTEGRADORES}`,
            {
              cnpjCpf: body.cnpj,
              email: body.email,
              date_activated: moment().format('yyyy-MM-DD HH:mm:ss'),
              exists: true,
            },
          );
          dispatch(setCleanIntegration());

          if (post?.data) {
            const { descricao, idIntegracao, id } = post.data.integracao;
            dispatch(
              setData({
                checked: false,
                disabled: false,
                I_NOMEINTEGRACAO: descricao,
                ID_INTEGRADORES: id,
                ID_INTEGRACAO: idIntegracao,
              }),
            );

            dispatch(
              abrirMensagem({
                open: true,
                mensagem: 'Sucesso ao atualizar integração.',
                tipo: TipoMensagem.SUCESSO,
              }),
            );
          }
        } else {
          dispatch(setCleanIntegration());

          dispatch(removeData('ID_INTEGRADORES', integracao.ID_INTEGRADORES));
          dispatch(
            deleteData(
              URL_PATH,
              ORIGEM,
              integracao.ID_INTEGRADORES,
              ETypePagination.CADASTROS,
              undefined,
              false,
            ),
          );

          dispatch(
            abrirMensagem({
              open: true,
              mensagem:
                'Não foi localizado o ambiente do INPERA Fidelidade com o mesmo e-mail e CNPJ/CPF utilizado nesse ambiente do INPERA, verifique por favor.',
              tipo: TipoMensagem.INFO,
            }),
          );
        }
      }
      cbCancel();
    } catch (e) {
      cbCancel();
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const postInperaFidelidade =
  (cb: () => void, cbCancel: () => void) =>
  async (dispatch: any, getState: any) => {
    cb();
    try {
      const cnpj = getState().global?.empresa?.empresaAll?.cnpjCpf;
      const email =
        cnpj === '00254455000133'
          ? 'tdp@tdp.com.br'
          : getState().global?.empresa?.empresaAll?.email;
      const body = { cnpj, email };

      const result = await apiFidelidade.post('/authorization', body, {
        headers: {
          authorization: `Bearer ${process.env.REACT_APP_TOKEN_BUBBLE}`,
        },
      });

      if (result?.data) {
        const { exists } = result.data;
        if (exists) {
          api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
          const post = await api.post('api/v1/integrador/inperaFidelidade', {
            cnpjCpf: body.cnpj,
            email: body.email,
            date_activated: moment().format('yyyy-MM-DD HH:mm:ss'),
            exists: true,
          });
          dispatch(setCleanIntegration());

          if (post?.data) {
            const { descricao, idIntegracao, id } = post.data.integracao;
            dispatch(
              setData({
                checked: false,
                disabled: false,
                I_NOMEINTEGRACAO: descricao,
                ID_INTEGRADORES: id,
                ID_INTEGRACAO: idIntegracao,
              }),
            );

            dispatch(
              abrirMensagem({
                open: true,
                mensagem: 'Sucesso ao incluir a integração.',
                tipo: TipoMensagem.SUCESSO,
              }),
            );
          }
        } else {
          dispatch(setCleanIntegration());
          dispatch(
            abrirMensagem({
              open: true,
              mensagem:
                'Não será possível ativar a integração, pois NÃO foi localizado o ambiente do INPERA Fidelidade com seus dados, verifique por favor.',
              tipo: TipoMensagem.INFO,
            }),
          );
        }
      }
      cbCancel();
    } catch (e) {
      cbCancel();
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const verificaIntegracaoInperaFidelidade =
  (id: string) => async (dispatch: any, getState: any) => {
    try {
      const cnpj = getState().global?.empresa?.empresaAll?.cnpjCpf;
      const email =
        cnpj === '00254455000133'
          ? 'tdp@tdp.com.br'
          : getState().global?.empresa?.empresaAll?.email;
      const body = { cnpj, email };

      const result = await apiFidelidade.post('/authorization', body, {
        headers: {
          authorization: `Bearer ${process.env.REACT_APP_TOKEN_BUBBLE}`,
        },
      });
      if (result?.data) {
        const { exists } = result.data;
        if (exists) {
          api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
          await api.post('api/v1/integrador/inperaFidelidade', {
            cnpjCpf: body.cnpj,
            email: body.email,
            date_activated: moment().format('yyyy-MM-DD HH:mm:ss'),
            exists: true,
          });
        } else {
          dispatch(
            deleteData(
              URL_PATH,
              ORIGEM,
              id,
              ETypePagination.CADASTROS,
              undefined,
              false,
            ),
          );
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

export const autorizacaoPagBank = () => {
  try {
    // return solicitarAutorizacao();
  } catch (err) {
    throw err;
  }
};
