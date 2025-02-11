import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { TypeNotificacoes } from '../../../../../utils/enum';
import { getTokenDashboard, userIsLogged } from '../../../../../utils/fn';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const ENVIARAVISOS = '[AVISOS]ENVIARAVISOS';
export const ENVIARAVISOSLOTE = '[AVISOS]ENVIARAVISOSLOTE';
export const BUSCARTODOSAVISOS = '[AVISOS]BUSCARTODOSAVISOS';
export const ATUALIZARAVISOS = '[AVISOS]ATUALIZARAVISOS';
export const ATUALIZARAVISOS_LOTE = '[AVISOS]ATUALIZARAVISOS_LOTE';
export const DELETARMENSAGEM = '[AVISOS]DELETARMENSAGEM';
export const ABRIRFECHARMENU = '[AVISOS]ABRIRFECHARMENU';
export const ABRIRFECHARMENUMAISAVISOS = '[AVISOS]ABRIRFECHARMENUMAISAVISOS';
export const TOTALIZADORAVISOS = '[AVISOS]TOTALIZADORAVISOS';
export const ORDENARDATAS = '[AVISOS]ORDENARDATAS';

export const buscarTodosAvisos = () => async (dispatch: any) => {
  const token = localStorage.getItem('@INPERA:token');
  api.defaults.headers.authorization = `Bearer ${token}`;

  try {
    const { data } = await api.get(`api/v1/avisos`);
    if (data && data.avisos.rows) {
      dispatch({ type: BUSCARTODOSAVISOS, payload: data.avisos.rows });
    }
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

export const enviarAvisos = (objMessage: any) => async (dispatch: any) => {
  dispatch({
    type: ENVIARAVISOS,
    payload: objMessage,
  });

  dispatch({
    type: ORDENARDATAS,
  });
};

export const totalizadorAvisosNaoLidos = () => async (dispatch: any) => {
  const token = localStorage.getItem('@INPERA:token');
  const tokenAdm = localStorage.getItem('@INPERA:token_adm');

  try {
    if (
      (token && userIsLogged('@INPERA:token')) ||
      (tokenAdm && userIsLogged('@INPERA:token_adm'))
    ) {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const { data } = await api.get(`api/v1/avisos/totalnaolida`);

      dispatch({
        type: TOTALIZADORAVISOS,
        payload: parseInt(data.avisos.count),
      });
    }
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

export const buscarAvisos = () => async (dispatch: any) => {
  try {
    const token = localStorage.getItem('@INPERA:token');
    const tokenAdm = localStorage.getItem('@INPERA:token_adm');
    if (
      (tokenAdm && userIsLogged('@INPERA:token_adm')) ||
      (token && userIsLogged('@INPERA:token'))
    ) {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const { data } = await api.get(`api/v1/avisos?limit=10`);

      if (data && data.avisos.rows && data.avisos.rows.length > 0) {
        dispatch({ type: ENVIARAVISOSLOTE, payload: data.avisos.rows });
      }

      dispatch(totalizadorAvisosNaoLidos());
    }
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

export const apagarAviso = (id: any) => async (dispatch: any) => {
  dispatch({
    type: DELETARMENSAGEM,
    payload: id,
  });
};

export const atualizarAvisos = (objMessage: any) => async (dispatch: any) => {
  dispatch({
    type: ATUALIZARAVISOS,
    payload: objMessage,
  });
};

export const atualizarAvisosLOTE =
  (objMessage: any) => async (dispatch: any) => {
    dispatch({
      type: ATUALIZARAVISOS_LOTE,
      payload: objMessage,
    });
  };

export const atualizarAvisosBACKEND =
  (objMessage: any, history: any) => async (dispatch: any) => {
    try {
      const token = localStorage.getItem('@INPERA:token');
      const tokenAdm = localStorage.getItem('@INPERA:token_adm');
      if (
        (tokenAdm && userIsLogged('@INPERA:token_adm')) ||
        (token && userIsLogged('@INPERA:token'))
      ) {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
        await api.patch(`api/v1/avisos/${objMessage.id}`, {
          lida: objMessage.lida,
        });
      } else {
        if (history) {
          history.replace('/');
        }
      }
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

export const atualizarAvisosBACKENDLOTE =
  (objMessage: any, history: any) => async (dispatch: any) => {
    try {
      const token = localStorage.getItem('@INPERA:token');
      const tokenAdm = localStorage.getItem('@INPERA:token_adm');
      if (
        (tokenAdm && userIsLogged('@INPERA:token_adm')) ||
        (token && userIsLogged('@INPERA:token'))
      ) {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
        await api.patch(`api/v1/avisos`, {
          avisos: objMessage,
        });
      } else {
        if (history) {
          history.replace('/');
        }
      }
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

export const abrirFecharMenuAvisos = (state: boolean) => (dispatch: any) => {
  dispatch({
    type: ABRIRFECHARMENU,
    payload: state,
  });
};

export const abrirFecharMenuMaisAvisos =
  (state: boolean) => (dispatch: any) => {
    dispatch({
      type: ABRIRFECHARMENUMAISAVISOS,
      payload: state,
    });
  };

export const atualizarTodosAvisos =
  (novoStatus: boolean, type: TypeNotificacoes) =>
  async (dispatch: any, getState: any) => {
    const avisos = getState().session.avisosRetaguarda.data;
    const telaNotificacoes = getState().session.avisosRetaguarda.dataALL;
    let filterLidas = null;
    let objAPI: any = [];

    if (type === TypeNotificacoes.cabecalho) {
      if (avisos && avisos.length > 0) {
        filterLidas = avisos.filter((el: any) => el.lida === !novoStatus);
        if (filterLidas && filterLidas.length > 0) {
          for (let ld of filterLidas) {
            objAPI.push({
              id: ld.id,
              lida: novoStatus,
            });
          }
          dispatch(atualizarAvisosBACKENDLOTE(objAPI, null));
          dispatch(abrirFecharMenuMaisAvisos(false));

          dispatch(
            abrirMensagem({
              open: true,
              mensagem: 'Todas as notificações foram alteradas para "lidas".',
              tipo: TipoMensagem.INFO,
            }),
          );
        } else {
          dispatch(
            abrirMensagem({
              open: true,
              mensagem: 'Todas as notificações já foram marcadas como "lidas".',
              tipo: TipoMensagem.INFO,
            }),
          );
        }
      }
    } else if (type === TypeNotificacoes.gerenciamento) {
      if (telaNotificacoes && telaNotificacoes.length > 0) {
        filterLidas = telaNotificacoes.filter(
          (el: any) => el.lida === !novoStatus,
        );

        if (filterLidas && filterLidas.length > 0) {
          for (let ld of filterLidas) {
            objAPI.push({
              id: ld.id,
              lida: novoStatus,
            });
          }
          dispatch(atualizarAvisosBACKENDLOTE(objAPI, null));
          dispatch(abrirFecharMenuMaisAvisos(false));

          dispatch(
            abrirMensagem({
              open: true,
              mensagem: `Todas as notificações foram alteradas para "${
                novoStatus ? 'lidas' : 'não lidas'
              }".`,
              tipo: TipoMensagem.INFO,
            }),
          );
        } else {
          dispatch(
            abrirMensagem({
              open: true,
              mensagem: `Todas as notificações já se encontram marcadas como "${
                novoStatus ? 'lidas' : 'não lidas'
              }".`,
              tipo: TipoMensagem.ERRO,
            }),
          );
        }
      } else {
        dispatch(
          abrirMensagem({
            open: true,
            mensagem: `Nenhuma notificação marcada como "${
              novoStatus ? 'lida' : 'não lida'
            }" foi encontrada.`,
            tipo: TipoMensagem.INFO,
          }),
        );
      }
    }
  };
