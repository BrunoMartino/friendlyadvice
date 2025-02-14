export enum TipoMensagem {
  SUCESSO = 'success',
  ERRO = 'error',
  INFO = 'info',
}

export enum TipoPosicao {
  TOP_CENTER = 'top_center',
  TOP_RIGHT = 'top_right',
  BOTTOM_RIGHT = 'bottom_right',
  BOTTOM_CENTER = 'bottom_center',
  BOTTOM_LEFT = 'bottom_left',
  TOP_LEFT = 'top_left',
}

export interface PropsAlert {
  open: boolean;
  mensagem: string;
  tipo: TipoMensagem;
  posicao?: TipoPosicao;
  personalTime?: number;
}
