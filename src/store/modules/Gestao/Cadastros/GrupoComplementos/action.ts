import { ETypePagination } from '../../../../../components/Paginacao/interfacePaginacao';
import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { TOTAL_ITENS_PAGINA } from '../../../../../utils/consts';
import { getTokenDashboard } from '../../../../../utils/fn';
import { removerMascara } from '../../../../../utils/mascaras';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import {
  setDataPaginacao,
  setLoading,
} from '../../../Components/Paginacao/action';
import { abrirMensagem } from '../../../Components/SnackBar/action';
import { urlComplementos } from '../Complementos/action';

export const ADD_NOVO_COMPLEMENTO_DO_GRUPO =
  '[COMPLEMENTO_DO_GRUPO]CADASTRAR_COMPLEMENTO';
export const CARREGA_COMPLEMENTO_DO_GRUPO =
  '[COMPLEMENTO_DO_GRUPO]GRAVAR_COMPLEMENTO';
export const CARREGA_GRUPO_DO_COMPLEMENTO = '[GRUPO_COMPLEMENTO]CARREGAR_GRUPO';

export const CARREGA_DADOS_DO_GRUPOCOMPLEMENTO = '[GRUPO_COMPLEMENTO]CARREGAR';
export const ADD_NOVOS_COMPLEMENTO_DO_GRUPO = '[COMPLEMENTO_DO_GRUPO]GRAVAR';
export const EDICAO_GRUPO_COMPLEMENTO = '[GRUPO_COMPLEMENTO]EDICAO';
export const UPDATE_GRUPO_COMPLEMENTO = '[COMPLEMENTO_DO_GRUPO]ATUALIZAR';
export const REMOVER_GRUPO_COMPLEMENTO = '[COMPLEMENTO_DO_GRUPO]REMOVER';

export const SET_PAGINA_ATUAL_GRUPOCOMPLEMENTO =
  '[GRUPO_COMPLEMENTO]SET_PAGINA_ATUAL';
export const SET_DATA_GRUPOCOMPLEMENTO = '[GRUPO_COMPLEMENTO]SET_DATA';

export const SET_ALTERACAO_GRUPO_DO_COMPLEMENTO =
  '[GRUPO_COMPLEMENTO]ALTERACAO_GRUPO';

export const LIMPAR_DADOS_GRUPO_COMPLEMENTO = '[GRUPO_COMPLEMENTO]LIMPAR';

export const LIMPAR_TODOS_DADOS_DO_GRUPO_COMPLEMENTO =
  '[GRUPO_COMPLEMENTO]LIMPA_TUDO';

export const SET_LOADING_GPCOMPLEMENTOS =
  '[GRUPO_COMPLEMENTO]SET_LOADING_GPCOMPLEMENTOS';

