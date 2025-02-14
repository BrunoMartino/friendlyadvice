export interface StyleProps {
  buttonSize?: number;
  fontSize?: string;
  inputWidth?: string;
}

interface Config {
  quantidade: number;
  fracionado?: boolean;
  onHandleChange(...args: any): void;
}

export interface Props extends StyleProps {
  config: Config;
  maxLength?: number;
  habilitar?: boolean;
  eventOnBlur?: any;
}
