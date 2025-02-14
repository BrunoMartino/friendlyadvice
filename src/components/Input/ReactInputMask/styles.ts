import styled, { css } from 'styled-components';
import { shade } from 'polished';

import Tooltip from '../../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  padding: 1.2rem;
  width: 100%;

  border: 0.2rem solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

  @media (max-width: 560px) {
    padding: 1.6rem;
    width: 95.5%;

    margin: 0px 0.5rem 0px 0.5rem;

    display: flex;
    align-items: center;
  }

  & + div {
    margin-top: 0.8rem;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #f4ede8;
      border-color: #f4ede8;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #f4ede8;
    `}

    input:-webkit-autofill {
    animation-name: onAutoFillStart;
    transition: background-color 50000s ease-in-out 0s;
    -webkit-text-fill-color: white !important;
  }

  input:not(:-webkit-autofill) {
    animation-name: onAutoFillCancel;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 1.6rem;
  }
`;

export const ButtonEye = styled.button`
  background: none;
  border: none;
  color: #666360;
  padding: auto;

  &:hover {
    color: ${shade(0.2, '#666360')};
  }
`;

export const Error = styled(Tooltip)`
  height: 2rem;
  margin-left: 1.6rem;

  @media (max-width: 560px) {
    height: 1rem;
    margin-left: 0.5rem;
  }

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