export const carregaDadosDoGrupoComplemento =
  (pagina?: number) => async (dispatch: any, getState: any) => {
    try {
      const { id } =
        getState().session.cadastroGrupoComplementos.grupoDoComplemento;
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const { data } = await api.get(`api/v1/gruposComplementos/${id}`);

      if (
        data &&
        data.grupoComplemento &&
        data.grupoComplemento.rows &&
        data.grupoComplemento.rows.complementos &&
        data.grupoComplemento.rows.complementos.length > 0
      ) {
        dispatch({
          type: CARREGA_DADOS_DO_GRUPOCOMPLEMENTO,
          payload: data.grupoComplemento.rows.complementos,
        });
      }
      dispatch(setDataGrupoComplemento(pagina ? pagina : 1));
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

export const gravaNovoComplementoDoGrupo =
  (values: any) => async (dispatch: any, getState: any) => {
    try {
      const idGrupo =
        getState().session.cadastroGrupoComplementos.grupoDoComplemento.id;
      const complementos: any = Object.values(
        getState().session.cadastroGrupoComplementos.complementos,
      ).find((el: any) => el.id === values.descricao.id);

      if (values) {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

        const { data } = await api.post(`/api/v1/gruposComplementos`, {
          grupo: idGrupo,
          complemento: values.descricao.id.trim(),
          valor: removerMascara(values.valor).replace(',', '.'),
        });

        dispatch({
          type: ADD_NOVOS_COMPLEMENTO_DO_GRUPO,
          payload: {
            id: data.grupoComplemento.complemento,
            descricao: data.grupoComplemento.complemento
              ? complementos.descricao
              : '',
            valor: data.grupoComplemento.valor,
            idgrupocomplemento: data.grupoComplemento.idGrupoComplemento,
          },
        });

        dispatch(
          abrirMensagem({
            open: true,
            mensagem: `Sucesso ao cadastrar o registro.`,
            tipo: TipoMensagem.SUCESSO,
          }),
        );
        // dispatch(
        //   setDataGrupoComplemento(
        //     getState().session.cadastroGrupoComplementos.pagina,
        //   ),
        // );
        await dispatch(
          carregaDadosDoGrupoComplemento(
            getState().session.cadastroGrupoComplementos.pagina,
          ),
        );
        dispatch(limparDadosGrupoComplemento());
      } else {
        throw new Error('Erro ao cadastrar o complemento do Grupo');
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

export const edicaoGrupoComplementoSelecionado =
  (obj: any) => async (dispatch: any) => {
    dispatch({ type: EDICAO_GRUPO_COMPLEMENTO, payload: obj });
  };

export const alteraComplementoDoGrupo =
  (idComplemento: any, values: any) => async (dispatch: any, getState: any) => {
    try {
      const idGrupo =
        getState().session.cadastroGrupoComplementos.grupoDoComplemento.id;
      const complementos: any = Object.values(
        getState().session.cadastroGrupoComplementos.complementos,
      ).find((el: any) => el.id === idComplemento);

      if (idComplemento) {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

        const { data } = await api.patch(
          `/api/v1/gruposComplementos/${idGrupo}/complemento/${idComplemento}`,
          {
            valor: removerMascara(values.valor).replace(',', '.'),
          },
        );

        dispatch({
          type: UPDATE_GRUPO_COMPLEMENTO,
          payload: {
            id: data.grupoComplemento.complemento,
            descricao: data.grupoComplemento.complemento
              ? complementos.descricao
              : '',
            valor: data.grupoComplemento.valor,
            idgrupocomplemento: data.grupoComplemento.idGrupoComplemento,
          },
        });

        dispatch(
          abrirMensagem({
            open: true,
            mensagem: `Sucesso ao editar o registro.`,
            tipo: TipoMensagem.SUCESSO,
          }),
        );

        // dispatch(
        //   setDataGrupoComplemento(
        //     getState().session.cadastroGrupoComplementos.pagina,
        //   ),
        // );
        await dispatch(
          carregaDadosDoGrupoComplemento(
            getState().session.cadastroGrupoComplementos.pagina,
          ),
        );

        dispatch(limparDadosGrupoComplemento());
      } else {
        throw new Error('Erro ao alterar o complemento do Grupo');
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

export const removeGrupoComplemento =
  (idGrupo: any, idComplemento: string) =>
  async (dispatch: any, getState: any) => {
    try {
      await api.delete(
        `/api/v1/gruposComplementos/${idGrupo}/complemento/${idComplemento}`,
        {
          headers: {
            authorization: `Bearer ${getTokenDashboard()}`,
          },
        },
      );

      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Sucesso ao remover complemento do grupo.',
          tipo: TipoMensagem.SUCESSO,
        }),
      );

      dispatch({ type: REMOVER_GRUPO_COMPLEMENTO, payload: idComplemento });
      dispatch(
        setDataGrupoComplemento(
          getState().session.cadastroGrupoComplementos.pagina,
        ),
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

export const limparDadosGrupoComplemento = () => async (dispatch: any) => {
  dispatch({ type: LIMPAR_DADOS_GRUPO_COMPLEMENTO });
};

export const limpaTodosDadosDoGrupoComplemento =
  () => async (dispatch: any) => {
    dispatch({ type: LIMPAR_TODOS_DADOS_DO_GRUPO_COMPLEMENTO });
  };

//grupo para complemento do grupo
export const setIdGrupoDoComplemento = (id: string, clear = false) => {
  return {
    type: SET_ALTERACAO_GRUPO_DO_COMPLEMENTO,
    payload: clear ? '' : id,
  };
};

//Complemento

export const carregaGrupoDoComplemento =
  (obj: any) => async (dispatch: any) => {
    if (obj) {
      dispatch({ type: CARREGA_GRUPO_DO_COMPLEMENTO, payload: obj });
    }
  };

export const gravaComplementoDoGrupo =
  (setFieldValue: any, values: any) => async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const { data } = await api.post(`api/v1/complementos`, {
        id: values.id,
        descricao: values.descricao.trim(),
      });

      const novoComplemento = {
        id: data.complemento.id,
        descricao: data.complemento.descricao.trim(),
        inputValue: '',
      };

      dispatch({
        type: ADD_NOVO_COMPLEMENTO_DO_GRUPO,
        payload: novoComplemento,
        // payload: data.complemento,
      });

      dispatch(
        abrirMensagem({
          open: true,
          mensagem: `Sucesso ao cadastrar novo complemento.`,
          tipo: TipoMensagem.SUCESSO,
        }),
      );
      setFieldValue('descricao', novoComplemento);
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

//Grupo

export const carregaGrupoComplementos = () => async (dispatch: any) => {
  try {
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

    const { data } = await api.get(`api/v1/complementos`);

    if (!data || data.complementos.rows === 0) {
      throw new Error();
    }
    dispatch({
      type: CARREGA_COMPLEMENTO_DO_GRUPO,
      payload: data.complementos.rows.map((el: any) => ({
        id: el.id,
        descricao: el.descricao.trim(),
        inputValue: '',
      })),
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

//Paginação Interna

export const setPaginaAtualGrupoComplemento = (pagina: number) => ({
  type: SET_PAGINA_ATUAL_GRUPOCOMPLEMENTO,
  payload: pagina,
});

export const setDataGrupoComplemento =
  (pagina: number) => (dispatch: any, getState: any) => {
    const dados = Object.values(
      getState().session.cadastroGrupoComplementos.carregaGrupoComplemento,
    );
    const exibeDados = dados.slice(
      (pagina - 1) * TOTAL_ITENS_PAGINA,
      (pagina - 1) * TOTAL_ITENS_PAGINA + TOTAL_ITENS_PAGINA,
    );

    dispatch(setPaginaAtualGrupoComplemento(pagina));
    dispatch({ type: SET_DATA_GRUPOCOMPLEMENTO, payload: exibeDados });
  };

export const orderUpGpcomplemento =
  (id: string) => async (dispatch: any, getState: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.put(`api/v1/gruposComplementos/orderup/${id}`);

      const paginaAtual = getState().session.cadastroGrupoComplementos.pagina;

      dispatch(setLoadingGpcomplemento(true));
      await dispatch(carregaDadosDoGrupoComplemento(paginaAtual));
      dispatch(setLoadingGpcomplemento(false));
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

export const orderDownGpcomplemento =
  (id: string) => async (dispatch: any, getState: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.put(`api/v1/gruposComplementos/orderdown/${id}`);

      const paginaAtual = getState().session.cadastroGrupoComplementos.pagina;

      dispatch(setLoadingGpcomplemento(true));
      await dispatch(carregaDadosDoGrupoComplemento(paginaAtual));
      dispatch(setLoadingGpcomplemento(false));
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

export const setLoadingGpcomplemento =
  (loading: boolean) => (dispatch: any) => {
    dispatch({ type: SET_LOADING_GPCOMPLEMENTOS, payload: loading });
  };

export const desabilitaComplementosDoGrupo =
  (id: string, sinc: boolean, paginaAtual: number) =>
  async (dispatch: any, getState: any) => {
    dispatch(setLoadingGpcomplemento(true));
    try {
      await api.patch(
        `${urlComplementos}/${id}`,
        { pause: !sinc },
        {
          headers: {
            authorization: `bearer ${getTokenDashboard()}`,
          },
        },
      );

      await dispatch(carregaDadosDoGrupoComplemento(paginaAtual));
      dispatch(setLoadingGpcomplemento(false));
    } catch (err) {
      dispatch(setLoadingGpcomplemento(false));
      dispatch(
        abrirMensagem({
          open: true,
          tipo: TipoMensagem.ERRO,
          mensagem: trataExcecao(err),
        }),
      );
    }
  };
