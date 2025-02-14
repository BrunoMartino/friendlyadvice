import styled from 'styled-components';
import {
  backgroundGrid,
  backgroundInperaInput,
  borderInput,
  borderInputFocus,
  colorPlaceHolder,
  colorText,
} from '../../utils/colorsInpera';

interface propsInput {
  width?: string;
  alinhamento?: any;
  height?: any;
  marginTop?: any;
  resize?: any;
  disabled?: any;
}

export const Container = styled.div``;
export const TextArea = styled.textarea<propsInput>`
  display: flex;

  border: 0.15rem solid ${borderInput};
  background: ${backgroundInperaInput};
  color: ${colorText};

  font-size: 1.4rem;
  resize: ${(props: any) => (props.resize ? props.resize : 'none')};
  width: ${(props: any) => (props.width ? props.width : '100%')};
  height: ${(props: any) => (props.height ? props.height : '8rem')};

  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  text-align: ${(props: any) =>
    props.alinhamento ? props.alinhamento : 'start'};

  padding: 0.5rem;

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  cursor: text;
  margin-top: ${(props: any) => (props.marginTop ? props.marginTop : '0.5rem')};

  &:focus {
    border: 0.15rem solid ${borderInputFocus};
  }
  &placeholder {
    color: ${colorPlaceHolder};
  }
`;
