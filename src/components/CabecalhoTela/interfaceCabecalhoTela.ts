export enum TipoCabecalho {
  LISTAGEM = 'listagem',
  CADASTRO = 'cadastro',
}

export interface iSelectConfig {
  data: any[];
  keyToSelect?: string;
}
export interface CabecalhoTelaProps {
  tipo: TipoCabecalho;
  icone: any;
  descricao: string;
  url?: string;
  origem?: string;
  useSave?: boolean;
  breakWidth?: number;
  handleGravar?: () => void;
  handleCancelar?: (e: any) => void;
  handleNovo?: () => void;
  handleRemove?: () => void;
  handleImpressao?: () => any;
  handlePesquisar?: () => void;
  handleVoltar?: () => void;
  hasPadding?: boolean;
  select?: iSelectConfig;
  disabled?: boolean;
  disabledVoltar?: boolean;
  valuePesquisado?: any;
  valorDiferenciado?: boolean;
  nameBtnCancel?: string;
  newBtnDisabled?: boolean;
  pesquisaPlaceholder?: string;
  selectPlaceholder?: string;
  cabecalhoOnly?: boolean;
  spaceTop?: number;
  hasMoreField?: boolean;
  newBtnInvisible?: boolean;
  descricaoSubTitle?: string;
  colorHeader?: any;
}
