import React, { useEffect, useRef } from 'react';

import { Container, Input } from './stylesInputTimeDate';

const InputTimeDate: React.FC<any> = React.forwardRef(({ ...props} , ref) => {
  return (
    <Container>
      <Input inputMode={props.inputMode} ref={ref} {...props} />
    </Container>
  );
});

export default InputTimeDate;
