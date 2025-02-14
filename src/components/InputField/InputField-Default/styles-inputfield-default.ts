import styled from 'styled-components';
import InputMask from 'react-input-mask';
import { Colors } from '../../../utils/colorsAtualizada';

interface iInputDefault {
  error?: boolean;
  disabled?: boolean;
  width?: string;
  textalign?: string;
}

export const InputDefault = styled(InputMask)<iInputDefault>`
  --text-align: ${({ textalign }) => (textalign ? textalign : 'left')};


  position: relative;
  padding: 0.8rem 0.8rem;
  border: none;
  border-radius: 0.5rem;
  color: #2e2b2c;
  background-color: transparent;
  font-size: 1.5rem;
  width: 100%;
  text-align: var(--text-align);

&:disabled{
  color: ${Colors.TextColors.textGray10};
  opacity: 0.5;
}

  &::placeholder {
    color: #564f5280;
  }

  &:-webkit-autofill {
    -webkit-background-clip: text;
  }
`;
