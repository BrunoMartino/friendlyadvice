import styled from 'styled-components';

import {
  borderInputFocus,
  colorText,
  colorWhite,
} from '../../../../../../../../../utils/colorsInpera';

interface IData {
  width: string;
  align: string;
  marginTop: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 37vw;
  @media (max-width: 899px) {
    width: 96vw;
  }
  background-color: ${colorWhite};
  min-height: 100vh;
  height: 100vh;
  padding-left: 24px;
  margin-top: 1rem;
`;

export const ContainerCadastro = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  background: white;
`;

export const ContainerContent = styled.div``;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 900px) {
    gap: 0px;
  }

  .content-div {
    display: grid;
    grid-auto-flow: row;
    grid-column-gap: 1rem;
    grid-template-columns: repeat(1, 1fr);

    @media (max-width: 900px) {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 6px;
    }

    grid-template-areas:
      'codigo'
      'nome'
      'qtde'
      'valor';

    [class^='grid-'] {
      position: relative;
    }

    [class^='grid-'] input::placeholder {
      opacity: 1;
      transition: opacity 0.3s ease;
    }

    [class^='grid-'] input:focus::placeholder {
      opacity: 0;
    }

    [class^='grid-'] label {
      position: absolute;
      left: 10px;
      top: -4%;
      transform: translateY(-5%);
      font-size: 1.2rem;
      color: ${colorText};
      background-color: white;
      display: flex;
      justify-content: center;
      padding: 0 4px;
      letter-spacing: 0.7px;
      opacity: 1;
      transition: opacity 0.3s ease, top 0.3s ease;
    }

    .grid-codigo {
      grid-area: codigo;
    }
    .grid-nome {
      grid-area: nome;
    }
    .grid-qtde {
      grid-area: qtde;
    }
    .grid-valor {
      grid-area: valor;
    }

    div {
      width: 100%;
    }
    input {
      width: 100%;
      margin-bottom: 3px;
    }
  }

  input {
    font-family: 'Poppins';
    font-size: 1.4rem;
    color: #757575;
    height: 4rem;
    background-color: white;
    border-radius: 8px;
    border: 2px solid #c0c0c0;
    margin-top: 5px;

    :focus {
      border: 2px solid ${borderInputFocus};
    }
  }
`;

export const Footer = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  height: 4rem;
  gap: 1.2rem;

  button {
    height: 3rem;
    border: none;
    font-size: 1.4rem;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 0.5px;
    border-radius: 8px;

    :hover {
      opacity: 0.9;
    }
  }

  .btn-voltar {
    background: ${colorWhite};
  }
  .btn-salvar {
    width: 11rem;
    background: ${borderInputFocus};
    color: ${colorWhite};
  }
`;
