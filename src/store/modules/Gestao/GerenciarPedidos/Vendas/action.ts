import api from '../../../../../services/api';
import tzOffset from 'tz-offset';
import {
  dataLocal,
  getTokenDashboard,
  Origem,
  Status,
} from '../../../../../utils/fn';
import { abrirMensagem } from '../../../Components/SnackBar/action';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { TipoMensagem } from '../../../../../components/SnackBar/interface';

export const LOAD_VENDAS = '[Vendas] LOAD_VENDAS';
export const LOAD_STATUS = '[Vendas] LOAD_STATUS';
export const LOAD_DETALHES = '[Vendas] LOAD_DETALHES';
export const SET_STATUS = '[Vendas] SET_STATUS';
export const SET_ORIGEM = '[Vendas] SET_ORIGEM';
export const RESET_ALL_FILTERS = '[Vendas] RESET_ALL_FILTERS';
export const CHANGE_STATUS = '[Vendas] CHANGE_STATUS';
export const INSERT_PAYMENT_ESTOUAQUI = '[Vendas] INSERT_PAYMENT_ESTOUAQUI';
export const CHANGE_DATAINICIAL = '[Vendas] CHANGE_DATAINICIAL';
export const CHANGE_DATAFINAL = '[Vendas] CHANGE_DATAFINAL';
export const NUMERO_VENDA = '[Vendas] NUMERO_VENDA';
export const ADD_VENDA = '[Vendas] ADD_VENDA';
export const CHANGE_PAGE = '[Vendas] CHANGE_PAGE';
export const SET_QTDE_VENDAS_EM_ABERTO = '[Vendas] SET_QTDE_VENDAS_EM_ABERTO';
export const SET_LOADING_VENDAS = '[Vendas] SET_LOADING_VENDAS';
export const SET_LOADING_STATUS = '[Vendas] SET_LOADING_STATUS';
export const REFRESH_VENDAS_FISCAL = '[Vendas] REFRESH_VENDAS_FISCAL';
export const OPEN_MODAL_NFC = '[Vendas] OPEN_MODAL_NFC';

