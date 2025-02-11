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

//condicional
export const CARREGA_CONDICIONAL = '[CONDICIONAL]CARREGAR';
export const CARREGA_CONDICIONAL_SELECIONADO =
  '[CONDICIONAL_SELECIONADO]CARREGAR';
export const GRAVA_CONDICIONAL = '[CONDICIONAL]GRAVA';
export const EDICAO_CONDICIONAL = '[CONDICIONAL]EDICAO';

//condicionalItens
export const ADD_NOVO_COMPLEMENTO_CONDICIONAL = '[CONDICIONAIS_ITENS]ADICIONAR';
export const UPDATE_COMPLEMENTO_CONDICIONA = '[CONDICIONAIS_ITENS]ALTERAR_ITEM';
export const CARREGA_ITEM_SELECIONADO = '[CONDICIONAIS_ITENS]CARREGAR';
export const CARREGA_CONDICIONAIS_ITENS = '[CONDICIONAIS_ITENS]CARREGAR_ITENS';
export const GRAVA_CONDICIONAL_ITENS = '[CONDICIONAIS_ITENS]GRAVAR';
export const EDICAO_CONDICIONAL_ITENS = '[CONDICIONAIS_ITENS]EDICAO';
export const UPDATE_COMPLEMENTO_CONDICIONAL_ITEM = '[CONDICIONAIS_ITENS]UPDATE';
export const SET_ALTERACAO_CONDICIONAL_ITEM = '[CONDICIONAIS_ITENS]ALTERAR';
export const REMOVE_CONDICIONAL_ITENS = '[CONDICIONAIS_ITENS]REMOVER';
export const LIMPA_CONDICIONAIS_ITENS = '[CONDICIONAIS_ITENS]LIMPAR';

export const ADD_NOVO_COMPLEMENTO = '[COMPLEMENTOS]ADICIONAR_CONDICIONAL';
export const CARREGA_COMPLEMENTO = '[COMPLEMENTOS]CARREGAR';
export const LIMPAR_DADOS_CONDICIONAIS = '[CONDICIONAIS]LIMPAR';

export const SET_DATA_CONDICIONAIS_ITENS = '[CONDICIONAL_ITENS]SET_DATA';
export const SET_PAGINA_ATUAL_CONDICIONAIS_ITENS =
  '[CONDICIONAL_ITENS]SET_PAGINA_ATUAL';
export const SET_LOADING_COMPLEMENTOS =
  '[CONDICIONAL_ITENS]SET_LOADING_COMPLEMENTOS';

export const urlCondicionais = '/api/v1/condicionais';
export const origemCondicionais = 'condicionais';

//condicional

export const condicionalSelecionado = (obj: any) => (dispatch: any) => {
  dispatch({ type: CARREGA_CONDICIONAL_SELECIONADO, payload: obj });
};

export const gravaCondicao = (obj: any) => {
  return {
    type: GRAVA_CONDICIONAL,
    payload: obj,
  };
};

