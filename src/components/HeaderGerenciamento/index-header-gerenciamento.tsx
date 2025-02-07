import React from 'react';
import {
  ContainerHeader,
  RigthSide,
  LeftSide,
} from './styles-header-gerenciamento';

interface IHeaderGerenciamento {
  icone?: React.ReactNode;
  titulo: string | undefined;
  buttonActions?: boolean;
  handleCancelar?: ({ ...args }) => void;
  handleConfirmar?: ({ ...args }) => void;
  disabled?: boolean;
  nameBtnCancel?: string;
  nameBtnSave?: string;
}

const HeaderGerenciamento: React.FC<IHeaderGerenciamento> = (
  props: IHeaderGerenciamento,
) => {
  return (
    <ContainerHeader>
      <RigthSide>
        <span className="iconTitle">{props.icone}</span>
        <h1 className="titleText">{props.titulo}</h1>
      </RigthSide>
      {props.buttonActions && (
        <LeftSide>
          <button
            type="button"
            onClick={props.handleCancelar}
            className="btn-cancel"
          >
            {props.nameBtnCancel ? props.nameBtnCancel : 'CANCELAR'}
          </button>
          <button
            onClick={props.handleConfirmar}
            className="btn-save"
            disabled={props.disabled ? props.disabled : false}
            style={{ opacity: props.disabled ? 0.35 : 1 }}
            type="submit"
          >
            {props.nameBtnSave ? props.nameBtnSave : 'CONFIRMAR'}
          </button>
        </LeftSide>
      )}
    </ContainerHeader>
  );
};

export default HeaderGerenciamento;
