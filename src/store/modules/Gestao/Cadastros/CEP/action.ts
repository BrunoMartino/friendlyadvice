export const urlCEP = '/api/v1/cep';
export const origemCEP = 'ceps';

export const EDICAO_CEP = '[CEP]EDICAO';
export const LIMPAR_DADOS_CEP = '[CEP]LIMPAR';

export const cepSelecionadoEdicao = (obj: any) => async (dispatch: any) => {
  dispatch({ type: EDICAO_CEP, payload: obj });
};

export const limparDadosCEP = () => async (dispatch: any) => {
  dispatch({ type: LIMPAR_DADOS_CEP });
};
