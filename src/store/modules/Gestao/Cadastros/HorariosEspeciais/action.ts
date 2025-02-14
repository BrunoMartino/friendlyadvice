import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { TOTAL_ITENS_PAGINA } from '../../../../../utils/consts';
import { getTokenDashboard } from '../../../../../utils/fn';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const LIMPAR_HORARIOS_ESPECIAIS = '[HORARIOS_ESPECIAIS]LIMPAR';
export const LIMPAR_HORARIOS_ESPECIAIS_EDICAO =
  '[HORARIOS_ESPECIAIS]LIMPAR_EDICAO';
export const CARREGA_HORARIOS_ESPECIAIS = '[HORARIOS_ESPECIAIS]CARREGA';
export const ADD_HORARIOS_ESPECIAIS = '[HORARIOS_ESPECIAIS]ADICIONAR';
export const ADD_DESCRICAO_HORARIOS = '[HORARIOS_ESPECIAIS]ADICIONAR_DESCRICAO';
export const EDIT_HORARIOS_TELA = '[HORARIOS_ESPECIAIS]EDITAR_TELA';
export const REMOVE_HORARIOS = '[HORARIOS_ESPECIAIS]REMOVER';
export const EDIT_HORARIOS = '[HORARIOS_ESPECIAIS]EDITAR';
export const CHANGE_HORARIOS = '[HORARIOS_ESPECIAIS]CHANGE';
export const SET_PAGINA_ATUAL_HORARIO_ESPECIAL =
  '[HORARIOS_ESPECIAIS]PAGINA_ATUAL';
export const SET_EDIT_DADOS_CABEÇALHO = '[HORARIOS_ESPECIAIS]SET_EDIT';
export const SET_TOTAL_PAGINAS = '[HORARIOS_ESPECIAIS]SET_TOTAL_PAGINA';
export const SET_DATA_PAGINACAO_TOTAL =
  '[HORARIOS_ESPECIAIS]SET_DATA_PAGINACAO_TOTAL';

export const getHorario = () => async (dispatch: any) => {
  try {
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
    const { data } = await api.get('api/v1/horarioEspecial');
    dispatch({
      type: CARREGA_HORARIOS_ESPECIAIS,
      payload: data.horariosEspeciais.rows,
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

export const postHorario =
  (horarios: any, values: any, actions: any) => async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const { data } = await api.post('api/v1/horarioEspecial', {
        descricao: values.descricao.trim(),
        horarios: horarios,
      });

      actions.resetForm({
        values: {
          descricao: '',
          diaSemana: {
            id: '0f47bfbc-87e0-4ea0-9ab0-74ba8312fa2e',
            descricao: 'Segunda-Feira',
          },
          horarioInicial: '',
          horarioFinal: '',
        },
      });
      dispatch(limparHorarios());
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Sucesso ao cadastrar o registro.',
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

export const patchHorario =
  (id: any, horarios: any, values: any, actions: any, history: any) =>
  async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const { data } = await api.patch(`/api/v1/horarioEspecial/${id}`, {
        descricao: values.descricao.trim(),
        horarios: horarios,
      });

      actions.resetForm();
      dispatch(limparHorarios());
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
      history.push('/listagem/horariosespeciais');
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

export const editHorarios = (obj: any) => (dispatch: any) => {
  dispatch({ type: EDIT_HORARIOS, payload: obj });
  dispatch({ type: SET_DATA_PAGINACAO_TOTAL, payload: obj });
  dispatch(setDataHorarioEspecial(1));
};

export const editCabecalhoHorarios = (dados: any) => (dispatch: any) => {
  dispatch({ type: SET_EDIT_DADOS_CABEÇALHO, payload: dados });
};

export const changeHorarios = (obj: any) => (dispatch: any) => {
  dispatch({ type: CHANGE_HORARIOS, payload: obj });
};

export const addHorario = (horarios: any) => (dispatch: any, getState: any) => {
  dispatch({ type: ADD_DESCRICAO_HORARIOS, payload: horarios.descricao });
  delete horarios.descricao;
  dispatch({ type: ADD_HORARIOS_ESPECIAIS, payload: horarios.horarios });
  dispatch(setDataHorarioEspecial(getState().session.cadastroHorariosEspeciais.pagina));
};

export const editarHorariosTela = (horarios: any) => (dispatch: any) => {
  dispatch({ type: EDIT_HORARIOS_TELA, payload: horarios });
};

export const removeHorario = (id: any) => (dispatch: any) => {
  dispatch({ type: REMOVE_HORARIOS, payload: id });
};

export const limparHorarios = () => (dispatch: any) => {
  dispatch({ type: LIMPAR_HORARIOS_ESPECIAIS });
};

export const limpaHorariosEdicao = () => (dispatch: any) => {
  dispatch({ type: LIMPAR_HORARIOS_ESPECIAIS_EDICAO });
};

//PAGINACAO
const ordenar = (a: any, b: any) => {
  if (a.descricao > b.descricao) return 1;
  if (a.descricao < b.descricao) return -1;
  return 0;
};

export const setPaginaAtualHorarioEspecial = (pagina: number) => ({
  type: SET_PAGINA_ATUAL_HORARIO_ESPECIAL,
  payload: pagina,
});

export const setDataHorarioEspecial =
  (pagina: number) => (dispatch: any, getState: any) => {
    const horarios = getState().session.cadastroHorariosEspeciais.dataPaginacao;
    if (horarios && horarios.length > 0) {
      const exibeDados: any = horarios
        .slice(
          (pagina - 1) * TOTAL_ITENS_PAGINA,
          (pagina - 1) * TOTAL_ITENS_PAGINA + TOTAL_ITENS_PAGINA,
        )
        .sort(ordenar);

      dispatch(setPaginaAtualHorarioEspecial(pagina));
      dispatch({ type: EDIT_HORARIOS, payload: exibeDados });
      dispatch({ type: SET_TOTAL_PAGINAS, payload: horarios });
    }
  };
