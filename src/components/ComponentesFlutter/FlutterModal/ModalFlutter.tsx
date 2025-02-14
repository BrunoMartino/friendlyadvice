import styled from 'styled-components';
import { FormContent } from './Form/index-form';
import { InputInLine, Overlay } from '../shared-styles';

export const FormContainer = styled.div`
  padding: 0 1.6rem 0 1.6rem;
  gap: 1rem;

  max-height: 90svh;
  overflow: auto;

  h2 {
    font-family: Poppins, sans-serif;
    font-size: 1.8rem;
    font-weight: 500;
    color: black;
    /* padding: 0.6rem 0.6rem 1.6rem 1.6rem; */
  }

  h3 {
    font-family: Poppins, sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: black;
    padding: 1rem 0;
  }
`;

export const ButtonArea = styled.div`
  display: flex;
  gap: 1rem;
  background-color: white;
  position: absolute;
  bottom: 1rem;

  @media screen and (max-width: 900px) and (max-height: 900px) {
    margin-bottom: 6rem;
  }

  button {
    :nth-child(1) {
      background-color: white;
    }

    :nth-child(2) {
      color: white;
    }

    min-width: 10rem;
    height: 2.6rem;
    width: 100%;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  background-color: white;
  z-index: 99999;
  padding-top: 1rem;
  height: 100vh;
  width: 100%;

  @media (min-width: 56.25em) {
    width: 40%;
  }
`;

export const ModalFlutter = {
  FormContent,
  Overlay,
  Container,
  InputInLine,
};
