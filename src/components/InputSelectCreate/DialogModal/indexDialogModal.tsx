import { Button } from '@material-ui/core';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { greenInpera, redInpera } from '../../../utils/colorsInpera';
import { validTokenAdministracao } from '../../../utils/fn';
import InputMascaras from '../../InputMascaras/indexInputMascara';

import {
  Container,
  ModalDialogTitle,
  ModalDialogContent,
  ModalDialogActions,
  ErrorPanel,
} from './stylesDialogModal';

interface DialogProps {
  handleClose: (...args: any) => void;
  handleSubmit: (...args: any) => void;
  valueModal?: any;
  descricao: string;
  setValueModal?: any;
  label?: string;
  maxLength?: any;
  width?: any;
  messageError?: any;
}

const DialogModal: React.FC<DialogProps> = ({ ...props }: DialogProps) => {
  const campoInicial: any = useRef<any>();
  const tokenAdm = validTokenAdministracao();

  const [send, setSend] = useState<any>(props.valueModal);
  const dispacth = useDispatch();

  useEffect(() => {
    if (campoInicial && campoInicial.current) {
      campoInicial.current.focus();
    }
  }, [campoInicial]);

  return (
    <Container>
      <form>
        <ModalDialogTitle id="form-dialog-title">
          Cadastre um novo {props.descricao}
        </ModalDialogTitle>
        <ModalDialogContent>
          <span className="titulo">
            {props.label ? props.label : 'Descrição *'}
          </span>
          <InputMascaras
            id="descricao"
            value={props.valueModal}
            onChange={(event: any) => {
              const { value } = event.target;

              props.setValueModal({ ...props.valueModal, descricao: value });
            }}
            type="text"
            maxLength={props.maxLength}
            tamanho={props.width ? props.width : '100%'}
            ref={campoInicial}
          />
          {props.valueModal === '' && (
            <ErrorPanel>
              <ul>
                <li>
                  {props.messageError
                    ? props.messageError
                    : 'Campo Descrição é obrigatório!'}
                </li>
              </ul>
            </ErrorPanel>
          )}
        </ModalDialogContent>
        <ModalDialogActions>
          <Button
            onClick={props.handleClose}
            style={{ backgroundColor: redInpera }}
          >
            Cancelar
          </Button>
          <Button
            onClick={(e: any) => {
              if (props.valueModal === '') {
                e.preventDefault();
              } else {
                props.handleSubmit();
                e.stopPropagation();
              }
            }}
            disabled={tokenAdm}
            type="button"
            className="sucess"
            style={{
              backgroundColor: greenInpera,
              opacity: props.valueModal === '' || tokenAdm ? 0.35 : 1,
            }}
          >
            Cadastrar
          </Button>
        </ModalDialogActions>
      </form>
    </Container>
  );
};

export default DialogModal;
