export enum ETypePagination {
  CADASTROS = 'cadastros',
  GERENCIAMENTOS = 'gerenciamentos',
}

export interface PaginacaoProps {
  url?: string;
  origem?: string;
  origemInterna?: any;
  order?: any;
  valorPesquisado?: any;
  totalItens?: any;
  dados?: any;
  clearCheckedItemList?: any;
  typePagination?: ETypePagination;
  atualiza?: boolean;
}