export const setQtdeVendasEmAberto =
  () => async (dispatch: any, getState: any) => {
    try {
      const tz = tzOffset.offsetOf(getState().global.empresaAdmin.local);

      if (!tz) {
        throw new Error('Parâmetro de timezone não encontrado');
      }

      const vendasEmAberto = await api.post(
        `api/front/v1/vendas/detalhes`,
        {
          dataInicial: dataLocal(tz),
          dataFinal: dataLocal(tz),
          status: Status.ABERTO,
        },
        {
          headers: {
            authorization: `bearer ${getTokenDashboard()}`,
          },
        },
      );

      dispatch({
        type: SET_QTDE_VENDAS_EM_ABERTO,
        payload: vendasEmAberto.data.vendas.length,
      });
    } catch (error) {
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(error),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const addVenda =
  (idVenda: number, status?: string, clienteDocumentoVenda?: string): any =>
  async (dispatch: any, getState: any) => {
    try {
      setTimeout(async () => {
        const novaVenda = await api.get(`/api/front/v1/vendas/${idVenda}`, {
          withCredentials: true,
        });
        await dispatch({
          type: ADD_VENDA,
          payload: {
            ...novaVenda.data.venda,
            aviso: status && status === Status.A_PAGAR ? false : true,
            cliente: { ...novaVenda.data.venda.cliente, clienteDocumentoVenda },
            // existIntegrationActivated: existIntegrationActivated,
            // vendaAtualId: vendaAtualId
          },
        });
      }, 5000);

      // const vendaAtualId = novaVenda.data.venda.id;

      // console.log(vendaAtualId, 'vendaAtualId')

      // const existIntegrationActivated =
      //   getState().global.empresa.empresaAll.integracaoFacilite;
      // if (status !== Status.A_PAGAR) {
      //   dispatch(setQtdeVendasEmAberto());
      // }

      // console.log(existIntegrationActivated, 'existIntegrationActivated');

      // return novaVenda;
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

export const changeDataInicial =
  (value: any, status: any) => async (dispatch: any, getState: any) => {
    try {
      const tz = getState().global.empresaAdmin.local;
      await dispatch({ type: CHANGE_DATAINICIAL, payload: value });
      await dispatch(
        loadVendas(
          {
            dataInicial: await dataLocal(tz, value),
            dataFinal: await getState().global.controleVendas.dataFinal,
          },
          await status,
        ),
      );
    } catch(e) {
      throw e;
    }
  };

export const changeDataFinal =
  (value: any, status: any) => async (dispatch: any, getState: any) => {
    try {
      const tz = getState().global.empresaAdmin.local;
      await dispatch({ type: CHANGE_DATAFINAL, payload: value });
      await dispatch(
        loadVendas(
          {
            dataInicial: await getState().global.controleVendas.dataInicial,
            dataFinal: await dataLocal(tz, value),
          },
          await status,
        ),
      );
    } catch(e) {
      throw e;
    }
  };

export const setStatus = (status: string) => {
  return { type: SET_STATUS, payload: status };
};

export const setOrigem = (origem: Origem) => {
  return { type: SET_ORIGEM, payload: origem };
};

export const resetAllFilters = () => {
  return { type: RESET_ALL_FILTERS };
};

export const setNumeroVenda = (status: string, idVenda: any) => {
  return {
    type: NUMERO_VENDA,
    payload: {
      numero: status,
      idVenda,
    },
  };
};

export const loadStatus =
  (filtros: { dataInicial: Date; dataFinal: Date; origem: string }) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch(setLoadingVendas(true));
      const tz = tzOffset.offsetOf(getState().global.empresaAdmin.local);
      const statusVendas: any = await api.post(
        `api/front/v1/vendas/getAllStatus`,
        {
          dataInicial:
            (dataLocal(tz, filtros.dataInicial)).toLocaleDateString() ==
            'Invalid Date'
              ? new Date(filtros.dataInicial)
              : dataLocal(tz, filtros.dataInicial),
          dataFinal:
            (dataLocal(tz, filtros.dataFinal)).toLocaleDateString() ==
            'Invalid Date'
              ? new Date(filtros.dataFinal)
              : dataLocal(tz, filtros.dataFinal),
          origem: filtros.origem,
        },
        {
          headers: {
            authorization: `bearer ${getTokenDashboard()}`,
          },
        },
      );
      dispatch(setLoadingVendas(false));
      dispatch({ type: LOAD_STATUS, payload: statusVendas.data.status });
    } catch (err) {
      setLoadingVendas(false);
      throw err;
    }
  };

export const loadVendas =
  (filtros: any, status?: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch(setLoadingVendas(true));

      const tz = tzOffset.offsetOf(getState().global.empresaAdmin.local);

      const objetoPost = {
        dataInicial: await dataLocal(tz, filtros.dataInicial),
        dataFinal:
          (await dataLocal(tz, filtros.dataFinal)).toLocaleDateString() ==
          'Invalid Date'
            ? new Date(filtros.dataFinal)
            : dataLocal(tz, filtros.dataFinal),
        status: status ? status : Status.TODOS,
      };

      const vendasLoja: any = await api.post(
        `api/front/v1/vendas/detalhes`,
        objetoPost,
        {
          headers: {
            authorization: `bearer ${getTokenDashboard()}`,
          },
        },
      );

      // dispatch(setQtdeVendasEmAberto());
      dispatch({ type: LOAD_VENDAS, payload: vendasLoja.data.vendas });
      // dispatch({ type: LOAD_STATUS, payload: vendasLoja.data.status });
      await dispatch(
        loadStatus({
          dataInicial: dataLocal(tz, filtros.dataInicial),
          dataFinal:
            dataLocal(tz, filtros.dataFinal).toLocaleDateString() ==
            'Invalid Date'
              ? new Date(filtros.dataFinal)
              : dataLocal(tz, filtros.dataFinal),
          origem: getState().global.controleVendas.origemAtual,
        }),
      );
      dispatch(setLoadingVendas(false));
    } catch (err) {
      dispatch(setLoadingVendas(false));
      throw err;
    }
  };

export const changeStatus =
  (
    status: Status,
    vendaId: string,
    valorDesconto?: string,
    valorTaxa?: string,
    valorTotal?: number,
    autoAtendimento?: boolean,
  ) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch(loadingStatus(true));
      dispatch(setLoadingVendas(true));
      const vendas = getState().global.controleVendas.vendas;
      const taxaEntrega = valorTaxa ?? '0';
      const taxaDesconto = valorDesconto ?? '0';
      const newStatus = await api.patch(
        `api/front/v1/vendas/${vendaId}`,
        {
          status,
          valorDesconto:
            autoAtendimento &&
            (status === 'ABERTO' ||
              status === 'PRODUÇÃO' ||
              status === 'EM RECEBIMENTO')
              ? 0
              : parseFloat(taxaDesconto) * -1 || 0,
          taxaEntrega: parseFloat(taxaEntrega) || 0,
          totalVenda: valorTotal || 0,
        },
        {
          headers: {
            authorization: `bearer ${getTokenDashboard()}`,
          },
        },
      );

      await dispatch(
        loadStatus({
          dataInicial: getState().global.controleVendas.dataInicial,
          dataFinal: getState().global.controleVendas.dataFinal,
          origem: getState().global.controleVendas.origemAtual,
        }),
      );
      dispatch(setLoadingVendas(false));
      dispatch(loadingStatus(false));
      dispatch({ type: CHANGE_STATUS, payload: newStatus.data.venda });
      // return { newStatus };
    } catch (err) {
      dispatch(loadingStatus(false));
      throw err;
    }
  };

