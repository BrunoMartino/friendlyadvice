import styled from 'styled-components';
import { Colors } from '../../utils/colorsAtualizada';

export const Container = styled.div`
  width: 100%;
  margin: 1.6rem 1.6rem 2.4rem 0;
`;

export const Main = styled.div`
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    align-items: center;
    display: flex;
  }

  p {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: ${Colors.componentes.LinkToBack.color};
  }
`;
