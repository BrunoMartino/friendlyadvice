export interface ModalProps {
  visible: boolean;
  titleModal: string | null;
  onClose: () => void;
  item?: any;
}