export const changeStatusSocketIO =
  (
    status: Status,
    vendaId: string,
    idNFe: string,
    idPedido: string,
    numeroPedido: number,
    clienteDocumentoPedido: string,
    clienteDocumentoVenda: string,
    setOpenFinalizeModal: any,
    dadosFiscaisAtual: Object | null,
    dadosFiscais: any,
    integracaoFacilite: boolean,
    integracaoPedido: boolean
  ) =>
  async (dispatch: any, getState: any) => {
    const controleVendas = await getState().global.controleVendas.showVendas;
    let findFiscal = null;
    if (controleVendas && controleVendas.length > 0) {
      findFiscal = controleVendas.find((el: any) => el.idPedido === idPedido);
    }

    dispatch({
      type: CHANGE_STATUS,
      payload: {
        id: vendaId,
        status,
        idPedido,
        numeroPedido,
        clienteDocumentoPedido,
        clienteDocumentoVenda,
      },
    });

    if (!integracaoFacilite) {
      if (
        status === 'CANCELADO' &&
        findFiscal !== null &&
        findFiscal.fiscalCab &&
        Object.keys(findFiscal.fiscalCab).length > 0
      ) {
        const sales = (origem: string) => {
          switch (origem) {
            case 'INPERADELIVERY':
              return 'Delivery';
            case 'INPERAESTOUAQUI':
              return 'Estou Aqui';
            case 'IFOOD':
              return 'iFood';
            default:
              break;
          }
        };

        dispatch(
          abrirMensagem({
            open: true,
            mensagem: `Atenção, apenas a venda do "${sales(
              findFiscal?.origem,
            )}" será Cancelada. Para gerenciar os pedidos acesse
          "Administração > Gerenciamento de Pedidos".`,
            tipo: TipoMensagem.INFO,
          }),
        );
      }
      if (
        (status === 'ENTREGA' &&
          dadosFiscais &&
          dadosFiscais.length > 0 &&
          dadosFiscaisAtual &&
          Object.keys(dadosFiscaisAtual).length > 0 &&
          idNFe === null) ||
        (status === 'ENTREGA' &&
          dadosFiscais &&
          dadosFiscais.length > 0 &&
          idNFe === null)
      ) {
        setOpenFinalizeModal({
          open: true,
          data: {
            id: vendaId,
            status,
            idPedido,
            numeroPedido,
            clienteDocumentoPedido,
            clienteDocumentoVenda,
            // forceClose: true,
          },
          origem: '',
        });
      }
    } else {

      dispatch({
        type: CHANGE_STATUS,
        payload: {
          id: vendaId,
          status,
          idPedido,
          numeroPedido,
          clienteDocumentoPedido,
          clienteDocumentoVenda,
          integracaoFacilite,
          integracaoPedido
        },
      });
    }
  };

export const insertPaymentEstouAquiSocketIO =
  (pagamentos: any, vendaId: string, desconto: any, status: string) =>
  async (dispatch: any) => {
    dispatch({
      type: INSERT_PAYMENT_ESTOUAQUI,
      payload: {
        id: vendaId,
        pagamentos: await pagamentos.map((cob: any) => ({
          COB_DESCRICAO: cob.cobranca,
          VV_VALOR: cob.valorPago,
          VV_TROCO: cob.troco,
        })),
        desconto: desconto,
        status: status,
      },
    });
  };

export const changePage = (pagina: number) => {
  return { type: CHANGE_PAGE, payload: pagina };
};

export const relatorioUltimaOrdem =
  (vendaId: string, ordemproducao: number) => async (dispatch: any) => {
    try {
      const venda = await api.get(`api/front/v1/vendas/${vendaId}`, {
        withCredentials: true,
        params: {
          ordemproducao,
        },
      });

      if (!venda) {
        throw new Error('Nenhum registro encontrado');
      }

      return venda.data;
    } catch (err) {
      throw err;
    }
  };

export const loadDetalhes = (vendaId: string) => async (dispatch: any) => {
  try {
    const detalheVenda: any = await api.get(
      `api/front/v1/vendasItens/${vendaId}`,
      {
        withCredentials: true,
      },
    );

    if (!detalheVenda) {
      throw new Error('Nenhum registro encontrado');
    }

    dispatch({
      type: LOAD_DETALHES,
      payload: {
        vendaId,
        itens: detalheVenda.data.vendasItens.produtos,
      },
    });
  } catch (err) {
    throw err;
  }
};

export const pagamentoPendentePix =
  (vendaId: string, confirma: boolean, notificar: boolean, setLoading: any) =>
  async (dispatch: any) => {
    setLoading(true);
    try {
      await api.patch(
        `api/front/v1/vendas/pix/${vendaId}`,
        {
          confirma,
          notificar,
        },
        {
          withCredentials: true,
        },
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
    setLoading(false);
  };

export const loadingStatus = (loading: boolean) => ({
  type: SET_LOADING_STATUS,
  payload: loading,
});

export const setLoadingVendas = (loading: boolean) => (dispatch: any) => {
  dispatch({
    type: SET_LOADING_VENDAS,
    payload: loading,
  });
};

export const refreshDataVendasFiscal =
  (state: any, origem?: any) => (dispatch: any, getState: any) => {
    dispatch(setLoadingVendas(true));
    dispatch({
      type: REFRESH_VENDAS_FISCAL,
      payload: { state, origem },
    });
    dispatch(setLoadingVendas(false));
  };

// export const refreshDataVendasIntegration = (state: any, )
