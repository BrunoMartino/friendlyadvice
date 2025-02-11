import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { getTokenDashboard } from '../../../../../utils/fn';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { setLoadingDashboard } from '../../Dashboard/action';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const CARREGA_CONFIGURACOES_EMPRESA = '[CONFIGURACOES_EMPRESA] CARREGAR';
export const LIMPA_CONFIGURACOES_EMPRESA = '[CONFIGURACOES_EMPRESA] LIMPAR';
export const CARREGAR_CLIENTES = '[CONFIGURACOES_EMPRESA] CARREGAR_CLIENTES';
export const ADD_CLIENTE = '[CONFIGURACOES_EMPRESA] ADD_CLIENTE';
export const LOADING_CONFIGURACOES_EMPRESA =
  '[CONFIGURACOES_EMPRESA] LOADING_CONFIGURACOES_EMPRESA';

export const configuracoesEmpresa = 'api/v1/configuracoesEmpresa';

export const carregarClientes = () => async (dispatch: any) => {
  try {
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
    const { data } = await api.get(`api/v1/clientes`);

    const clientes = data.clientes.rows.map((cliente: any) => {
      const result = { ...cliente, descricao: cliente.razao };
      delete result.razao;
      return { ...result };
    });

    dispatch({ type: CARREGAR_CLIENTES, payload: clientes });
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

export const salvarClienteConfig =
  (descricao: string, fn: any = null) =>
  async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const result = await api.post('api/v1/clientes', { razao: descricao });

      const cliente = { ...result.data.cliente, descricao };
      delete cliente.razao;

      if (fn) {
        fn.setFieldValue('cliente', {
          id: cliente.id,
          descricao: cliente.descricao,
          inputValue: '',
        });
        fn.setOpenCadastro(false);
      }

      dispatch({ type: ADD_CLIENTE, payload: cliente });
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

  export const salvarRepresentanteConfig =
  (descricao: string, fn: any = null): any =>
  async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const result = await api.post('api/v1/representantes', { nome: descricao });

      const representante = { ...result.data.representante, descricao };
      delete representante.nome;

      if (fn) {
        fn.setFieldValue('representante', {
          id: representante.id,
          descricao: representante.descricao,
          inputValue: '',
        });
        fn.setOpenRepresentantes(false);
      }

      dispatch({ type: ADD_CLIENTE, payload: representante });
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

export const getAllConfig =
  (empresa: any, history: any): any =>
  async (dispatch: any) => {
    try {
      dispatch(setLoadingDashboard(true));
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const { data } = await api.get(`${configuracoesEmpresa}`);

      dispatch({
        type: CARREGA_CONFIGURACOES_EMPRESA,
        payload: {
          configuracoes: data.configuracoesEmpresa,
          empresa: empresa,
        },
      });

      dispatch(setLoadingDashboard(false));

      return data.configuracoesEmpresa;
    } catch (e) {
      dispatch(setLoadingDashboard(false));
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const pathConfig =
  (values: any, actions: any) => async (dispatch: any, getState: any) => {
    dispatch(setLoadingConfiguracoesEmpresa(true));
    try {
      const { id, integracaoFacilite } =
        getState().global.empresaAdmin.integracaoFacilite;

      const {
        precoDiferenciado,
        finalizarSemCadastro,
        clientePadrao,
        habilitaProdutoFiscal,
      } = values;

      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const { data } = await api.patch(`${configuracoesEmpresa}`, {
        precoDiferenciado,
        finalizarSemCadastro: finalizarSemCadastro || false,
        clientePadrao:
          clientePadrao && clientePadrao.id && clientePadrao.id.length > 0
            ? clientePadrao.id
            : null,
        habilitaProdutoFiscal: habilitaProdutoFiscal || false,
      });

      dispatch({
        type: CARREGA_CONFIGURACOES_EMPRESA,
        payload: {
          configuracoes: data.configuracoesEmpresa,
          empresa: { id, integracaoFacilite },
        },
      });

      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Sucesso ao alterar o registro.',
          tipo: TipoMensagem.SUCESSO,
        }),
      );
      dispatch(setLoadingConfiguracoesEmpresa(false));

      actions.setSubmitting(false);
    } catch (e) {
      actions.setSubmitting(false);
      dispatch(setLoadingConfiguracoesEmpresa(false));
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const patchConfigByCompany =
  (data: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch(setLoadingConfiguracoesEmpresa(true));
      const { id, integracaoFacilite } =
        getState().global.empresaAdmin.integracaoFacilite;
      const { finalizarSemCadastro, clientePadrao, habilitaProdutoFiscal } =
        getState().global.configuracoesEmpresa.configuracoes;

      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.patch(`${configuracoesEmpresa}`, {
        precoDiferenciado: false,
        finalizarSemCadastro: finalizarSemCadastro
          ? finalizarSemCadastro
          : false,
        clientePadrao: clientePadrao ? clientePadrao : null,
        habilitaProdutoFiscal: habilitaProdutoFiscal || false,
      });

      dispatch({
        type: CARREGA_CONFIGURACOES_EMPRESA,
        payload: {
          configuracoes: {
            precoDiferenciado: false,
            finalizarSemCadastro: finalizarSemCadastro
              ? finalizarSemCadastro
              : false,
            clientePadrao: clientePadrao ? clientePadrao : null,
            habilitaProdutoFiscal: habilitaProdutoFiscal
              ? habilitaProdutoFiscal
              : false,
          },
          empresa: {
            id: id ? id : data.id,
            integracaoFacilite: integracaoFacilite
              ? integracaoFacilite
              : data.integracaoFacilite,
          },
        },
      });
      dispatch(setLoadingConfiguracoesEmpresa(false));
    } catch (error) {
      dispatch(setLoadingConfiguracoesEmpresa(false));
      console.error(error);
      //  dispatch(
      //    abrirMensagem({
      //      open: true,
      //      mensagem:
      //        'Erro ao tentar desabilitar "Preco Diferenciado" no cadastro de configuração da empresa, verifique por favor.',
      //      tipo: TipoMensagem.ERRO,
      //    }),
      //  );
    }
  };

export const loadingConfigEmpresa =
  () => async (dispatch: any, getState: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const { id, integracaoFacilite } =
        getState().global.empresaAdmin.integracaoFacilite;
      const getConfigEmpresa = await api.get(`${configuracoesEmpresa}`);
      dispatch({
        type: CARREGA_CONFIGURACOES_EMPRESA,
        payload: {
          configuracoes: getConfigEmpresa.data.configuracoesEmpresa,
          empresa: {
            id: id,
            integracaoFacilite: integracaoFacilite,
          },
        },
      });
    } catch (err) {}
  };

export const setLoadingConfiguracoesEmpresa =
  (loading: boolean) => (dispatch: any) => {
    dispatch({ type: LOADING_CONFIGURACOES_EMPRESA, payload: loading });
  };
export const limparConfiguracoesEmpresa = () => (dispatch: any) => {
  dispatch({ type: LIMPA_CONFIGURACOES_EMPRESA });
};
