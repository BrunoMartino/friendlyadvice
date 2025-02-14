import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { getTokenDashboard } from '../../../../../utils/fn';
import { removerMascara } from '../../../../../utils/mascaras';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { setDataPaginacao } from '../../../Components/Paginacao/action';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const urlClientes = 'api/v1/clientes';
export const urlConfigFaciliteSmart = 'api/v1/conffacilitesmart';
export const origemClientes = 'clientes';
export const origemConfFaciliteSmart = 'configFaciliteSmart';

export const urlEndPrincipal = 'api/v1/enderecos';
export const urlEndByCli = 'api/v1/clientesenderecos';
export const origemEndPrincipal = 'enderecos';

export const LOADING_ADDRESS_BY_CLIENT = '[CADASTRO_CLIENTE]CARREGA_ENDERECO';

export const SET_ALL_CONFIG_SMART = '[LISTAGEM_FACILITE_SMART]CARREGA_CONFIG_SMART';

export const SHOW_CLIENT_SELECTED = '[CADASTRO_CLIENTE]CLIENT_SELECTED';
export const SET_CLIENT_ADDRESS = '[CADASTRO_CLIENTE]CLIENTES_ENDERECOS';
export const NEW_ADDRESS = '[CADASTRO_CLIENTE]GRAVAR_ENDERECO';
export const UPDATE_ADDRESS = '[CADASTRO_CLIENTE]ALTERAR_ENDERECO';
export const NEW_CLIENT = '[CADASTRO_CLIENTE]GRAVAR_CLIENTE';
export const SET_ALL_CLIENTS = '[CADASTRO_CLIENTE]TODOS_OS_CLIENTES';
export const SET_LOANDING_CLIENTS = '[CADASTRO_CLIENTE]CARREGA';

export const SET_CLEAN = '[CADASTRO_CLIENTE]LIMPAR';

