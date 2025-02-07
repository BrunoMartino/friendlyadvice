import React from 'react';
import AcoesCadastro from '../../../components/AcoesCadastro/indexAcoesCadastro';
import { ListItem } from './styles-grid-list-item';
import useWindowSize from '../../../hooks/useWindowSize';
import { GridEdit } from '../../Icons/GridEdit/grid-edit';
import { GridDeleteLine } from '../../Icons/GridDeleteLine/grid-delete-line';

interface iGridListItem {
  id?: string;
  fields: any;
  templateColumns: string;
  index?: number;
  checked?: boolean | undefined;
  onChange?: ({ ...args }) => void;
  valueCheck?: string | undefined;
  colorLine?: string;
  edicao?: ({ ...args }) => void;
  excluir?: ({ ...args }) => void;
  notActions?: boolean;
  menuItens?: any;
  moreMenuItens?: any;
  className?: string;
  disabledActions?: any;
  // innerComponent?: any
}

const GridListItem: React.FC<iGridListItem> = ({
  id,
  fields,
  templateColumns,
  index,
  checked,
  onChange,
  valueCheck,
  colorLine,
  edicao,
  excluir,
  menuItens,
  className,
  disabledActions = false,
  moreMenuItens = false,
  notActions = false,
  // innerComponent
}) => {
  const size = useWindowSize();

  return (
    <ListItem
      className={className}
      index={index}
      templateColumns={templateColumns}
      colorLine={colorLine}
    >
      <input
        type="checkbox"
        className="hidden-box"
        id={id}
        checked={checked}
        onChange={onChange}
        value={valueCheck}
      />
      <label htmlFor={id} className="check--label">
        {size.width! <= 828 && !notActions && (
          <label
            htmlFor={''}
            className="actions"
            style={{
              borderRight: '0.1rem solid #70788f',
              height: '100%',
              marginBottom: '0',
            }}
          >
            {!moreMenuItens ? (
              <AcoesCadastro
                backgroundColor="transparent"
                menuItens={[
                  {
                    open: edicao,
                    nome: 'Alterar',
                    icone: <GridEdit fill="#d0944b" />,
                  },
                ]}
              />
            ) : (
              <AcoesCadastro
                backgroundColor="transparent"
                menuItens={
                  disabledActions
                    ? [...menuItens]
                    : [
                        {
                          open: edicao,
                          nome: 'Alterar',
                          icone: <GridEdit fill="#d0944b" />,
                        },
                        {
                          open: excluir,
                          nome: 'Excluir',
                          icone: <GridDeleteLine fill="#d0944b" />,
                        },
                        ...menuItens,
                      ]
                }
              />
            )}
          </label>
        )}
        <span className="check--label-text-center">
          <div className="checkbox">
            <div className="checkbox-circle"></div>
            <svg width="2rem" height="2rem" viewBox="0 0 20 20">
              <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
              <polyline points="4 11 8 15 16 6"></polyline>
            </svg>
          </div>
        </span>
        {fields}
        {!notActions && size.width! > 828 && (
          <label htmlFor={''} className="actions">
            <AcoesCadastro
              backgroundColor="transparent"
              edicao={edicao}
              delete={excluir}
              menuItens={menuItens}
              // innerComponent={innerComponent}
            />
          </label>
        )}
      </label>
    </ListItem>
  );
};

export default GridListItem;
