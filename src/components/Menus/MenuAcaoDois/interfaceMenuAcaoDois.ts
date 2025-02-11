export interface MenuAcaoProps {
  isOpen: boolean;
  open?: any;
  handleOpen: () => void;
  nomeMenu?: string;
  isIconeCerto?: string;
  icon?: any;
  menuItens: any;
  corBackground?: any;
  onItemClick?: (...args: any) => void;
  isMenu?: boolean;
  isUser?: boolean
}
