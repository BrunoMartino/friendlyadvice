import {
  orderAscVenda,
  getMaiorOrdemProducao,
  Origem,
} from '../../../../../utils/fn';

import {
  LOAD_VENDAS,
  CHANGE_STATUS,
  SET_STATUS,
  SET_ORIGEM,
  CHANGE_DATAFINAL,
  CHANGE_DATAINICIAL,
  NUMERO_VENDA,
  ADD_VENDA,
  CHANGE_PAGE,
  SET_QTDE_VENDAS_EM_ABERTO,
  INSERT_PAYMENT_ESTOUAQUI,
  SET_LOADING_VENDAS,
  RESET_ALL_FILTERS,
  SET_LOADING_STATUS,
  REFRESH_VENDAS_FISCAL,
  OPEN_MODAL_NFC,
  LOAD_STATUS,
} from './action';
import { Status } from '../../../../../utils/fn';

const initialState = {
  numeroVenda: null,
  statusAtual: Status.TODOS,
  origemAtual: Origem.TODOS,
  dataInicial: new Date(),
  dataFinal: new Date(),
  vendas: [],
  showVendas: [],
  status: {},
  fiscalCab: {},
  vendasEmAberto: 0,
  totalPaginas: 0,
  paginaAtual: 0,
  loading: false,
  modalNfc: false,
};

const TOTAL_ITENS_POR_PAGINA =
  parseInt(process.env.REACT_APP_TOTAL_ITENS_POR_PAGINA!) || 15;

const checkVendas = (vendas: any[], status: string, origem: Origem) => {
  if (status === Status.TODOS && origem === Origem.TODOS) {
    return {
      value: [...vendas].sort(orderAscVenda),
      total: Math.ceil(vendas.length / TOTAL_ITENS_POR_PAGINA),
    };
  } else if (status !== Status.TODOS && origem === Origem.TODOS) {
    const result = vendas.filter((v: any) => v.status === status);
    return {
      value: result.sort(orderAscVenda),
      total: Math.ceil(result.length / TOTAL_ITENS_POR_PAGINA),
    };
  } else if (status === Status.TODOS && origem !== Origem.TODOS) {
    const result = vendas.filter((v: any) => v.origem === origem);
    return {
      value: result.sort(orderAscVenda),
      total: Math.ceil(result.length / TOTAL_ITENS_POR_PAGINA),
    };
  } else {
    const result = vendas.filter(
      (v: any) => v.status === status && v.origem === origem,
    );
    return {
      value: result.sort(orderAscVenda),
      total: Math.ceil(result.length / TOTAL_ITENS_POR_PAGINA),
    };
  }
};

const updatedDetail = (detailItems: any[], statusSale: any) => {
  if ((detailItems && detailItems.length === 0) || detailItems === undefined)
    return [];

  const result = [...detailItems];
  const maiorOrdem = getMaiorOrdemProducao(detailItems);
  result.forEach((item: any) => {
    if (item.hasOwnProperty('data')) {
      item.data.forEach((detail: any) => {
        if (statusSale !== Status.ABERTO) {
          detail.status = 'PRODUCAO';
        } else {
          if (maiorOrdem && !isNaN(maiorOrdem)) {
            if (detail.ordemProducao === maiorOrdem) detail.status = 'ABERTO';
          }
        }
      });
    } else {
      if (statusSale !== Status.ABERTO) {
        item.status = 'PRODUCAO';
      } else {
        if (item.ordemProducao === maiorOrdem) item.status = 'ABERTO';
      }
    }
  });

  return result;
};

