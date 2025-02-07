import React, { useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';
import Button from '../Button/button-componente';
import { Modal, ModalContainer } from './styles-modal-gerenciamento';

type ButtonProps = any & {
  filters: {};
  fields: any;
  handleApply: () => void;
  handleCancel: () => void;
  hasDisabled?: boolean;
};

const ModalFilters: React.FC<ButtonProps> = ({
  fields,
  handleApply,
  handleCancel,
  hasDisabled,
}) => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <Modal>
      <ModalContainer>
        <div className="modal-filters-header">
          <span className="modal-filters-icon">
            <FaFilter />
          </span>
          <h2 className="modal-filters-title">Filtros</h2>
        </div>

        <div className="line-separator" />

        <div className="modal-filters-content">{fields}</div>

        <div className="modal-filters-footer">
          <Button
            textColor="#C2213B"
            color="transparent"
            border="3px solid #C2213B"
            textShadow={'0rem transparent'}
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button
            textColor="#00A04A"
            color="transparent"
            border="3px solid #00A04A"
            textShadow={'0rem transparent'}
            onClick={handleApply}
          >
            Aplicar
          </Button>
        </div>
      </ModalContainer>
    </Modal>
  );
};

export default ModalFilters;
