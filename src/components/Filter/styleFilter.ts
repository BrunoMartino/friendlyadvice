import styled from 'styled-components';
import { borderInputFocus, colorWhite } from '../../utils/colorsInpera';

export const ContainerGeral = styled.div`
  overflow: hidden;

  #overlay {
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 10;
  }
`;

export const Container = styled.div<any>`
  display: flex;
  flex-direction: column;
  width: 40vw;
  color: black;

  @media (max-width: 800px) {
    width: 100vw;
  }

  background-color: ${colorWhite};
  min-height: 100dvh;
  height: 100dvh;
  max-height: max-content;

  position: fixed;
  z-index: 100;
  top: 75px;

  @media (max-width: 800px) {
    top: 0px;
  }

  right: 0;
  padding: 10px;
  gap: 2rem;
`;

export const ContainerCadastro = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  background: white;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  input {
    font-family: 'Poppins';
    font-size: 1.4rem;
    color: #757575;
    height: 4rem;
    background-color: white;
    border-radius: 8px;
    border: 2px solid #c0c0c0;
    width: 100%;
    padding: 8px;

    :focus {
      border: 2px solid ${borderInputFocus};

      ::placeholder {
        transition: all 0.2s ease-in-out;
        opacity: 0;
      }
    }
  }

  .DatePicker__input.-ltr.my-custom-input-class {
    width: 94vw;
    height: 4rem;
    margin-right: 0;
  }
`;

export const Footer = styled.div`
  bottom: 0;
  display: flex;
  height: 4rem;
  gap: 1.2rem;
  justify-content: center;

  button {
    height: 3rem;
    border: none;
    font-size: 1.4rem;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 0.5px;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    background-color: transparent;

    :hover {
      opacity: 0.9;
    }
  }

  .botao-voltar {
    background: ${colorWhite};
  }

  .botao-salvar {
    background: ${borderInputFocus};
    color: ${colorWhite};
    padding: 5px;
  }
`;
