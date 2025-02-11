import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { abrirMensagem } from '../../../Components/SnackBar/action';

export const urlLocalizacao = '/api/v1/localizacoes';
export const origemLocalizacao = 'localizacoes';

export const EDICAO_LOCALIZACAO = '[LOCALIZACAO]EDICAO';
export const LIMPAR_DADOS_LOCALIZACAO = '[LOCALIZACAO]LIMPAR';

export const localizacaoSelecionadaEdicao =
  (obj: any) => async (dispatch: any) => {
    try {
      dispatch({ type: EDICAO_LOCALIZACAO, payload: obj });
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

export const limparDadosLocalizacao = () => async (dispatch: any) => {
  try {
    dispatch({ type: LIMPAR_DADOS_LOCALIZACAO });
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
