import { TOTAL_ITENS_PAGINA } from '../../../../../utils/consts';
import {
  LIMPAR_HORARIOS_ESPECIAIS,
  CARREGA_HORARIOS_ESPECIAIS,
  ADD_HORARIOS_ESPECIAIS,
  ADD_DESCRICAO_HORARIOS,
  EDIT_HORARIOS_TELA,
  REMOVE_HORARIOS,
  EDIT_HORARIOS,
  CHANGE_HORARIOS,
  LIMPAR_HORARIOS_ESPECIAIS_EDICAO,
  SET_PAGINA_ATUAL_HORARIO_ESPECIAL,
  SET_EDIT_DADOS_CABEÇALHO,
  SET_TOTAL_PAGINAS,
  SET_DATA_PAGINACAO_TOTAL,
} from './action';

const initialValues: any = {
  id: '',
  descricao: '',
  horarios: [],
  dataPaginacao: [],
  edicaoHorarios: {},
  pagina: 1,
  totalPaginas: 0,
};

const calcTotalPaginas = (qtdeItens: number) => {
  return Math.ceil(qtdeItens / TOTAL_ITENS_PAGINA);
};

export default (state = initialValues, action: any) => {
  switch (action.type) {
    case SET_PAGINA_ATUAL_HORARIO_ESPECIAL:
      return {
        ...state,
        pagina: action.payload,
      };
    case LIMPAR_HORARIOS_ESPECIAIS:
      return { ...initialValues };

    case LIMPAR_HORARIOS_ESPECIAIS_EDICAO:
      return { ...state, edicaoHorarios: {} };

    case CARREGA_HORARIOS_ESPECIAIS:
      return {
        ...state,
        horarios: [...action.payload],
      };

    case ADD_HORARIOS_ESPECIAIS:
      return {
        ...state,
        horarios: [...state.horarios, { ...action.payload }],
        dataPaginacao:
          state.dataPaginacao && state.dataPaginacao.length > 0
            ? [...state.dataPaginacao, { ...action.payload }]
            : [{ ...action.payload }],
        totalPaginas: calcTotalPaginas(state.horarios.length + 1),
      };

    case ADD_DESCRICAO_HORARIOS:
      return {
        ...state,
        descricao: action.payload,
      };

    case EDIT_HORARIOS_TELA:
      return {
        ...state,
        edicaoHorarios: action.payload,
      };

    case REMOVE_HORARIOS:
      let novoTotalPagina;
      let novoHorarios;
      let novaDataPaginacao;
      const quantidadeRegistros = state.horarios.length;

      let novaPagina;

      novaDataPaginacao = [
        ...state.dataPaginacao.filter(
          (item: any) =>
            state.dataPaginacao.indexOf(item) !== action.payload.index,
        ),
      ];

      novoHorarios = [
        ...state.horarios.filter(
          (item: any) => state.horarios.indexOf(item) !== action.payload.index,
        ),
      ];
      novoTotalPagina = state.totalPaginas;
      novaPagina = state.pagina;

      if (quantidadeRegistros && quantidadeRegistros === 1) {
        let limitHorario = [...novaDataPaginacao];

        novoTotalPagina = calcTotalPaginas(limitHorario.length - 1);
        novaPagina = state.pagina > 1 ? state.pagina - 1 : 1;

        if (limitHorario.length > 10) {
          novoHorarios = [...novaDataPaginacao].slice(9, 19);
        } else {
          novoHorarios = [...novaDataPaginacao];
        }
      }

      return {
        ...state,
        horarios: novoHorarios,
        dataPaginacao: novaDataPaginacao,
        totalPaginas: novoTotalPagina,
        pagina: novaPagina,
      };

    case EDIT_HORARIOS:
      return {
        ...state,
        horarios: action.payload,
      };

    case SET_DATA_PAGINACAO_TOTAL:
      return {
        ...state,
        dataPaginacao: action.payload,
      };

    case SET_TOTAL_PAGINAS:
      return {
        ...state,
        totalPaginas: calcTotalPaginas(action.payload.length),
      };

    case SET_EDIT_DADOS_CABEÇALHO:
      return {
        ...state,
        id: action.payload.id,
        descricao: action.payload.descricao,
      };

    case CHANGE_HORARIOS:
      const horariosRd = [...state.horarios];
      const index = action.payload.index;
      delete action.payload.index;
      horariosRd[index] = { ...action.payload };

      const newData = [...state.dataPaginacao];
      newData[index] = { ...action.payload };

      return {
        ...state,
        horarios: horariosRd,
        dataPaginacao: newData,
      };

    default:
      return state;
  }
};
