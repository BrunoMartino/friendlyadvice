import React from 'react';

import { Container } from './styles-input-grid';

interface IInputGrid {
  children: React.ReactNode;
}

const InputGrid: React.FC<IInputGrid> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default InputGrid;
