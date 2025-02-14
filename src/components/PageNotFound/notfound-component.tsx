import React from 'react';
import { backgroundInpera45 } from '../../utils/colorsInpera';
import { NotFoundIcon } from '../Icons/NotFound/not-found';

import { Container } from './notfound-styles';

const PageNotFound: React.FC = () => {
  return (
    <Container>
      <NotFoundIcon fill={backgroundInpera45} width={'4rem'} height={'4rem'} />
      <h1>Registro Não Encontrado!</h1>
    </Container>
  );
};

export default PageNotFound;
