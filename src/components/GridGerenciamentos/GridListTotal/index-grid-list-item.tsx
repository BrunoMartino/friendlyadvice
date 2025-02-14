import React from 'react';
import { ListItem } from './styles-grid-list-item';

interface iGridListItem {
  fields: any;
  templateColumns: string;
  startPosition?: number | null;
  isTotalGeral?: boolean;
  className?: any;
}

const GridListTotal: React.FC<iGridListItem> = ({
  fields,
  templateColumns,
  startPosition,
  isTotalGeral,
  className
}) => {
  const repeatVoid = [...Array(startPosition ? startPosition - 1 : 0)];
  return (
    <ListItem className={className} isTotalGeral={isTotalGeral} templateColumns={templateColumns}>
      <label className="check--label">
        <span className="check--label-text-void"></span>
        {startPosition &&
          repeatVoid.length > 0 &&
          repeatVoid.map((e: any, i: number) => (
            <span key={i} className="check--label-text-void"></span>
          ))}
        {fields}
      </label>
      <span className="check--label-text-void"></span>
    </ListItem>
  );
};

export default GridListTotal;
