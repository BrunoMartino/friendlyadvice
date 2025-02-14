import styled, { css } from 'styled-components';
import InputMask from 'react-input-mask';
import {
  backgroundInperaInput,
  borderInput,
  borderInputFocus,
  colorPlaceHolder,
  colorText,
} from '../../utils/colorsInpera';

interface propsInput {
  tamanho?: any;
  align?: string;
  disabled?: any;
  onFocus?: boolean;
  borderEmptyInput?: boolean;
}
export const Container = styled.div``;

export const Input = styled(InputMask)<propsInput>`
  width: ${(props: any) => (props.tamanho ? props.tamanho : '25rem')};
  height: 2.7rem;
  background: ${backgroundInperaInput};
  border: 0.15rem solid ${borderInput};
  color: ${colorText};
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  padding: 0.5rem;
  font-size: 1.4rem;
  text-align: ${({ align }) => (align ? align : 'left')};
  margin-top: ${(props: any) => (props.marginTop ? props.marginTop : '0.5rem')};

  ${({ onFocus, borderEmptyInput }) =>
      (onFocus && borderEmptyInput) &&
      css`
        border: ${(props: any) => (props.value ? '0.15rem solid ${borderInput}' : '0.15rem solid #c53030')};
      `
    }

  @media (max-width: 433px) {
    max-width: 100vw;
    width: calc(98vw / 2.07);
    margin: 0 auto;
    font-size: 1.6rem;
  }

  @media (min-width: 434px) and (max-width: 592px) {
    width: calc(98vw / 2.04);
    font-size: 1.6rem;
  }

  @media (min-width: 592px) and (max-width: 782px) {
    width: calc(98vw / 2.03);
    font-size: 1.6rem;
  }

  @media (min-width: 783px) and (max-width: 927px) {
    width: calc(98vw / 2.02);
    font-size: 1.6rem;
  }

  cursor: text;

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:focus {
    border: 0.15rem solid ${borderInputFocus};
  }
  &placeholder {
    color: ${colorPlaceHolder};
    font-size: 1.4rem;
  }
`;
