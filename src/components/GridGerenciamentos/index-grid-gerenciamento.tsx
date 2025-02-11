import React from 'react';
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from 'react-icons/ti';
import { Order } from '../../utils/fn';
import { GridContainer } from './styles-grid-gerenciamentos';
import useWindowSize from '../../hooks/useWindowSize';

interface iGridHeader {
  label: string;
  position: string;
  onClick?: ({ ...args }) => void;
  descOrder?: string;
}

type ListCaxiasProps = {
  gridHeader?: iGridHeader[] | null;
  gridContent?: any;
  templateColumns: string;
  columnActions?: boolean;
  overflow?: boolean;
  gridCaixas?: boolean;
  className?: any;
};

const GridGerenciamentos: React.FC<ListCaxiasProps> = ({
  gridHeader,
  gridContent,
  templateColumns,
  className,
  overflow = false,
  columnActions = true,
  gridCaixas = true,
}) => {
  const getIconOrder = (value: any) => {
    switch (value.status) {
      case Order.NULL:
        return <TiArrowUnsorted />;
      case Order.ASC:
        return <TiArrowSortedUp />;
      case Order.DESC:
        return <TiArrowSortedDown />;
    }
  };

  const size = useWindowSize();

  return (
    <GridContainer
      className={className}
      gridCaixas={gridCaixas}
      overflow={overflow}
      templateColumns={templateColumns}
    >
      <ul className="list">
        <li className="list-header">
          <label className="check--header">
            {columnActions && size.width! <= 828 && (
              <span className="check--label-text-center">Ações</span>
            )}
            <span className="check--label-text-center">#</span>
            {gridHeader &&
              gridHeader.length > 0 &&
              gridHeader.map((item: any, i: number) => (
                <span
                  key={i}
                  className={`check--label-text-${item.position}`}
                  onClick={item.onClick}
                >
                  {item.label}
                  {item.descOrder ? getIconOrder(item.descOrder) : null}
                </span>
              ))}
            {columnActions && size.width! > 828 && (
              <span className="check--label-text-center">Ações</span>
            )}
          </label>
        </li>

        {gridContent}
      </ul>
    </GridContainer>
  );
};

export default GridGerenciamentos;
