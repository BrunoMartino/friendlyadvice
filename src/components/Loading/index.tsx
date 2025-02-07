import React from 'react';
import { Container, Spinner } from './styles';

interface IProps {
  color?: string;
}

const Loading: React.FC<IProps> = ({ ...rest }) => (
  <Container>
    <Spinner />
  </Container>

  // <Spinner
  //   animation="border"
  //   role="status"
  //   style={{ zIndex: 110000, color: rest.color ? rest.color : 'orange' }}
  // />
);

export default Loading;
