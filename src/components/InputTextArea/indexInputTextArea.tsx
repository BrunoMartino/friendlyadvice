import React from 'react';

import { Container, TextArea } from './stylesInputTextArea';

const InputTextArea: React.FC<any> = React.forwardRef((props, ref) => {
  return (
    <Container>
      <TextArea {...props} ref={ref} />
    </Container>
  );
});

export default InputTextArea;
