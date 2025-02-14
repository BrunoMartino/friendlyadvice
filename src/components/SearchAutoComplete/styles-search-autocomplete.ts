import styled from 'styled-components';
import {
  backgroundInpera,
  borderGrid,
  colorText,
} from '../../utils/colorsInpera';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
`;

export const ButtonSearch = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2.5rem;
  height: 2.7rem;

  border-top: ${borderGrid};
  border-bottom: ${borderGrid};
  border-right: ${borderGrid};

  background: ${backgroundInpera};
  cursor: pointer;

  svg {
    display: flex;
    align-self: center;
    justify-content: center;

    text-align: center;

    font-size: 1.8rem;
    color: ${colorText};
  }
`;