export const carregarCondicional =
  (paginaAtual: any) => async (dispatch: any) => {
    try {
      dispatch(
        setDataPaginacao(
          `${urlCondicionais}`,
          paginaAtual - 1,
          `${origemCondicionais}`,
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

export const gravaNovaCondicao =
  (values: any, cb: any, setLoading: any) => async (dispatch: any) => {
    setLoading(true);
    try {
      if (values) {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

        const { data } = await api.post(`/api/v1/condicionais/`, {
          descricao: values.descricao,
          obrigatorio: values.obrigatorio,
          qtdMinima: values.qtdMinima,
          qtdMaxima: values.qtdMaxima,
          principal: values.principal,
        });

        cb({
          descricao: data.condicional.descricao,
          id: data.condicional.id,
          obrigatorio: data.condicional.obrigatorio,
          qtdMaxima: data.condicional.qtdMaxima,
          qtdMinima: data.condicional.qtdMinima,
          principal: data.condicional.principal,
          editar: true,
        });
        setLoading(false);
        dispatch(gravaCondicao(data.condicional));

        dispatch(
          abrirMensagem({
            open: true,
            mensagem: `Sucesso ao cadastrar o registro.`,
            tipo: TipoMensagem.SUCESSO,
          }),
        );
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

export const alteraCondicao =
  (values: any, id: any, setLoading: any) => async (dispatch: any) => {
    setLoading(true);
    try {
      if (id) {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

        const { data } = await api.patch(`${urlCondicionais}/${id}`, {
          descricao: values.descricao,
          obrigatorio: values.obrigatorio,
          qtdMinima: values.qtdMinima,
          qtdMaxima: values.qtdMaxima,
          principal: values.principal,
        });
        setLoading(false);
        dispatch(gravaCondicao(data.condicional));
        dispatch(condicionalSelecionado(data.condicional));
        dispatch(
          abrirMensagem({
            open: true,
            mensagem: `Sucesso ao editar o registro.`,
            tipo: TipoMensagem.SUCESSO,
          }),
        );
        dispatch(gravaCondicao(data.condicional));
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

//Condicional Item

export const carregaCondicionaisItens =
  () => async (dispatch: any, getState: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const id = getState().session.cadastroCondicional.condicionalItemAlterado;
      const idNew =
        getState().session.cadastroCondicional.novosCondicionais.condicional.id;

      const { data } = await api.get(
        `api/v1/condicionaisComplementos/condicional/${id || idNew}`,
      );

      if (
        data &&
        data.condicionaisComplementos &&
        data.condicionaisComplementos.rows &&
        data.condicionaisComplementos.rows.complementos &&
        data.condicionaisComplementos.rows.complementos.length > 0
      ) {
        dispatch({
          type: CARREGA_CONDICIONAIS_ITENS,
          payload: data.condicionaisComplementos.rows.complementos,
        });
      }

      dispatch(setDataCondicionaisItens(1));
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

export const condicionalItemSelecionado =
  (obj: any) => async (dispatch: any) => {
    dispatch({ type: CARREGA_ITEM_SELECIONADO, payload: obj });
  };

export const gravaNovoCondicionalItem =
  (values: any, actions: any, validCharacter: any) =>
  async (dispatch: any, getState: any) => {
    try {
      const idCondicionalSelecionado =
        getState().session.cadastroCondicional.condicionalItemAlterado;
      const idCondicionalNovo =
        getState().session.cadastroCondicional.novosCondicionais.condicional.id;

      if (values) {
        if (validCharacter === true) {
          api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

          const { data } = await api.post(`api/v1/condicionaisComplementos`, {
            idCondicionalItem: values.idCondicionalItem,
            idComplemento: values.idComplemento.id,
            valor: removerMascara(values.valor).replace(',', '.'),
            observacao: values.observacao,
            ativo: values.ativo,
          });

          dispatch({
            type: ADD_NOVO_COMPLEMENTO_CONDICIONAL,
            payload: {
              id: data.condicionalComplemento.id,
              idComplemento: data.condicionalComplemento.idComplemento,
              valor: data.condicionalComplemento.valor,
              observacao: data.condicionalComplemento.observacao || null,
              ativo: data.condicionalComplemento.ativo,
            },
          });

          dispatch(
            abrirMensagem({
              open: true,
              mensagem: `Sucesso ao cadastrar o registro.`,
              tipo: TipoMensagem.SUCESSO,
            }),
          );
          dispatch(
            setDataCondicionaisItens(
              getState().session.cadastroCondicional.pagina,
            ),
          );
          dispatch(limpaCondicionaisItens());
          actions.resetForm({
            values: {
              id: '',
              idCondicionalItem: idCondicionalSelecionado
                ? idCondicionalSelecionado
                : idCondicionalNovo
                ? idCondicionalNovo
                : '',
              idComplemento: {
                id: '',
                descricao: '',
                inputValue: '',
              },
              valor: '0,00',
              observacao: null,
              ativo: true,
              inputValue: '',
            },
          });
        } else {
          dispatch(
            abrirMensagem({
              open: true,
              mensagem: `${
                values.observacao
                  ? `O campo "Observação" contém palavras com mais de 29 caracteres, verifique o espaçamento, por favor!`
                  : ''
              } `,
              tipo: TipoMensagem.ERRO,
            }),
          );
        }
      }
    } catch (e) {
      if (actions) {
        actions.setSubmitting(false);
      }
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const alteraCondicionalItem =
  (id: any, values: any, actions: any, validCharacter: any) =>
  async (dispatch: any, getState: any) => {
    try {
      const idCondicionalSelecionado =
        getState().session.cadastroCondicional.condicionalItemAlterado;

      const idCondicionalNovo =
        getState().session.cadastroCondicional.novosCondicionais.condicional.id;

      if (id && id !== '') {
        if (validCharacter === true) {
          api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

          const { data } = await api.patch(
            `api/v1/condicionaisComplementos/${id}`,
            {
              idCondicionalItem: id,
              idComplemento: values.idComplemento.id,
              valor: removerMascara(values.valor).replace(',', '.'),
              observacao: values.observacao,
              ativo: values.ativo,
            },
          );
          dispatch({
            type: UPDATE_COMPLEMENTO_CONDICIONAL_ITEM,
            payload: {
              id: data.condicionalComplemento.id,
              idComplemento: data.condicionalComplemento.idComplemento,
              valor: data.condicionalComplemento.valor,
              observacao: data.condicionalComplemento.observacao || null,
              ativo: data.condicionalComplemento.ativo,
            },
          });

          dispatch(
            setDataCondicionaisItens(
              getState().session.cadastroCondicional.pagina,
            ),
          );
          dispatch(
            abrirMensagem({
              open: true,
              mensagem: `Sucesso ao editar o registro.`,
              tipo: TipoMensagem.SUCESSO,
            }),
          );
          dispatch(limpaCondicionaisItens());
          actions.resetForm({
            values: {
              id: '',
              idCondicionalItem:
                idCondicionalSelecionado && idCondicionalSelecionado !== ''
                  ? idCondicionalSelecionado
                  : idCondicionalNovo,
              idComplemento: {
                id: '',
                descricao: '',
                inputValue: '',
              },
              valor: '0,00',
              observacao: null,
              ativo: true,
              inputValue: '',
            },
          });
        } else {
          throw new Error(
            ` ${
              values.observacao
                ? `O campo "Observação" contém palavras com mais de 29 caracteres, verifique o espaçamento, por favor!`
                : ''
            }`,
          );
        }
      }
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

export const removeCondicionalItens =
  (idCondicionalItem: string) => async (dispatch: any, getState: any) => {
    try {
      await api.delete(
        `/api/v1/condicionaisComplementos/${idCondicionalItem}`,
        {
          headers: {
            authorization: `Bearer ${getTokenDashboard()}`,
          },
        },
      );
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: `Sucesso ao remover o Item do Condicional.`,
          tipo: TipoMensagem.SUCESSO,
        }),
      );

      dispatch({ type: REMOVE_CONDICIONAL_ITENS, payload: idCondicionalItem });
      dispatch(
        setDataCondicionaisItens(getState().session.cadastroCondicional.pagina),
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

export const setAlteracaoCondicionalItem = (id: string, clear = false) => {
  return {
    type: SET_ALTERACAO_CONDICIONAL_ITEM,
    payload: clear ? '' : id,
  };
};

export const limpaCondicionaisItens = () => {
  return { type: LIMPA_CONDICIONAIS_ITENS };
};

export const limparDadosCondicionais = () => async (dispatch: any) => {
  dispatch({ type: LIMPAR_DADOS_CONDICIONAIS });
};

//Complementos

export const carregaComplementos = () => async (dispatch: any) => {
  try {
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

    const { data } = await api.get(`api/v1/complementos`);

    if (!data || data.complementos.rows === 0) {
      throw new Error();
    }
    dispatch({
      type: CARREGA_COMPLEMENTO,
      payload: data.complementos.rows.map((el: any) => ({
        id: el.id,
        descricao: el.descricao,
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

export const gravaComplemento =
  (setFieldValue: any, values: any) => async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const { data } = await api.post(`api/v1/complementos`, {
        id: values.id,
        descricao: values.descricao,
      });

      dispatch({ type: ADD_NOVO_COMPLEMENTO, payload: data.complemento });

      dispatch(
        abrirMensagem({
          open: true,
          mensagem: `Sucesso ao cadastrar o registro.`,
          tipo: TipoMensagem.SUCESSO,
        }),
      );
      setFieldValue('idComplemento', {
        id: data.complemento.id,
        descricao: data.complemento.descricao.trim(),
        inputValue: '',
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
const ordenar = (a: any, b: any) => {
  if (a.descricao > b.descricao) return 1;
  if (a.descricao < b.descricao) return -1;
  return 0;
};

export const setPaginaAtualCondicionalItens = (pagina: number) => ({
  type: SET_PAGINA_ATUAL_CONDICIONAIS_ITENS,
  payload: pagina,
});

export const setDataCondicionaisItens =
  (pagina: number) => (dispatch: any, getState: any) => {
    const dados = Object.values(
      getState().session.cadastroCondicional.condicionaisItens,
    );
    const exibeDados = dados
      .slice(
        (pagina - 1) * TOTAL_ITENS_PAGINA,
        (pagina - 1) * TOTAL_ITENS_PAGINA + TOTAL_ITENS_PAGINA,
      )
      .sort(ordenar);
    dispatch(setPaginaAtualCondicionalItens(pagina));
    dispatch({ type: SET_DATA_CONDICIONAIS_ITENS, payload: exibeDados });
  };

export const orderUpComplemento =
  (id: string) => async (dispatch: any, getState: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.put(`api/v1/condicionaisComplementos/orderup/${id}`);

      // await dispatch(carregaCondicionalProduto());

      dispatch(setLoadingComplementos(true));
      await dispatch(carregaComplementos());
      await dispatch(carregaCondicionaisItens());
      dispatch(setLoadingComplementos(false));
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

export const orderDownComplemento =
  (id: string) => async (dispatch: any, getState: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      await api.put(`api/v1/condicionaisComplementos/orderdown/${id}`);

      // await dispatch(carregaCondicionalProduto());
      dispatch(setLoadingComplementos(true));
      await dispatch(carregaComplementos());
      await dispatch(carregaCondicionaisItens());
      dispatch(setLoadingComplementos(false));
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

export const setLoadingComplementos = (loading: boolean) => (dispatch: any) => {
  dispatch({ type: SET_LOADING_COMPLEMENTOS, payload: loading });
};

export const alteraObrigatorioCondicional =
  (id: string, sinc: boolean) => async (dispatch: any, getState: any) => {
    dispatch(setLoading(true));
    try {
      await api.patch(
        `${urlCondicionais}/${id}`,
        { obrigatorio: !sinc },
        {
          headers: {
            authorization: `bearer ${getTokenDashboard()}`,
          },
        },
      );
      const { paginaAtual, valorPesquisado } = getState().session.paginacao;
      await dispatch(
        setDataPaginacao(
          urlCondicionais,
          paginaAtual - 1,
          origemCondicionais,
          valorPesquisado,
          undefined,
          ETypePagination.CADASTROS,
        ),
      );
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


  export const alteraDisponibilidadeDoComplementoDoitemDoCondicional =
    (id: string, sinc: boolean) =>
    async (dispatch: any, getState: any) => {
      dispatch(setLoadingComplementos(true));
      try {

        await api.patch(
          `api/v1/condicionaisComplementos/${id}`,
          { ativo: !sinc },
          {
            headers: {
              authorization: `bearer ${getTokenDashboard()}`,
            },
          },
        );

        await dispatch(carregaComplementos());
        await dispatch(carregaCondicionaisItens());
            dispatch(setLoadingComplementos(false));
      } catch (err) {
            dispatch(setLoadingComplementos(false));
        dispatch(
          abrirMensagem({
            open: true,
            tipo: TipoMensagem.ERRO,
            mensagem: trataExcecao(err),
          }),
        );
      }
    };
