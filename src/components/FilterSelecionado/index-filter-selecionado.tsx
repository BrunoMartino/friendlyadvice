import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { Filter } from './styles-filter-selecionado';

type FilterSelecionadoProps = {
  label: string | number;
  value: string | number | Date;
  removeFilter?: () => void;
  mobileBreak?: boolean;
  breakText?: boolean;
  icon?: any;
};

const FilterSelecionado: React.FC<FilterSelecionadoProps> = ({
  label,
  value,
  removeFilter,
  mobileBreak,
  breakText = false,
  icon,
}) => {
  return (
    <Filter breakText={breakText} mobileBreak={mobileBreak}>
      {label && <h2 className="filter-selected-label">{label}:</h2>}
      {icon && <h2 className="filter-selected-label">{icon}</h2>}
      <h2 className="filter-selected-value">{value}</h2>

      {removeFilter && (
        <span onClick={removeFilter} className="fitler-selected-icon">
          <AiOutlineClose />
        </span>
      )}
    </Filter>
  );
};

export default FilterSelecionado;
