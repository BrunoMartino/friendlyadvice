export interface StyleProps {
  vetorTextoCorpo?: string[];
  textoCorpo?: string;
  titulo: string;
  textoBotao: string;
  tamanhoFonteTitulo?: string;
  tamanhoFonteCorpo?: string;
  tamanhoFonteBotao?: string;
  linkBotao?: string;
  corTextoCorpo?: string;
  corTextoTitulo?: string;
  corTextoBotao?: string;
  corBackgroud?: string;
  width?: string;
}

interface Config {
  openAlert: boolean;
  onHandleCloseAlert: any;
}

export interface Props extends StyleProps {
  config: Config;
}
