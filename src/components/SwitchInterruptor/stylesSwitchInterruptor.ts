import styled from 'styled-components';
import { backgroundInpera, colorWhite } from '../../utils/colorsInpera';

export const Container = styled.div`
  padding-left: 1rem;
  width: 16rem;
`;

export const Button = styled.button`
  border: none;
  outline: none;
  /* padding: 0.2rem; */
  width: 2rem;
  height: 2.2rem;
  border-radius: 0.5rem;
  background: ${backgroundInpera};
  margin-left: 0.2rem;
  margin-bottom: 0.2rem;
  cursor: pointer;

  svg {
    font-size: 1.6rem;
    color: ${colorWhite};
  }
`;
