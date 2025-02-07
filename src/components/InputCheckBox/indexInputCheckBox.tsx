import React from 'react';

import { Container } from './stylesInputCheckBox';

const InputCheckBox: React.FC = (props) => {
  return (
    <Container>
      <input type="checkbox" {...props} />
    </Container>
  );
};

export default InputCheckBox;
