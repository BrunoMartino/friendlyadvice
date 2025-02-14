import styled from 'styled-components';
import { _mediaQuery } from '../../../utils/consts';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  width: 100%;
  padding: 0.8rem 0;
`;

export const ContainerBox = styled.div`
  display: flex;
  flex-flow: row;

  @media (max-width: ${_mediaQuery}px) {
    flex-flow: row wrap;
  }
`;
