import React from 'react';
import { BiFilter } from 'react-icons/bi';

import { Button } from './styles-button-filter';

const ButtonFilter = (props: any) => {
  return (
    <Button {...props}>
      <span className="filter-button-icon">
        <BiFilter />
      </span>
      Alterar Filtros
    </Button>
  );
};

export default ButtonFilter;