const vendas = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_QTDE_VENDAS_EM_ABERTO:
      return {
        ...state,
        vendasEmAberto: action.payload,
      };
    case ADD_VENDA:
      if (
        new Date(state.dataInicial).toLocaleDateString() ===
          new Date().toLocaleDateString() ||
        new Date(state.dataFinal).toLocaleDateString() >=
          new Date().toLocaleDateString()
      ) {
        // const novaVenda = [...state.vendas, action.payload];
        // const novaVenda: any = [...state.vendas];
        const stateVendas: any = state.vendas;
        const actPayVenda: any = Array(action.payload);

        const novaVenda: any =
          stateVendas && stateVendas.length > 0
            ? [...stateVendas]
            : [...stateVendas, ...actPayVenda];
        if (novaVenda.length > 0) {
          const regVenda: any = novaVenda.findIndex(
            (venda: any) => venda.id === action.payload.id,
          );
          if (regVenda >= 0) novaVenda[regVenda] = action.payload;
          else novaVenda.push(action.payload);
        }
        const venda = checkVendas(
          novaVenda,
          state.statusAtual,
          state.origemAtual,
        );

        // const vendaAtual = novaVenda.find(
        //   (values: any) => values.id === action.payload.vendaAtualId,
        // );

        // console.log(vendaAtual, 'vendaAtual')

        // if (vendaAtual.integracao && action.payload.existIntegrationActivated) {
        //   //venda.V_INTEGRACAO === false
        //   // tem integração ativa porem o a venda esta sem integração
        //   vendaAtual.integradoNaoVincualado = true;
        // } else {
        //   vendaAtual.integradoNaoVincualado = false;
        // }

        return {
          ...state,
          vendas: novaVenda,
          showVendas: venda.value.slice(0, TOTAL_ITENS_POR_PAGINA),
          totalPaginas: venda.total,
        };
      } else {
        return {
          ...state,
        };
      }
    case SET_STATUS:
      const novoItens = checkVendas(
        state.vendas,
        action.payload,
        state.origemAtual,
      );
      return {
        ...state,
        statusAtual: action.payload,
        showVendas: novoItens.value.slice(0, TOTAL_ITENS_POR_PAGINA),
        paginaAtual: 0,
        totalPaginas: novoItens.total,
      };
    case SET_ORIGEM:
      const filterOrigem = checkVendas(
        state.vendas,
        state.statusAtual,
        action.payload,
      );
      return {
        ...state,
        origemAtual: action.payload,
        showVendas: filterOrigem.value.slice(0, TOTAL_ITENS_POR_PAGINA),
        paginaAtual: 0,
        totalPaginas: filterOrigem.total,
      };

    case RESET_ALL_FILTERS:
      return {
        ...state,
        origemAtual: Origem.TODOS,
        statusAtual: Status.TODOS,
        showVendas: state.vendas.slice(0, TOTAL_ITENS_POR_PAGINA),
        paginaAtual: 0,
        totalPaginas: Math.ceil(state.vendas.length / TOTAL_ITENS_POR_PAGINA),
      };
    case CHANGE_DATAINICIAL: {
      return {
        ...state,
        dataInicial: action.payload,
      };
    }
    case CHANGE_DATAFINAL: {
      return {
        ...state,
        dataFinal: action.payload,
      };
    }
    case LOAD_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case LOAD_VENDAS:
      const exibir = checkVendas(
        action.payload.map((v: any) => ({
          ...v,
          aviso: v.status === Status.ABERTO,
        })),
        state.statusAtual,
        state.origemAtual,
      );

      return {
        ...state,
        // vendas: [...action.payload],
        // totalPaginas: Math.ceil(action.payload.length / TOTAL_ITENS_POR_PAGINA),
        totalPaginas: exibir.total,
        paginaAtual: 0,
        vendas: action.payload.map((v: any) => ({
          ...v,
          aviso: v.status === Status.ABERTO,
          // idPedido: action.payload.idPedido,
          fiscalCab: v.fiscalCab ?? {},
        })),
        showVendas: exibir.value.slice(
          state.paginaAtual * TOTAL_ITENS_POR_PAGINA,
          state.paginaAtual * TOTAL_ITENS_POR_PAGINA + TOTAL_ITENS_POR_PAGINA,
        ),
        // showVendas: action.payload.filter((v: any) => v.status === state.statusAtual)
      };
    case CHANGE_STATUS:
      const idx = state.vendas.findIndex(
        (f: any) => f.id === action.payload.id,
      );

      const data: any = [...state.vendas];
      let integradoNaoVincualado = false;
      let integracao = false;

      if (
        !data[idx].integracao && // origem dele é false, pois não integrou
        action.payload.integracaoFacilite && // a empresa tem integração
        action.payload.integracaoPedido // facilite executa e passa a integração ativada, true
      ) {
        integradoNaoVincualado = false; // adiciona o vinculo
        integracao = true;
      } else {
        integradoNaoVincualado = true; // não tem vinculo
        integracao = false;
      }

      data[idx] = {
        ...data[idx],
        status: action.payload.status,
        detalhe: updatedDetail(data[idx]?.detalhe, action.payload.status),
        aviso: Status.ABERTO === action.payload.status,
        //atualiza o idPedido após trocar de status
        integradoNaoVincualado,
        integracao,
        idPedido: action.payload.idPedido,
        numeroPedido: action.payload.numeroPedido,
        fiscalCab: action.payload.fiscalCab ?? {},
        cliente: {
          ...data[idx].cliente,
          clienteDocumentoPedido: action.payload.clienteDocumentoPedido,
          clienteDocumentoVenda: action.payload.clienteDocumentoVenda,
        },
      };
      const itens = checkVendas(data, state.statusAtual, state.origemAtual);
      const checkUltimoItem =
        itens.value.slice(
          state.paginaAtual * TOTAL_ITENS_POR_PAGINA,
          state.paginaAtual * TOTAL_ITENS_POR_PAGINA + TOTAL_ITENS_POR_PAGINA,
        ).length === 0;
      const pagina =
        state.paginaAtual !== 0 && checkUltimoItem
          ? state.paginaAtual - 1
          : state.paginaAtual;

      return {
        ...state,
        vendas: data,
        // showVendas: itens.value.slice(0, TOTAL_ITENS_POR_PAGINA),
        showVendas: itens.value.slice(
          pagina * TOTAL_ITENS_POR_PAGINA,
          pagina * TOTAL_ITENS_POR_PAGINA + TOTAL_ITENS_POR_PAGINA,
        ),
        totalPaginas: itens.total,
        paginaAtual: pagina,
        vendasEmAberto:
          data.filter((f: any) => f.status === Status.ABERTO).length || 0,
      };
    case OPEN_MODAL_NFC:
      return {
        ...state,
        modalNfc: action.payload,
      };
    case INSERT_PAYMENT_ESTOUAQUI:
      const idxVenda = state.vendas.findIndex(
        (f: any) => f.id === action.payload.id,
      );
      const dataVenda: any = [...state.vendas];

      dataVenda[idxVenda].formaPagamento = action.payload.pagamentos;
      dataVenda[idxVenda].valorDesconto = action.payload.desconto;
      dataVenda[idxVenda].status = action.payload.status;

      dataVenda[idxVenda] = {
        ...dataVenda[idxVenda],
      };

      const vendaEstouAqui = checkVendas(
        dataVenda,
        state.statusAtual,
        state.origemAtual,
      );

      return {
        ...state,
        vendas: dataVenda,
        showVendas: vendaEstouAqui.value.slice(0, TOTAL_ITENS_POR_PAGINA),
        totalPaginas: vendaEstouAqui.total,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        paginaAtual: action.payload,
        showVendas: checkVendas(
          state.vendas,
          state.statusAtual,
          state.origemAtual,
        ).value.slice(
          action.payload * TOTAL_ITENS_POR_PAGINA,
          action.payload * TOTAL_ITENS_POR_PAGINA + TOTAL_ITENS_POR_PAGINA,
        ),
      };
    case NUMERO_VENDA:
      return {
        ...state,
        numeroVenda: action.payload.numero,
        idVenda: action.payload.idVenda,
      };

    case SET_LOADING_VENDAS:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_LOADING_STATUS:
      return {
        ...state,
        loadingStatus: action.payload,
      };
    case REFRESH_VENDAS_FISCAL:
      let refreshedData: any[];
      if (state.vendas && state.vendas.length > 0) {
        refreshedData = [...state.vendas];
        let outsideData: any;

        if (action.payload && 'state' in action.payload) {
          outsideData = action.payload?.state.data;
        } else {
          outsideData = action.payload?.data;
        }

        if (action.payload.origem === 'refresh') {
          outsideData = action.payload.state;
        }

        if (action.payload.origem !== 'add') {
          const object = refreshedData.find((obj) => {
            return obj?.fiscalCab?.idFiscal === outsideData?.idFiscalCab;
          });

          const index = refreshedData.indexOf(object);
          if (
            object &&
            typeof object === 'object' &&
            Object.keys(object).length > 1 &&
            'fiscalCab' in object
          ) {
            object.fiscalCab = {};
            refreshedData[index] = object;
          } else {
            refreshedData[index] = object;
          }
        }
        // refreshedData.map(async (e: any) => {

        if (action.payload.origem === 'add') {
          const find = refreshedData.find(
            (el: any) => el?.idPedido === outsideData?.fiscalCab?.id,
          );
          const index = refreshedData.indexOf(find);
          Object.assign(refreshedData[index], outsideData);
          refreshedData[index].fiscalCab = outsideData.fiscalCab;
        }

        if (action.payload.origem === 'refresh') {
          const find = refreshedData.find(
            (elx: any) => elx?.idPedido === outsideData.idPedido,
          );
        }
        // });
        return {
          ...state,
          vendas: refreshedData,
          showVendas: refreshedData,
        };
      }
    default:
      return state;
  }
};

export default vendas;
