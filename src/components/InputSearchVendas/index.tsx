import React from 'react';

import { BiSearch } from 'react-icons/bi';
import { Input, Container } from './styled';

const InputSearchVendas: React.FC = () => {
  return (
    <Container>
      <div className="searchIconLocation">
        <BiSearch size="1.8rem" color="#BFBFBF" />
      </div>
      <Input placeholder="Localizar um pedido, número..." />
    </Container>
  );
};

export default InputSearchVendas;