export const loadingClients = (paginaAtual: any) => (dispatch: any) => {
  try {
    dispatch(
      setDataPaginacao(`${urlClientes}`, paginaAtual - 1, `${origemClientes}`),
    );
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

export const saveNewClient =
  (values: any, actions: any, setInitialValues: any, setAguarde: any) =>
  async (dispatch: any) => {
    let saveEndCli = false;
    try {
      setAguarde(true);
      if (values) {
        if (saveEndCli === false) {
          api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

          const { data } = await api.post(`${urlClientes}`, {
            numero: values.codigo || null,
            razao: values.razao,
            email: values.email || null,
            documento: removerMascara(values.documento) || undefined,
            fantasia: values.fantasia || null,
            telefone: removerMascara(values.telefone) || undefined,
          });

          dispatch({ type: NEW_CLIENT, payload: data.cliente });

          if (
            values.cep &&
            values.cep !== '' &&
            values.logradouro &&
            values.logradouro !== '' &&
            values.cidadeDescricao &&
            values.cidadeDescricao !== '' &&
            values.estado &&
            values.estado !== ''
          ) {
            saveEndCli = true;
          }

          if (saveEndCli === false) {
            dispatch(
              abrirMensagem({
                open: true,
                mensagem: `Cliente cadastrado com sucesso!`,
                tipo: TipoMensagem.SUCESSO,
              }),
            );
          }
        }

        if (saveEndCli === true) {
          await dispatch(saveAddressByClient(values));

          dispatch(
            abrirMensagem({
              open: true,
              mensagem: `Cliente e endereço cadastrado com sucesso!`,
              tipo: TipoMensagem.SUCESSO,
            }),
          );
        }
      }
      setAguarde(false);
      actions.resetForm();
    } catch (e) {
      actions.setSubmitting(false);
      setAguarde(false);

      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const updateClient =
  (
    values: any,
    actions: any,
    idClient: any,
    history: any,
    setInitialValues: any,
    setAguardar: any,
  ) =>
  async (dispatch: any, getState: any) => {
    const idAddress = getState().session.cadastroClientes.enderecoPrincipal;

    try {
      setAguardar(true);
      if (values) {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

        const {data} = await api.patch(`${urlClientes}/${idClient}`, {
          numero: values.codigo || null,
          razao: values.razao,
          email: values.email || null,
          documento: removerMascara(values.documento) || null,
          fantasia: values.fantasia || null,
          telefone: removerMascara(values.telefone) || undefined,
        });

        dispatch({ type: NEW_CLIENT, payload: data.cliente });

        if (
          Object.entries(idAddress).length <= 0 &&
          values.cep &&
          values.cep !== '' &&
          values.logradouro &&
          values.logradouro !== '' &&
          values.cidadeDescricao &&
          values.cidadeDescricao !== '' &&
          values.estado &&
          values.estado !== '' &&
          values.bairro &&
          values.bairro !== '' &&
          values.numero &&
          values.numero !== ''
        ) {
          dispatch(saveAddressByClient(values, idClient));
          dispatch(
            abrirMensagem({
              open: true,
              mensagem: `Cliente alterado com sucesso!`,
              tipo: TipoMensagem.SUCESSO,
            }),
          );
        } else if (
          Object.entries(idAddress).length > 0 &&
          values.cep === '' &&
          values.cidadeDescricao === '' &&
          values.estado === ''
        ) {
          dispatch(
            updateAddressByClient(
              values,
              idAddress[0] && idAddress[0].idEndereco,
              idClient,
            ),
          );

          dispatch(
            abrirMensagem({
              open: true,
              mensagem: `Cliente alterado com sucesso!`,
              tipo: TipoMensagem.SUCESSO,
            }),
          );
        } else if (
          Object.entries(idAddress).length > 0 &&
          values.cep &&
          values.cep !== '' &&
          values.logradouro &&
          values.logradouro !== '' &&
          values.cidadeDescricao &&
          values.cidadeDescricao !== '' &&
          values.estado &&
          values.estado !== '' &&
          values.bairro &&
          values.bairro !== '' &&
          values.numero &&
          values.numero !== ''
        ) {
          dispatch(
            updateAddressByClient(
              values,
              idAddress[0] && idAddress[0].idEndereco,
              idClient,
            ),
          );

          dispatch(
            abrirMensagem({
              open: true,
              mensagem: `Cliente alterado com sucesso!`,
              tipo: TipoMensagem.SUCESSO,
            }),
          );
        } else {
          dispatch(
            abrirMensagem({
              open: true,
              mensagem: `Cliente alterado com sucesso!`,
              tipo: TipoMensagem.SUCESSO,
            }),
          );
        }
      }
      setAguardar(true);
      actions.resetForm();
      history !== null && history.push('/listagem/clientes');
      setTimeout(() => {
        dispatch(setCleanCliente());
      }, 300);
    } catch (e) {
      setAguardar(true);
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

export const clientSelected = (obj: any) => (dispatch: any) => {
  dispatch({ type: SHOW_CLIENT_SELECTED, payload: obj })
}

//ENDEREÇOS

export const saveAddressByClient =
  (values: any, idCliente?: any) => async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      if (
        values.cep &&
        values.cep !== '' &&
        values.logradouro &&
        values.logradouro !== '' &&
        values.cidade &&
        values.cidade !== '' &&
        values.estado &&
        values.estado !== '' &&
        values.bairro &&
        values.bairro !== '' &&
        values.numero &&
        values.numero !== ''
      ) {
        const { data } = await api.post(`${urlEndPrincipal}`, {
          cidade: values.cidade,
          logradouro: values.logradouro,
          bairro: values.bairro,
          complemento: values.complemento || null,
          numero: values.numero,
          cep: removerMascara(values.cep),
        });
        if (data && Object.keys(data).length > 0) {
          await dispatch({ type: NEW_ADDRESS, payload: data.endereco });
          await dispatch(saveNewClientAndNewAddress(idCliente));
        }
      }
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

export const updateAddressByClient =
  (values: any, idAddress: string, idClient: string) =>
  async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      if (values && values.cep && values.cep !== '') {
        const { data } = await api.put(`${urlEndPrincipal}/${idAddress}`, {
          cidade: values.cidade,
          logradouro: values.logradouro,
          bairro: values.bairro,
          complemento: values.complemento || null,
          numero: values.numero,
          cep: removerMascara(values.cep),
        });

        if (data && Object.keys(data).length > 0) {
          await dispatch({ type: NEW_ADDRESS, payload: data.endereco });
        }
      } else {
        if (idClient && idClient !== '') {
          const { data } = await api.get(`${urlEndByCli}/${idClient}`);

          if (
            data &&
            data.clientesEnderecos &&
            data.clientesEnderecos.rows &&
            data.clientesEnderecos.rows.length > 0
          ) {
            const findAdressClient = data.clientesEnderecos.rows.find(
              (ec: any) => ec.idEndereco === idAddress,
            );

            if (
              findAdressClient &&
              Object.keys(findAdressClient).length > 0 &&
              findAdressClient.id &&
              findAdressClient.id !== ''
            ) {
              await api.delete(
                `${urlEndPrincipal}/${findAdressClient.idEndereco}`,
              );
            }
          }
        }
      }
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

export const loandingAddressByClient =
  (idClient: any, history?: any) => async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const { data } = await api.get(`${urlEndByCli}/${idClient}`);

      if (
        data &&
        data.clientesEnderecos &&
        data.clientesEnderecos.rows &&
        data.clientesEnderecos.rows.length > 0
      ) {
        dispatch({
          type: LOADING_ADDRESS_BY_CLIENT,
          payload: data.clientesEnderecos.rows.filter(
            (ce: any) => ce.enderecoPrincipal === true,
          ),
        });
      }
      history && history.push('/cadastros/clientes');
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

export const saveNewClientAndNewAddress =
  (idClient?: any, idEndereco?: any) =>
  async (dispatch: any, getState: any) => {
    const cliente = getState().session.cadastroClientes.novoCliente;
    const endereco = getState().session.cadastroClientes.novoEndereco;
    try {
      if (
        (cliente && cliente.id !== '' && endereco && endereco.id !== '') ||
        (idClient !== '' && idEndereco !== '')
      ) {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

        await api.post(`${urlEndByCli}`, {
          idCliente: (cliente && cliente.id) || idClient,
          idEndereco: (endereco && endereco.id) || idEndereco,
          enderecoPrincipal: true,
          origem: 'INPERA',
        });
      }
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

export const setLoadingClientes = (value: boolean) => (dispatch: any) => {
  dispatch({ type: SET_LOANDING_CLIENTS, payload: value });
};
//limpar
export const setCleanCliente = () => (dispatch: any) => {
  dispatch({ type: SET_CLEAN });
};
