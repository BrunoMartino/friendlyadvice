import styled from 'styled-components';
import { backgroundInpera, colorBlack } from '../../utils/colorsInpera';

export const Button = styled.button`
  padding: 0 1rem;
  height: 3.5rem;
  background: ${backgroundInpera};
  color: ${colorBlack};
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  transition: 300ms ease-in-out;
  border: 0.1rem solid ${backgroundInpera};
  min-width: 13.5rem;

  .filter-button-icon {
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colorBlack};
    margin-right: 1rem;
    transition: 300ms ease-in-out;
  }
`;
