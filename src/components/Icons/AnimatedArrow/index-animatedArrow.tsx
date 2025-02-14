import React from 'react';
import { Container } from './styled';

interface IProps {
  transform: 'vertical' | 'horizontal';
  onClick?: (...args: any) => void;
}

export const AnimatedArrow = ({ transform, onClick }: IProps) => {
  return (
    <Container transform={transform} onClick={onClick}>
      <span></span>
      <span></span>
      {/* <span></span> */}
    </Container>
  );
};
