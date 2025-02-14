import React from 'react';
import { Container, ContainerInput } from '../../Containers/containerInputs';

const InputTelefone: React.FC<any> = (props) => {
  return (
    <Container>
      <ContainerInput {...props} />
    </Container>
  );
};

export default InputTelefone;
