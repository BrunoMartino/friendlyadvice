import styled, { css } from 'styled-components';
import { shade } from 'polished';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 1rem;
  padding: 1.2rem;
  width: 100%;

  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

  @media (max-width: 560px) {
    border-radius: 1rem;
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
    margin-right: 1rem;
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
  height: 1.25rem;
  /* margin-left: 1rem; */

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

export const CapsLockContainer = styled.div`
  margin: 0.4rem;
  font-family: 'Roboto Condesed', sans-serif;
  color: #48d47a;

  &::before {
    content: '';
    border-style: solid;
    border-color: #b7022c transparent;
    border-width: 0.5rem 0.5rem 0 0.5rem;
    top: 0%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const ErrorMessage = styled.h3`
  color: #c53030;
  font-size: 14px;
  font-family: sans-serif;
  font-weight: normal;
  /* padding: 2px; */
  margin: 0.8rem;
`;
