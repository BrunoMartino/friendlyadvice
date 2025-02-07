export enum VendaItemStatus {
  ABERTO = 'ABERTO',
  PRODUCAO = 'PRODUCAO',
}

export enum TypeNotificacoes {
  cabecalho = 'notificacaoCabecalho',
  gerenciamento = 'telaGerenciamento',
}

export enum TypePaymentMethodMercadoPago {
  account_money = 'Mercado Pago',
  ticket = 'Boletos',
  bank_transfer = 'PIX',
  atm = 'ATM',
  credit_card = 'Cartão de Crédito',
  debit_card = 'Cartão de Débito',
  prepaid_card = 'Cartão Pré-Pago',
  digital_currency = 'Mercado Crédito',
  digital_wallet = 'Paypal',
  voucher_card = 'Benefícios Alelo/Sodexo',
  crypto_transfer = 'Criptomoedas',
}
