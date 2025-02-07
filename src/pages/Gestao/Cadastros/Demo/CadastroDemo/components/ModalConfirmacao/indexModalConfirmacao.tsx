import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Container, Body, Header } from './modalConfirmacaoStyle';
import { ButtonThemes } from '../../../../../../../components/Button/ButtonThemesEnum';
import Button from '../../../../../../../components/Button/button-componente';

export interface ModalConfirmacaoProps {
  onClose: () => void;
  registro: any;
  setRegistros: any;
}

const ModalConfirmacao: React.FC<ModalConfirmacaoProps> = ({
  onClose,
  registro,
  setRegistros,
}) => {
  return createPortal(
    <Container>
      <Header>
        <div className="text-area">
          <h1>Exclusão de item</h1>
          {/* <span></span> */}
        </div>
      </Header>
      <Body>
        <div className="content-body">
          <div className="input-area">
            <div>
              <span style={{ fontSize: '1.5rem' }}>
                Deseja realmente excluir o item selecionado?
              </span>
            </div>
          </div>
          <div className="button-area">
            <div>
              <Button
                theme={ButtonThemes.pdvCupom}
                onClick={() => {
                  setRegistros((prev: any[]) => {
                    const index = prev.findIndex(
                      (key: any) => key.codigo === registro.codigo,
                    );

                    if (index !== -1) {
                      const newData = [
                        ...prev.slice(0, index),
                        ...prev.slice(index + 1),
                      ];
                      return newData;
                    }
                    return prev;
                  });
                  onClose();
                }}
              >
                <p className="button-p">Sim</p>
              </Button>
            </div>
            <div>
              <Button
                theme={ButtonThemes.deleteButton}
                onClick={() => {
                  onClose();
                }}
              >
                <p className="button-p">Não</p>
              </Button>
            </div>
          </div>
        </div>
      </Body>
    </Container>,
    document.getElementById('root-portal') as HTMLElement,
  );
};

export default ModalConfirmacao;
