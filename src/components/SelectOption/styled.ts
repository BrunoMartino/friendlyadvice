import styled, { css } from 'styled-components';
import {
  backgroundInperaInput,
  colorText,
  borderInput,
  backgroundInpera10,
} from '../../utils/colorsInpera';
import { Colors } from '../../utils/colorsAtualizada';

interface ISelect {
  theme?: string;
}

export const Select = styled.select<ISelect>`
  height: 2.7rem;
  width: 100%;
  color: ${colorText};
  background-color: ${backgroundInperaInput};
  font-size: 1.4rem;
  border: 0.15rem solid ${borderInput};

  &:hover {
    background-color: #fff;
  }

  ${({ theme }) =>
    theme === 'selectPdv' &&
    css`
      padding: 2rem;
      background-color: #ebe8e4;
      border: none;
      border-radius: 0.6rem;

      &:hover {
        border: 0.1rem double ${Colors.DeliveryColors.yellowColor20} !important;
        background-color: #ebe8e4;
      }
    `}
`;
