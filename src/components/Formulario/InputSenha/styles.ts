import styled from 'styled-components';
import { shade } from 'polished';

export const ContainerSenha = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  &:focus-within {
    border: 0.2rem solid #f4ede8;
    color: #f4ede8;
  }
`;

export const ButtonEye = styled.button`
  background: none;
  border: none;
  color: #f4ede8;
  padding: 0.5rem 1rem;
  font-size: 1.6rem;

  &:hover {
    color: ${shade(0.2, '#666360')};
  }
`;

export const CapsLockContainer = styled.div`
  margin: 0.4rem;
  font-family: 'Roboto Condesed', sans-serif;
  color: #48d47a;
  text-align: center;

  &::before {
    content: '';
    border-style: solid;
    border-width: 0.5rem 0.5rem 0 0.5rem;
    top: 0%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;
