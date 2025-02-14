import React from 'react';
import useWindowSize from '../../../hooks/useWindowSize';
import { ListItem } from './styles-grid-list-item-responsive';

interface IFieldsMedia {
  array: any;
  position: string;
  onClick?: () => void;
  color?: string;
}

interface iGridListItem {
  fields: any;
  maxWidth?: Array<number>;
  templateColumns: string;
  templateColumnsMedia?: string;
  startPosition?: number | null;
  fieldsMedia?: IFieldsMedia[] | null;
  dontExistCheck?: boolean;
  isTotalGeral?: boolean;
  functionGrid?: () => void;
  clickeable?: boolean
}

const GridListTotal: React.FC<iGridListItem> = ({
  fields,
  fieldsMedia,
  templateColumns,
  templateColumnsMedia,
  startPosition,
  isTotalGeral,
  maxWidth = [0],
  dontExistCheck = false,
  clickeable = false,
  functionGrid,
}) => {
  const size = useWindowSize();
  const repeatVoid = [...Array(startPosition ? startPosition - 1 : 0)];
  return (
    <ListItem
      isTotalGeral={isTotalGeral}
      maxWidth={maxWidth}
      templateColumnsMedia={templateColumnsMedia}
      templateColumns={templateColumns}
      dontExistCheck={dontExistCheck}
      clickeable={clickeable}
    >
      <label className="check--label check--label-newTemplate" onClick={functionGrid}>
        {!dontExistCheck && size.width! / 16 >= maxWidth![0] && (
          <span className="check--label-text-void "></span>
        )}
        {startPosition &&
          repeatVoid.length > 0 &&
          repeatVoid.map((e: any, i: number) => (
            <span key={i} className="check--label-text-void"></span>
          ))}

        {size.width! / 16 >= maxWidth![0]
          ? fields &&
            fields.length > 0 &&
            fields.map((item: any, i: number) => (
              <span
                style={item.color ? { color: item.color } : {}}
                onClick={item.onClick}
                key={i}
                className={`check--label-text-${item.position}`}
              >
                {item.array === undefined ? '0' : item.array}
              </span>
            ))
          : size.width! / 16 <= maxWidth![0] &&
            fieldsMedia &&
            fieldsMedia.length > 0 &&
            fieldsMedia.map((item: any, i: number) => (
              <span
                style={item.color ? { color: item.color } : {}}
                onClick={item.onClick}
                key={i}
                className={`check--label-text-${item.position}`}
              >
                {item.array}
              </span>
            ))}

        {/* {fields} */}
      </label>
      <span className="check--label-text-void"></span>
    </ListItem>
  );
};

export default GridListTotal;
