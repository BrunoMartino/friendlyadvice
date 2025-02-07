import React from 'react';
import { ArrowLeft } from '../Icons/ArrowLeft/ArrowLeft';
import { Colors } from '../../utils/colorsAtualizada';
import { Container, Main } from './styles-linkToBack-componente';

interface IPropsLinkToBack {
  href: string;
  text: string;
}

const LinkToBack: React.FC<IPropsLinkToBack> = ({ text, href = '/' }) => {
  return (
    <Container>
      <Main>
        <a href={href}>
          <span>
            <ArrowLeft
              width="2.4rem"
              height="2.4rem"
              fill={Colors.componentes.LinkToBack.fillIcon}
            />
          </span>
          <p>{text}</p>
        </a>
      </Main>
    </Container>
  );
};

export default LinkToBack;
