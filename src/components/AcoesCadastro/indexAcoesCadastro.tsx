import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { backgroundInpera, colorText } from '../../utils/colorsInpera';
import {
  checkTokenRenderiza,
  userIsLogged,
  validTokenAdministracao,
} from '../../utils/fn';
import { GridEdit } from '../Icons/GridEdit/grid-edit';
import { GridDeleteLine } from '../Icons/GridDeleteLine/grid-delete-line';

import { GridThreeDotsVertical } from '../Icons/GridThreeDotsVertical/grid-three-dots-vertical';
import { Container } from './stylesAcoesCadastro';
import { AcoesItensProps, AcoesProps } from './interfaceAcoesCadastro';
import { useHistory } from 'react-router-dom';
import { BiMoveVertical } from 'react-icons/bi';
import { useDetectOS } from '../../hooks/use-detect-os';

const AcoesCadastro: React.FC<AcoesProps> = ({ enabledActions = true, ...props }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tokenAdm = validTokenAdministracao();

  const system = useDetectOS();

  const integracaoFacilite = useSelector(
    (state: any) => state.global.empresaAdmin.integracaoFacilite,
  );
  const rowToChangeOrder = useSelector(
    (state: any) => state.session.paginacao.toChangeOrder,
  );
  const validaToken = (): Boolean => {
    if (userIsLogged('@INPERA:token_adm') || userIsLogged('@INPERA:token')) {
      return true;
    } else {
      return false;
    }
  };

  const validDelete = (): Boolean => {
    if (validaToken()) {
      if (
        props.delete &&
        !props.disabled &&
        !props.disabledEditAndDelete &&
        !tokenAdm &&
        !props.precoDiferenciado
      ) {
        return true;
      }
    }
    return false;
  };

  const validEdit = (): Boolean => {
    if (validaToken()) {
      if (
        (props.edicao && !props.disabled && !props.disabledEditAndDelete) ||
        (props.edicao &&
          props.precoDiferenciado &&
          !props.disabled &&
          !props.disabledEditAndDelete)
      ) {
        return true;
      }
    }
    return false;
  };

  const validOrder = (): Boolean => {
    if (validaToken()) {
      if (
        props.delete &&
        !props.disabled &&
        !tokenAdm &&
        !props.precoDiferenciado
      ) {
        return true;
      }
    }
    return false;
  };

  const validOptions = (): Boolean => {
    if (validaToken() && enabledActions) {
      if (
        (props.menuItens && !props.precoDiferenciado && !integracaoFacilite) ||
        (props.menuItens && integracaoFacilite && !props.precoDiferenciado)
      ) {
        return true;
      }
    }
    return false;
  };

  const validMenus = (): Boolean => {
    if (validaToken() && enabledActions) {
      if (
        (!props.disabled && !props.precoDiferenciado && !integracaoFacilite) ||
        (!props.disabled && integracaoFacilite && !props.precoDiferenciado)
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <Container
      breakWidth={props.breakWidth ? props.breakWidth : 827}
      backgroundColor={props.backgroundColor}
      desabilitar={true}
      system={system}
    >
      <span
        id="edit"
        className="opcoes"
        style={{ cursor: validEdit() ? 'pointer' : 'auto' }}
      >
        {validEdit() ? (
          <GridEdit
            onClick={() => {
              if (checkTokenRenderiza(dispatch, history)) props.edicao!();
            }}
            fillOpacity={1}
          />
        ) : (
          <GridEdit fillOpacity={0.3} />
        )}
      </span>
      <span
        id="delete"
        className="opcoes"
        style={{ cursor: validDelete() ? 'pointer' : 'auto' }}
      >
        {validDelete() ? (
          <GridDeleteLine
            onClick={() => {
              if (checkTokenRenderiza(dispatch, history)) props.delete!();
            }}
            fillOpacity={1}
          />
        ) : (
          <GridDeleteLine fillOpacity={0.3} />
        )}
      </span>

      {props.order && (
        <span
          id="order"
          className="opcoes"
          style={{ cursor: validOrder() ? 'pointer' : 'auto' }}
        >
          {validOrder() ? (
            <BiMoveVertical
              fill={rowToChangeOrder ? backgroundInpera : colorText}
              onClick={() => {
                if (checkTokenRenderiza(dispatch, history)) props.order!();
              }}
              fillOpacity={1}
            />
          ) : (
            <BiMoveVertical fillOpacity={0.3} />
          )}
        </span>
      )}

      <span id="menu" className="opcoes">
        <Dropdown>
          <Dropdown.Toggle
            variant={backgroundInpera}
            id="dropdown-basic"
            style={{ cursor: validOptions() ? 'pointer' : 'auto' }}
          >
            {validOptions() ? (
              <GridThreeDotsVertical fillOpacity={1} />
            ) : (
              <GridThreeDotsVertical fillOpacity={0.3} />
            )}
          </Dropdown.Toggle>

          {validMenus() ? (
            props.menuItens &&
            props.menuItens.length > 0 && (
              <>
                <Dropdown.Menu>
                  {props.menuItens.map(
                    (item: AcoesItensProps, index: number) => {
                      return (
                        <Dropdown.Item
                          className={item.desabilitar ? 'desativado' : ''}
                          key={index}
                          onClick={() => {
                            if (checkTokenRenderiza(dispatch, history))
                              item.open();
                          }}
                          disabled={item.desabilitar}
                        >
                          {item.icone}
                          {item.nome}
                        </Dropdown.Item>
                      );
                    },
                  )}
                </Dropdown.Menu>
              </>
            )
          ) : (
            <Dropdown.Menu
              style={{
                display: 'none',
              }}
            />
          )}
        </Dropdown>
      </span>
    </Container>
  );
};

export default AcoesCadastro;
