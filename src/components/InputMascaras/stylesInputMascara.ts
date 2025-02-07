import styled from 'styled-components';
import {
  colorText,
  colorPlaceHolder,
  backgroundInperaInput,
  borderInput,
  borderInputFocus,
  greenInpera,
} from '../../utils/colorsInpera';
import { shade } from 'polished';
interface propsInput {
  tamanho?: string;
  alinhamento?: string;
  marginTop?: string;
  backgroundColor?: string;
}

export const Container = styled.div`
  display: flex;
  align-items: center;

  button {
    background-color: ${backgroundInperaInput};
    border: 0;
    border-top: 0.15rem solid ${borderInput};
    border-bottom: 0.15rem solid ${borderInput};
    border-right: 0.15rem solid ${borderInput};
    width: 4rem !important;
    height: 2.7rem;
    color: #f4ede8;
    font-size: 1.6rem;

    &:hover {
      color: ${shade(0.2, '#666360')};
    }
  }
`;

export const ContainerInput = styled.input<propsInput>`
  width: ${(props: any) => (props.tamanho ? props.tamanho : '20rem')};
  height: 2.7rem;
  background: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : backgroundInperaInput};
  border: 0.15rem solid ${borderInput};
  color: ${colorText};
  font-weight: 400;
  text-align: ${(props: any) =>
    props.alinhamento ? props.alinhamento : 'start'};
  margin-top: ${(props: any) => (props.marginTop ? props.marginTop : '0.5rem')};

  padding: 0 0.5rem;
  font-size: 1.4rem;

  /* @media (max-width: 927px) {
    font-size: 16px;
    width: 100%; //colocar isso fez funcionar no mobile junto do max-width: 98vw
    max-width: 98vw; //valor sendo aplicado diretamente no input //diminuir a grid talvez faça funcionar para mobile
  } */

  cursor: text;

  &:focus {
    border: 0.15rem solid ${borderInputFocus};
  }

  &placeholder {
    color: ${colorPlaceHolder};
    font-size: 1.4rem;
  }
`;

export const CapsLockContainer = styled.div`
  margin: 0.4rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${greenInpera};
  text-align: center;
`;
