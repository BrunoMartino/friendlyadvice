import React, { ButtonHTMLAttributes } from 'react';
import {
  TrashIcon2,

} from '../Icons/TrashIcon2/trash-icon';

import { Button, Container } from './styles-buttonDeleteSelect-componente';

type IButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  select?: number;
  functionDelete: (args: {}[]) => void;
};

const ButtonDeleteOnSelect: React.FC<IButton> = ({
  select,
  functionDelete,
  ...rest
}) => {

  const getter = document.querySelectorAll('.check-input:checked');
  const i = Array.from(getter.values());

  let obj: {}[] = [];

  return (
    <Container>
      <Button
        {...rest}
        onClick={() => {
          if (i.length > 0) {
            for (let index in i) {
              let obj2 = new Map();
              obj2.set('id', i[index].getAttributeNode('value')?.value);
              obj.push({ id: obj2.get('id') });
            }
            functionDelete(obj);
          }
        }}
        selectCheck={select && select > 0 ? true : false}
      >
        <TrashIcon2 fill="#2E2B2C" height="2rem" width="2rem" />

        {select && select > 0 ? `Excluir(${i.length})` : ''}
      </Button>
    </Container>
  );
};

export default ButtonDeleteOnSelect;
