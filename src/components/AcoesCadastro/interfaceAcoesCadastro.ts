export interface AcoesProps {
  edicao?: (...args: any) => any;
  delete?: (...args: any) => any;
  order?: (...args: any) => any;
  // menuItens?: (...args: any) => any;
  menuItens?: AcoesItensProps[];
  tipo?: any;
  disabled?: boolean;
  disabledEditAndDelete?: boolean;
  precoDiferenciado?: any;
  backgroundColor?: string;
  isFirst?: boolean;
  breakWidth?: number;
  enabledActions?: boolean;
  // innerComponent?: any;
  isAbsolute?: boolean;
}

export interface AcoesItensProps {
  nome: string;
  icone: any;
  open: any;
  desabilitar?: boolean;
}
