const trataExcecao = (error: any): string => {
  let excecao = '';
  
  if (error.response !== undefined) {
    switch (error.response.status) {
      case 400:
      case 404:
      case 401:
      case 403:
        excecao = error.response.data.error

        break;
      case 406:
        excecao = 'Não foi possível verificar os dados com a receita.';
        break;
      default:
        excecao = 'Erro inesperado, aguarde alguns minutos e tente novamente';
    }
  } else {
    if (error.message === 'invalid signature') {
      excecao = 'Assinatura do token está inválida.';
    } else if (error.message === 'Network Error') {
      excecao =
        'Não foi possível conectar com o servidor, aguarde e atualize a página!';
    } else {
      excecao = error.message;
    }
  }

  if (excecao.startsWith('Já existe um Fornecedor cadastrado com o') || excecao.startsWith('Já existe um fornecedor com o documento'))
    return 'Já existe um Fornecedor cadastrado com código, documento ou email informado, verifique por favor.'

  if (excecao === '"email" must be a valid email') return 'O e-mail cadastrado não é um válido'

  return excecao;
};

export default trataExcecao;