import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { TOTAL_ITENS_PAGINA } from '../../../../../utils/consts';
import { getTokenDashboard } from '../../../../../utils/fn';
import { removerMascara } from '../../../../../utils/mascaras';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const ADDRESS_OF_CLIENT_SELECTED =
  '[CADASTRO_CLIENTE_ENDERECOS]CARREGAR_CLIENTE';
export const LOADING_ALL_ADDRESS = '[CADASTRO_CLIENTE_ENDERECOS]CARREGAR';
export const SAVE_NEW_ADDRESS_OF_CLIENT = '[CADASTRO_CLIENTE_ENDERECOS]GRAVAR';
export const ADD_ADDRESS = '[CADASTRO_CLIENTE_ENDERECOS]ADICIONAR_LISTA';
export const ADD_NEW_ADDRESS_AT_LIST = '[CADASTRO_CLIENTE_ENDERECOS]ADICIONAR';
export const SET_LOADING_ADDRESS_SELECTED =
  '[CADASTRO_CLIENTE_ENDERECOS]EDITAR';
export const SET_REMOVE_ADDRESS = '[CADASTRO_CLIENTE_ENDERECOS]REMOVER';

export const SET_DATA_CLIENTE_ENDERECOS =
  '[CADASTRO_CLIENTE_ENDERECOS]SET_DATA';
export const SET_PAGINA_ATUAL_CLIENTE_ENDERECOS =
  '[CADASTRO_CLIENTE_ENDERECOS]SET_PAGINA_ATUAL';
export const SET_CLEAN_ADDRESS = '[CADASTRO_CLIENTE_ENDERECOS]LIMPAR';

export const UPDATE_ADDRESS_AT_LIST = '[CADASTRO_CLIENTE_ENDERECOS]ALTERAR';
export const SET_CLEAN_ADDRESS_SELECTED =
  '[CADASTRO_CLIENTE_ENDERECOS]LIMPAR_ENDERECOS';
export const SET_CLEAN_DATA_ADDRESS = '[CADASTRO_CLIENTE_ENDERECOS]LIMPAR_DATA';

