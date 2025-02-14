
// REACT_APP_PAGBANK_API=https://sandbox.api.pagseguro.com
// REACT_APP_PAGBANK_TOKEN=B0D6F5067B964DB39D3A40D6924E1807
// REACT_APP_CLIENT_ID=cfa00045-8174-49d4-9017-84fbcaf4ce8e
// REACT_APP_CLIENT_SECRET=7db936fc-18fa-43d6-8dcb-aad48aad6a84
// REACT_APP_ACCOUNT_ID=ACCO_4D2F3C05-871D-4D76-A055-991C7D07754C

const api_uri = process.env.REACT_APP_PAGBANK_CONNECTION!;
const client_id = process.env.REACT_APP_CLIENT_ID!;

export const solicitarAutorizacao = () => {
  const redirect_uri = 'https://dash.tdpinformatica.com.br/cadastros/integracoes';

  const uri = `${api_uri}?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=checkout.create`
  return uri;
  // return `https://connect.sandbox.pagseguro.uol.com.br/oauth2/authorize?client_id=cfa00045-8174-49d4-9017-84fbcaf4ce8e&response_type=code&redirect_uri=https://dash.tdpinformatica.com.br/cadastros/integracoes&scope=checkout.create`;
};

