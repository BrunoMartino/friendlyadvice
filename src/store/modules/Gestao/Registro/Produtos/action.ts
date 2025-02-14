import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const GRAVAR_PRODUTO_PRECADASTRO =
  '[PRODUTOS] GRAVAR_PRODUTO_PRECADASTRO';

export const GRAVAR_TOKEN_PRECADASTRO =
  '[PRODUTOS] GRAVAR_PRODUTO_E_TOKEN_PRECADASTRO';

export const LIMPAR_PRODUTO_E_TOKEN_PRECADASTRO =
  '[PRODUTOS] LIMPAR_PRODUTO_E_TOKEN_PRECADASTRO';

export const gravarDadosProdutosPreCadastro =
  (produtoSelecionado: {}, history: any) =>
  async (dispatch: any, getState: any) => {
    try {
      if (produtoSelecionado) {
        await dispatch({
          type: GRAVAR_PRODUTO_PRECADASTRO,
          payload: { produtoSelecionado },
        });
      }
      if (getState().session.preCadastro.isOrigemPreCadastro === 'cadastro') {
        history.replace('cadastro');
      } else {
        history.replace('/preCadastro');
      }
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

export const gravarTokenUsuarioPreProdutos =
  (token: string | null, history: any) => async (dispatch: any) => {
    try {
      if (token) {
        await dispatch({
          type: GRAVAR_TOKEN_PRECADASTRO,
          payload: { token },
        });
        history.push('/produtos');
      }
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

export const setLimparPreCadastroToken = () => ({
  type: LIMPAR_PRODUTO_E_TOKEN_PRECADASTRO,
});
