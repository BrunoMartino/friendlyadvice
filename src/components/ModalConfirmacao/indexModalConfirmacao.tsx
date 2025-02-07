import React from 'react';
import {  Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  MModal,
  MModal_Header,
  MModal_Title,
  MModal_Footer,
  MModal_Button,
} from './stylesModalConfirmacao';
/* import './stylesModalConfirmacao.css'; */

const ModalConfirmacao: React.FC<any> = ({ children, handleClick, background, border}) => {
  const dispatch = useDispatch();
  const dadosModalConfirmacao = useSelector(
    (state: any) => state.session.dadosModalConfirmacao,
  );

  const handleClose = () => {
    dispatch({ type: 'SET_FECHARMODALCONFIRMACAO' });
  };

  return (
    <>
      <MModal
        className="modal"
        show={dadosModalConfirmacao.mostrar}
        onHide={handleClose}
      >
        <MModal_Header closeButton background={background} border={border}>
          <MModal_Title>
            <span className="mensagem">{dadosModalConfirmacao.mensagem}</span>
            <span className="mensagemAviso">{dadosModalConfirmacao.aviso}</span>
          </MModal_Title>
        </MModal_Header>

        {children && <Modal.Body>{children}</Modal.Body>}

        <MModal_Footer background={background} border={border}>
          <MModal_Button
            className="modalBtnCancel"
            variant="danger"
            onClick={
              dadosModalConfirmacao.handleCancelar
                ? dadosModalConfirmacao.handleCancelar
                : handleClose
            }
          >
            Cancelar
          </MModal_Button>
          <MModal_Button
            className="modalBtnSucess"
            style={{}}
            variant="success"
            onClick={
              dadosModalConfirmacao.handleConfirmar
                ? dadosModalConfirmacao.handleConfirmar
                : handleClick
            }
          >
            Confirmar
          </MModal_Button>
        </MModal_Footer>
      </MModal>
    </>
  );
};

export default ModalConfirmacao;
