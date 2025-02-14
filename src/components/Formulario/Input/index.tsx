import React from 'react';

import { Container, ContainerInput } from '../../Containers/containerInputs';

const Input: React.FC<any> = React.forwardRef((props, ref) => {
  return (
    <Container>
      <ContainerInput {...props} ref={ref}></ContainerInput>
    </Container>
  );
});

export default Input;
