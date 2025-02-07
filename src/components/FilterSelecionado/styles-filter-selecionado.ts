import styled from 'styled-components';
import { colorText } from '../../utils/colorsInpera';

interface IFilterSelected {
  mobileBreak?: boolean;
  breakText?: boolean;
}

export const Filter = styled.div<IFilterSelected>`
  display: flex;
  align-items: center;
  padding: 0.6rem;
  background-color: #d0944b60;
  border: 0.1rem solid #d0944b;
  @media (max-width: 575px) {
    width: ${(props) => (props.breakText ? '100%' : 'auto')};
  }

  .filter-selected-label {
    color: ${colorText};
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
  }

  .filter-selected-value {
    color: #000;
    margin: 0 0 0 0.5rem;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .fitler-selected-icon {
    display: flex;
    align-items: center;
    color: ${colorText};
    margin-left: 2rem;
    font-size: 1.6rem;
    cursor: pointer;
  }

  @media (max-width: 575px) {
    .filter-selected-label, .filter-selected-value {
      font-size: ${(props) => (props.breakText ? '1rem' : 'auto')};
    }
  }

  @media screen and (max-width: 21.875) {
    height: ${(props) => (props.mobileBreak ? '3rem' : null)};
  }
`;
