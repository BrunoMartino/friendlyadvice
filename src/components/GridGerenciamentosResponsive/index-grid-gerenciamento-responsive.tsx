import React from 'react';
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from 'react-icons/ti';
import { Order } from '../../utils/fn';
import useWindowSize from '../../hooks/useWindowSize';
import { GridContainer } from './styles-grid-gerenciamentos-responsive';

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
  templateColumnsMedia?: string;
  gridHeaderMedia?: iGridHeader[] | null;
  maxWidth?: Array<number>;
  removeItem?: Array<string>;
  dontExistCheck?: boolean;
};

const GridGerenciamentos: React.FC<ListCaxiasProps> = ({
  gridHeader,
  gridContent,
  templateColumns,
  columnActions = false,
  templateColumnsMedia,
  gridHeaderMedia,
  maxWidth = [0],
  dontExistCheck = false,
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
      templateColumnsMedia={templateColumnsMedia}
      templateColumns={templateColumns}
      maxWidth={maxWidth}
      dontExistCheck={dontExistCheck}
    >
      <ul className="list">
        <li className="list-header">
          {/* <label className="check--header">
            <span className="check--label-text-center">#</span>
            {gridHeader &&
              gridHeader.length > 0 &&
              gridHeader.map((item: any, i: number) => (
                <span
                  key={i}
                  className={`check--label-text-${item.position}`}
                  onClick={item.onClick} */}
          <label className="check--header check--header-newTemplate">
            {!dontExistCheck && size.width! / 16 >= maxWidth![0] && (
              <span className="check--label-text-center">#</span>
            )}
            {size.width! / 16 >= maxWidth![0]
              ? gridHeader &&
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
                ))
              : size.width! / 16 <= maxWidth![0] &&
                gridHeaderMedia &&
                gridHeaderMedia.length > 0 &&
                gridHeaderMedia.map((item: any, i: number) => (
                  <span
                    key={i}
                    className={`check--label-text-${item.position}`}
                  >
                    {item.label}
                    {item.descOrder ? getIconOrder(item.descOrder) : null}
                  </span>
                ))}

            {/* {templateColumnsMedia && maxWidth && gridHeaderMedia &&
              gridHeaderMedia.length > 0 &&
              gridHeaderMedia.map((item: any, i: number) => (
                <span
                  key={i}
                  className={`check--label-text-${item.position} ${
                    item.display ? `check--label-display-${item.display}` : null
                  }`}
                >
                  {item.label}
                  {item.descOrder ? getIconOrder(item.descOrder) : null}
                </span>
              ))}

              ))}  */}
            {/* <span className="check--label-text-center">Ações</span>
             */}
            {!columnActions && (
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
