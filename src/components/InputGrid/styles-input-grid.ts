import styled from 'styled-components';
import { colorText } from '../../utils/colorsInpera';

interface FormControlProps {
  align?: string | undefined;
  heigth?: string | undefined;
}

export const Container = styled.div<FormControlProps>`
  display: flex;
  flex: 1;
  height: ${({ heigth }) => (heigth ? heigth : 'auto')};
  flex-direction: column;

  align-items: ${({ align }) => (align ? align : 'stretch')};

  span {
    font-weight: 600;
    color: ${colorText};
    font-size: 1.4rem;
  }
`;
