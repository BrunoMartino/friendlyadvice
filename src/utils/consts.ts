export const isMobile =
  /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

export const isIpad = /iPad/i.test(navigator.userAgent);

export const maxInt4 = 2000000000;

export const animeted = 'animate__fadeInUp';

export const _mediaQuery = 850;
export const _mediaQueryGraficos = 1290;
export const _mediaQueryCadastros = 960;

export const TOTAL_ITENS_PAGINA = 10;
export const TOTAL_ITENS_PAGINA_GERENCIAMENTO = 31;

export const mensagemPadraoCancelamento =
  'Atenção: Suas alterações serão perdidas se você não as salvar!';

export const boxShadowDashboard = `none`;

export const clasFluxoCaixaObj: any = [
  {
    id: '7bd3c1d1-fd82-4962-9d87-500e008f429a',
    descricao: 'ATIVIDADES NÃO OPERACIONAIS',
  },
  {
    id: '5f1c678e-6d95-473c-831b-0ce360564e6e',
    descricao: 'DESPESAS FIXAS',
  },
  {
    id: 'b583c3f9-0f43-48d0-ae5a-3794d2c28638',
    descricao: 'DESPESAS VARÍAVEIS',
  },
  {
    id: 'd9706053-9b11-40ad-b982-543c749defdc',
    descricao: 'INVESTIMENTOS',
  },
  {
    id: '00acd8d8-317f-446e-a7a3-d8df6a472aa9',
    descricao: 'RECEITAS COM FATURAMENTO',
  },
  {
    id: '7eefe06a-339a-4f1f-bf14-88d290b1cfaa',
    descricao: 'SEM CLASSIFICAÇÃO',
  },
];

export const formPagFiscal: any = [
  {
    id: 'fa5c4706-3ef9-4025-9b8a-b93f53ac0524',
    codigo: 1,
    descricao: 'Dinheiro',
  },
  {
    id: '7439fbe4-e9d5-4925-9aa2-eda48cc48334',
    codigo: 2,
    descricao: 'Cheque',
  },
  {
    id: '14a17405-159c-4d4f-984d-a0d09d02b141',
    codigo: 3,
    descricao: 'Cartão de Crédito',
  },
  {
    id: 'f0778a7d-c209-4b50-8ba9-51628ce7dce6',
    codigo: 4,
    descricao: 'Cartão de Débito',
  },
  {
    id: '6742b70a-7f32-428d-bd5c-d9c4bb6f160d',
    codigo: 5,
    descricao: 'Crédito Loja',
  },
  {
    id: 'e5bd68c2-6043-4f42-8bfb-e3e5bcb4c591',
    codigo: 10,
    descricao: 'Vale Alimentação',
  },
  {
    id: 'c04e38b5-a0b1-4f85-a586-c6dcb95ebd1e',
    codigo: 11,
    descricao: 'Vale Refeição',
  },
  {
    id: '68e1fed6-44e1-4c19-9335-9698b6c17593',
    codigo: 12,
    descricao: 'Vale Presente',
  },
  {
    id: '39aa6d81-650a-4302-92ef-a54593068b27',
    codigo: 13,
    descricao: 'Vale Combustível',
  },
  {
    id: 'd91eb9c3-11c1-4653-9a21-1518446d4c3b',
    codigo: 14,
    descricao: 'Duplicata Mercantil',
  },
  {
    id: '12e0aa3d-3272-47a8-b0c9-5f005def4e3c',
    codigo: 15,
    descricao: 'Boleto Bancário',
  },
  {
    id: 'f413920d-383e-476e-af56-6eee28b4613e',
    codigo: 16,
    descricao: 'Depósito Bancário',
  },
  {
    id: '759691fe-c44c-4cbf-a079-8aabfc5dcefc',
    codigo: 17,
    descricao: 'Pagamento Instantâneo (PIX)',
  },
  {
    id: '45ee321d-b6e1-43c7-b1bb-78bc8a732e4b',
    codigo: 18,
    descricao: 'Transferência bancária, Carteira digital',
  },
  {
    id: '3e2fce45-025d-4477-897c-fd70604bcb4f',
    codigo: 19,
    descricao: 'Programa de fidelidade, Cashback, Crédito Virtual',
  },
  {
    id: '2a66f687-8a34-4404-96ad-bac5b117a191',
    codigo: 90,
    descricao: 'Sem pagamento',
  },
  {
    id: 'f16eb6b9-f9e3-48da-bb96-41fa0ef590bd',
    codigo: 99,
    descricao: 'Outros',
  },
];

export const cobrancasIntegracao = ['PAGUE PELO APP'];
export const cnpjEmpresaDev = '00254455000133';

export const bandeiras = [
  {
    id: '',
    descricao: '',
  },
  {
    id: 1,
    descricao: 'Visa',
  },
  {
    id: 2,
    descricao: 'MasterCard',
  },
  {
    id: 3,
    descricao: 'AmericanExpress',
  },
  {
    id: 4,
    descricao: 'Sorocred',
  },
  {
    id: 5,
    descricao: 'Diners Club',
  },
  {
    id: 6,
    descricao: 'Elo',
  },
  {
    id: 7,
    descricao: 'Hipercard',
  },
  {
    id: 8,
    descricao: 'Aura',
  },
  {
    id: 9,
    descricao: 'Cabal',
  },
  {
    id: 10,
    descricao: 'Alelo',
  },
  {
    id: 11,
    descricao: 'BanesCard',
  },
  {
    id: 12,
    descricao: 'CalCard',
  },
  {
    id: 13,
    descricao: 'Credz',
  },
  {
    id: 14,
    descricao: 'Discover',
  },
  {
    id: 15,
    descricao: 'GoodCard',
  },
  {
    id: 16,
    descricao: 'GreenCard',
  },
  {
    id: 17,
    descricao: 'Hiper',
  },
  {
    id: 18,
    descricao: 'JcB',
  },
  {
    id: 19,
    descricao: 'Mais',
  },
  {
    id: 20,
    descricao: 'MaxVan',
  },
  {
    id: 21,
    descricao: 'Policard',
  },
  {
    id: 22,
    descricao: 'RedeCompras',
  },
  {
    id: 23,
    descricao: 'Sodexo',
  },
  {
    id: 24,
    descricao: 'ValeCard',
  },
  {
    id: 25,
    descricao: 'Verocheque',
  },
  {
    id: 26,
    descricao: 'VR',
  },
  {
    id: 27,
    descricao: 'Ticket',
  },
  {
    id: 99,
    descricao: 'Outros',
  },
];
