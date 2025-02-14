import styled from 'styled-components';
import {
  backgroundInperaInput,
  borderInput,
  colorText,
} from '../../utils/colorsInpera';

interface IInputDatePicker {
  width?: string;
  textAlign?: string;
  marginTop?: string;
}

export const Container = styled.div<IInputDatePicker>`
  .date-picker {
    width: ${({ width }) => (width ? width : '100%')};
    height: 2.7rem;
    background: ${backgroundInperaInput};
    border: 0.15rem solid ${borderInput};
    color: ${colorText};

    font-weight: 400;
    text-align: ${({ textAlign }) => (textAlign ? textAlign : 'start')};
    margin-top: ${({ marginTop }) => (marginTop ? marginTop : '0.5rem')};

    padding: 0 0.5rem;
    font-size: 1.4rem;
  }
`;
