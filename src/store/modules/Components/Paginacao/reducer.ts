import {
  SET_DATAPAGINACAO,
  SET_PAGINAATUAL,
  SET_TOTALPAGINA,
  SET_VALORPESQUISA,
  SET_LIMPARPESQUISA,
  SET_LIMPARDADOS,
  SET_DATA,
  REMOVE_DATA,
  DELETE_DATA,
  SET_CHECK_ITEM,
  SET_ALL_ITEM,
  SET_ORIGEM,
  SET_CHANGE_DATA_PEDIDO,
  SET_LIMPARDATA,
  SET_CHECK_ONE_ITEM,
  SET_LOADING,
  SET_NAVIGATE_SUBPAGE_VISION,
  SET_CLEAR_SUBPAGES_VISION,
  SET_REFRESH_DATA_PAGINATION,
  SET_FILTROSELECIONADO,
  SET_LIMPARFILTRO,
} from './action';

const initialState = {
  paginaAtual: 1,
  totalPaginas: 0,
  origem: '',
  subPages: [
    {
      origem: '',
      page: 0,
    },
  ],
  data: [],
  valorPesquisado: '',
  isLoading: false,
  filtroSelecionado: { id: '', descricao: '', inputValue: '', origem: '' },
};

const Paginacao = (state: any = initialState, action: any) => {
  switch (action.type) {
    case SET_ORIGEM:
      return {
        ...state,
        origem: action.payload,
      };
    case SET_DATAPAGINACAO:

    const rows = action.payload && action.payload.rows ? action.payload.rows : [];
    const count = action.payload && action.payload.count ? action.payload.count : 0;

      return {
        ...state,
        data:
          rows.map((prod: any) => ({
            ...prod,
            checked: false,
            disabled: false,
          })),
        totalPaginas: Math.ceil(count / action.totalItensPagina),
      };

    case SET_PAGINAATUAL:
      return { ...state, paginaAtual: action.payload };

    case SET_ALL_ITEM:
      return {
        ...state,
        data: state.data.map((item: any) => ({
          ...item,
          checked: item.disabled ? false : action.payload,
        })),
      };
    case SET_CHECK_ITEM:
      const cpData = [...state.data];
      let idx = -1;
      if (action.payload.key) {
        idx = cpData.findIndex(
          (item) => item[action.payload.key] === action.payload.id,
        );
      } else {
        idx = cpData.findIndex((item) => item.id === action.payload.id);
      }

      if (idx >= 0) {
        cpData[idx].checked = action.payload.value;
      }
      return {
        ...state,
        data: cpData,
      };

    case SET_CHECK_ONE_ITEM:
      const dataActual = [...state.data];

      const findId = dataActual.findIndex(
        (el: any) => el.id === action.payload.id,
      );

      dataActual.filter((el: any) => {
        if (el.id === action.payload.id) {
          return (dataActual[findId].checked = action.payload.value);
        } else {
          return (el.checked = !action.payload.value);
        }
      });

      return {
        ...state,
        data: dataActual,
      };

    case SET_TOTALPAGINA:
      return { ...state, totalPaginas: action.payload };
    case SET_VALORPESQUISA:
      return { ...state, valorPesquisado: action.payload };
    case SET_LIMPARPESQUISA:
      return { ...state, valorPesquisado: '' };

    case SET_CHANGE_DATA_PEDIDO:
      let getDataPedido: any = [];

      const getValuesPedido = action.payload;

      if (state.data && state.data.length > 0) {
        getDataPedido = [...state.data];
      }

      getValuesPedido &&
        getValuesPedido.length > 0 &&
        getValuesPedido.forEach((itens: any) => {
          const valid = getDataPedido.filter((el: any) => el.id === itens.id);
          if (valid && valid.length > 0) {
            if (valid[0].status) {
              return (valid[0].status = 'C') && (valid[0].checked = false);
            }
          }
        });

      let paginaAtual = state.paginaAtual;
      let totalPagina = state.totalPaginas;
      if (getDataPedido.length === 0 && paginaAtual > 1) {
        paginaAtual = paginaAtual - 1;
        totalPagina -= 1;
      } else if (getDataPedido.length === 0 && paginaAtual === 1) {
        paginaAtual = 1;
      }

      return {
        ...state,
        paginaAtual: paginaAtual,
        data: getDataPedido,
        totalPaginas: totalPagina,
      };

    case DELETE_DATA:
      const values = action.payload;
      let newData: any = null;
      if (typeof values === 'object') {
        newData = [...state.data];
        values.forEach((v: any) => {
          const validId = newData.filter((d: any) => d.idCep);
          if (validId && validId.length > 0) {
            newData = newData.filter((d: any) => d.idCep !== v);
          } else {
            newData = newData.filter((d: any) => d.id !== v);
          }
        });
      } else {
        const validId = state.data.filter((d: any) => d.idCep);
        if (validId && validId.length > 0) {
          newData = state.data.filter((f: any) => f.idCep !== values);
        } else {
          newData = state.data.filter((f: any) => f.id !== values);
        }
      }
      let pagAtual = state.paginaAtual;
      let tlPagina = state.totalPaginas;
      if (newData.length === 0 && pagAtual > 1) {
        pagAtual = pagAtual - 1;
        tlPagina -= 1;
      } else if (newData.length === 0 && pagAtual === 1) {
        pagAtual = 1;
      }
      return {
        ...state,
        paginaAtual: pagAtual,
        data: newData,
        totalPaginas: tlPagina,
      };
    case SET_DATA:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case REMOVE_DATA:
      const filterData = state.data.filter(
        (int: any) =>
          int[action.payload.fieldActual] !== action.payload.fieldRemove,
      );

      return {
        ...state,
        data: filterData,
      };
    case SET_LIMPARDATA:
      return {
        ...state,
        data: [],
      };
    case SET_LIMPARDADOS:
      return {
        ...initialState,
      };
    case SET_LOADING:
      state = { ...state, isLoading: action.payload };
      return state;

    case SET_NAVIGATE_SUBPAGE_VISION:
      const newPages = action.payload;
      let arrayPage: any = [];

      if (state.subPages && state.subPages.length > 0) {
        arrayPage = [...state.subPages];
      }

      const findIndex = arrayPage.findIndex(
        (pg: any) => pg && pg.origem === newPages.origem,
      );

      if (findIndex !== -1) {
        arrayPage[findIndex].origem = newPages.origem;
        arrayPage[findIndex].page = newPages.page;
      } else {
        arrayPage.push(newPages);
      }

      return { ...state, subPages: arrayPage };

    case SET_CLEAR_SUBPAGES_VISION:
      return {
        ...state,
        subPages: [
          {
            origem: '',
            page: 0,
          },
        ],
      };
    case SET_REFRESH_DATA_PAGINATION:
      let refreshedData: any[];
      if (state.data && state.data.length > 0) {
        refreshedData = [...state.data];

        const outsideData = action.payload.value.data;
        refreshedData.map((e: any) => {
          if (action.payload.origem !== 'add') {
            const findToDelete = refreshedData.find(
              (el: any) =>
                el?.FiscalCab?.id === outsideData?.fiscalCab?.idFiscal,
            );
            const index = refreshedData.indexOf(findToDelete);

            delete findToDelete?.FiscalCab;
            refreshedData[index] = findToDelete;
          }

          if (action.payload.origem === 'add') {
            const find = refreshedData.find(
              (el: any) => el?.id === outsideData?.fiscalCab?.id,
            );

            const index = refreshedData.indexOf(find);
            Object.assign(refreshedData[index], outsideData);
            refreshedData[index].FiscalCab = outsideData.fiscalCab;
          }
        });

        return {
          ...state,
          data: refreshedData,
        };
      }
      return state;

    case SET_FILTROSELECIONADO:
      return {
        ...state,
        filtroSelecionado: action.payload,
      };

    case SET_LIMPARFILTRO:
      return {
        ...state,
        filtroSelecionado: initialState.filtroSelecionado,
      };

    default:
      return state;
  }
};

export default Paginacao;
