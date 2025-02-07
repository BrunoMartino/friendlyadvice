import { ReactElement } from "react";

export interface ModalProps {
  visible: boolean;
  titleModal: string | null;
  onClose: () => void;
  children?: ReactElement;
}
