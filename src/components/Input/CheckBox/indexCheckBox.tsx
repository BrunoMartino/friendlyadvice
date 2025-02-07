import React, { useState } from 'react';

import { Container } from './stylesCheckBox';

const CheckBox: React.FC<any> = (props) => {
  const [checked, setChecked] = useState(false);

  const toggleCheck = () => {
    setChecked(!checked);
  };

  const checkedClass = checked ? 'checked' : '';
  const containerClassName = `checkbox ${checkedClass}`.trim();

  return (
    <Container>
      <div className={containerClassName} onClick={toggleCheck} />
    </Container>
  );
};

export default CheckBox;
