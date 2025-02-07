import React from 'react';
import AcoesCadastro from '../../AcoesCadastro/indexAcoesCadastro';
import useWindowSize from '../../../hooks/useWindowSize';
import { ListItem } from './styles-grid-list-item-responsive';

interface IFieldsMedia {
  array: any;
  position: string;
  onclick?: any;
  textBreak?: boolean;
}

interface iGridListItem {
  id?: string;
  fields: any;
  fieldsMedia?: IFieldsMedia[] | null;
  templateColumns: string;
  templateColumnsMedia?: string;
  index?: number;
  checked?: boolean | undefined;
  onChange?: ({ ...args }) => void;
  valueCheck?: string | undefined;
  colorLine?: string;
  edicao?: ({ ...args }) => void;
  excluir?: ({ ...args }) => void;
  notActions?: boolean;
  maxWidth?: Array<number>;
  dontShowCheck?: boolean;
  onclick?: () => void;
  functionGrid?: () => void;
}

const GridListItem: React.FC<iGridListItem> = ({
  id,
  fields,
  fieldsMedia,
  templateColumns,
  templateColumnsMedia,
  index,
  checked,
  onChange,
  valueCheck,
  colorLine,
  edicao,
  excluir,
  notActions = false,
  maxWidth = [0],
  dontShowCheck = false,
  functionGrid,
  onclick,
}) => {
  const size = useWindowSize();
  return (
    <ListItem
      index={index}
      templateColumnsMedia={templateColumnsMedia}
      templateColumns={templateColumns}
      colorLine={colorLine}
      maxWidth={maxWidth}
      dontShowCheck={dontShowCheck}
    >
      <input
        type="checkbox"
        className="hidden-box"
        id={id}
        checked={checked}
        onChange={onChange}
        value={valueCheck}
      />

      <label
        htmlFor={id}
        onClick={functionGrid}
        className="check--label checkbox--show"
      >
        {!dontShowCheck && size.width! / 16 >= maxWidth![0] && (
          <span className="check--label-text-center">
            <div className="checkbox">
              <div className="checkbox-circle"></div>
              <svg width="2rem" height="2rem" viewBox="0 0 20 20">
                <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                <polyline points="4 11 8 15 16 6"></polyline>
              </svg>
            </div>
          </span>
        )}
        {size.width! / 16 >= maxWidth![0]
          ? fields &&
            fields.length > 0 &&
            fields.map((item: any, i: number) => (
              <span
                onClick={item.onclick}
                key={i}
                className={`check--label-text-${item.position} ${
                  item.textBreak ? 'text-break' : ''
                }`}
              >
                {item.array}
              </span>
            ))
          : size.width! / 16 <= maxWidth![0] &&
            fieldsMedia &&
            fieldsMedia.length > 0 &&
            fieldsMedia.map((item: any, i: number) => (
              <span
                onClick={item.onclick}
                key={i}
                className={`check--label-text-${item.position} ${
                  item.textBreak ? 'text-break' : ''
                }`}
              >
                {item.array}
              </span>
            ))}

        {/* {fieldsMedia} */}

        {!notActions && (
          <label htmlFor={''} className="actions">
            <AcoesCadastro
              backgroundColor="transparent"
              edicao={edicao}
              delete={excluir}
            />
          </label>
        )}
      </label>
    </ListItem>
  );
};

export default GridListItem;