export const loadingClientAllAddress =
  (setLoading:  React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: any, getState: any) => {
    const idClient = getState().session.cadastroClienteEnderecos.clienteSelecionado.id;
    try {
      if (idClient) {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
        const { data } = await api.get(`api/v1/clientesenderecos/${idClient}`);

        dispatch({
          type: LOADING_ALL_ADDRESS,
          payload: data.clientesEnderecos.rows.filter(
            (ce: any) => ce.enderecoPrincipal === false,
          ),
        });

        dispatch(setDataClienteEnderecos(1));
        setLoading(false)
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

export const allAddressByClient = (obj: any) => async (dispatch: any) => {
  dispatch({ type: ADDRESS_OF_CLIENT_SELECTED, payload: obj });
};

export const setAddressSelected = (obj: any) => async (dispatch: any) => {
  dispatch({ type: SET_LOADING_ADDRESS_SELECTED, payload: obj });
};

export const saveNewAddressOfClient =
  (values: any, actions: any, setInitialValues: any) =>
  async (dispatch: any, getState: any) => {
    const idClient = getState().session.cadastroClienteEnderecos.clienteSelecionado;
    try {
      if (idClient && idClient.id && idClient.id !== '') {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
        const { data } = await api.post(`api/v1/enderecos`, {
          cidade: values.cidade,
          logradouro: values.logradouro,
          bairro: values.bairro,
          complemento: values.complemento || null,
          numero: values.numero,
          cep: removerMascara(values.cep),
        });

        dispatch({ type: SAVE_NEW_ADDRESS_OF_CLIENT, payload: data.endereco });
        dispatch({
          type: ADD_ADDRESS,
          payload: {
            id: values.id,
            idEndereco: data.endereco.id,
            cidade: values.cidadeDescricao,
            idCidade: data.endereco.cidade,
            logradouro: data.endereco.logradouro,
            numero: data.endereco.numero,
            sigla: values.estado,
            bairro: data.endereco.bairro,
            complemento: data.endereco.complemento || null,
            cep: data.endereco.cep,
          },
        });

        dispatch(
          setDataClienteEnderecos(getState().session.cadastroClienteEnderecos.pagina),
        );
        dispatch(
          abrirMensagem({
            open: true,
            mensagem: 'Endereço cadastrado com sucesso.',
            tipo: TipoMensagem.SUCESSO,
          }),
        );

        setTimeout(() => {
          dispatch(saveNewAddressAndNewClient(idClient));
        }, 80);

        setTimeout(() => {
          dispatch(setCleanAddressSelected());
        }, 100);
      }
    } catch (e) {
      actions.setSubmitting(false);
      setInitialValues({
        id: values.id,
        cep: values.cep,
        logradouro: values.logradouro,
        numero: values.numero,
        estado: values.estado,
        cidade: values.cidade,
        bairro: values.bairro,
        complemento: values.complemento,
        cidadeDescricao: values.cidadeDescricao,
      });
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const updateAddress =
  (values: any, actions: any, setInitialValues: any) =>
  async (dispatch: any, getState: any) => {
    try {
      const address =
        getState().session.cadastroClienteEnderecos.enderecoSelecionado.idEndereco;
      if (address.length > 0) {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

        const { data } = await api.put(`api/v1/enderecos/${address}`, {
          cidade: values.cidade,
          logradouro: values.logradouro,
          bairro: values.bairro,
          complemento: values.complemento || null,
          numero: values.numero,
          cep: removerMascara(values.cep),
        });
        dispatch({
          type: UPDATE_ADDRESS_AT_LIST,
          payload: {
            id: values.id,
            idEndereco: data.endereco.id,
            cidade: values.cidadeDescricao,
            idCidade: data.endereco.cidade,
            logradouro: data.endereco.logradouro,
            numero: data.endereco.numero,
            sigla: values.estado,
            bairro: data.endereco.bairro,
            complemento: data.endereco.complemento || null,
            cep: data.endereco.cep,
          },
        });

        dispatch(
          setDataClienteEnderecos(getState().session.cadastroClienteEnderecos.pagina),
        );
        dispatch(
          abrirMensagem({
            open: true,
            mensagem: 'Endereço alterado com sucesso.',
            tipo: TipoMensagem.SUCESSO,
          }),
        );
      }
      dispatch(setCleanAddressSelected());
    } catch (e) {
      actions.setSubmitting(false);
      setInitialValues({
        id: values.id,
        cep: values.cep,
        logradouro: values.logradouro,
        numero: values.numero,
        estado: values.estado,
        cidade: values.cidade,
        bairro: values.bairro,
        complemento: values.complemento,
        cidadeDescricao: values.cidadeDescricao,
      });
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const saveNewAddressAndNewClient =
  (idClient?: any) => async (dispatch: any, getState: any) => {
    const client = getState().session.cadastroClienteEnderecos.clienteSelecionado;
    const address = getState().session.cadastroClienteEnderecos.novoEndereco;
    try {
      if (client && client.id !== '' && address && address.id !== '') {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

        await api.post(`api/v1/clientesenderecos/`, {
          idCliente: client.id || idClient.id,
          idEndereco: address && address.id,
          enderecoPrincipal: false,
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

export const removeAddress =
  (idAddress: any) => async (dispatch: any, getState: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.delete(`api/v1/enderecos/${idAddress.idEndereco}`);

      dispatch({ type: SET_REMOVE_ADDRESS, payload: idAddress.idEndereco });

      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Sucesso ao remover o endereço.',
          tipo: TipoMensagem.SUCESSO,
        }),
      );
      dispatch(
        setDataClienteEnderecos(getState().session.cadastroClienteEnderecos.pagina),
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

export const removeAddressOfClient = (id: string) => async (dispatch: any) => {
  try {
    await api.delete(`api/v1/clientesenderecos/${id}`, {
      headers: {
        authorization: `Bearer ${getTokenDashboard()}`,
      },
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

//PAGINACAO
const ordenar = (a: any, b: any) => {
  if (a.descricao > b.descricao) return 1;
  if (a.descricao < b.descricao) return -1;
  return 0;
};

export const setPaginaAtualClienteEnderecos = (pagina: number) => ({
  type: SET_PAGINA_ATUAL_CLIENTE_ENDERECOS,
  payload: pagina,
});

export const setDataClienteEnderecos =
  (pagina: number) => (dispatch: any, getState: any) => {
    const dados = Object.values(
      getState().session.cadastroClienteEnderecos.enderecosByCli,
    );
    const exibeDados: any = dados
      .slice(
        (pagina - 1) * TOTAL_ITENS_PAGINA,
        (pagina - 1) * TOTAL_ITENS_PAGINA + TOTAL_ITENS_PAGINA,
      )
      .sort(ordenar);
    dispatch(setPaginaAtualClienteEnderecos(pagina));
    dispatch({ type: SET_DATA_CLIENTE_ENDERECOS, payload: exibeDados });
  };

//LIMPAR
export const setCleanAddress = () => (dispatch: any) => {
  dispatch({ type: SET_CLEAN_ADDRESS });
};
export const setCleanAddressSelected = () => (dispatch: any) => {
  dispatch({ type: SET_CLEAN_ADDRESS_SELECTED });
};
export const setCleanDataAddress = () => (dispatch: any) => {
  dispatch({ type: SET_CLEAN_DATA_ADDRESS });
};
