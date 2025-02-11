import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const SET_PRE_CADASTRO = '[PRECADASTRO]GRAVARDADOS';
export const SET_LIMPAR_DADOS_PRE_CADASTRO = '[PRECADASTRO]LIMPARDADOS';
export const SET_ORIGEM_PRE_CADASTRO = '[PRECADASTRO] SET_ORIGEM_PRE_CADASTRO';
export const SAVE_DATA_CADASTRO = '[PRECADASTRO] SAVE_DATA_CADASTRO';
interface iPreCadastro {
  email: string;
  telefone: string;
}

export const gravarPreCadastro =
  (
    camposPreCadastro: iPreCadastro,
    history: any,
    cbLoading: any,
    tokenRevendaQuery: any,
  ) =>
  async (dispatch: any) => {
    try {
      cbLoading(true);
      const { data } = await api.post('/api/precadastro', {
        email: camposPreCadastro.email,
        revenda: tokenRevendaQuery ? true : false,
        telefone: camposPreCadastro.telefone,
      });

      dispatch({
        type: SET_PRE_CADASTRO,
        payload: { ...data.preCadastro, telefone: camposPreCadastro.telefone },
      });

      history.push(
        `/cadastro${tokenRevendaQuery ? `?token=${tokenRevendaQuery}` : ''}`,
      );

      cbLoading(false);
    } catch (err) {
      cbLoading(false);
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(err),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const alterarPreCadastro =
  (id: any, objPatch: any) => async (dispatch: any) => {
    try {
      await api.patch(`/api/precadastro/${id}`, {
        ...objPatch,
      });
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

export const limpaDadosPreCadastro = () => (dispatch: any) => {
  dispatch({ type: SET_LIMPAR_DADOS_PRE_CADASTRO });
};

export const setOrigemPreCadastro = (path: string) => (dispatch: any) => {
  dispatch({ type: SET_ORIGEM_PRE_CADASTRO, payload: path });
};

export const salvarDadosDoCadastro = (values: any) => (dispatch: any) => {
  dispatch({
    type: SAVE_DATA_CADASTRO,
    payload: { salvarDadosDoCadastro: values },
  });
};


