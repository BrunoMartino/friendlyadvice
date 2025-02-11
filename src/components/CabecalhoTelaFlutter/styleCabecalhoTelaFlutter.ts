import styled, { css } from 'styled-components';

import { borderInputFocus, colorWhite } from '../../utils/colorsInpera';

export const Container = styled.div<any>`
  display: flex;
  flex-direction: column;

  /* height: inherit; */
  height: 92vh;
  
  font-family: 'Poppins', sans-serif;

  padding-top: 1rem;

  @media (max-height: 400px) {
    padding-top: 5rem;
  }

  ${({ system }) =>
    system === 'ios' &&
    css`
      padding-top: 6rem;
    `}

  @media (min-width: 900px) {
    margin: 0 0.5rem;
  }

  .create-div {
    max-width: 31.5rem;
    flex-wrap: nowrap;
    min-width: 10rem;
  }

  .content-children {
    display: flex;
    flex-direction: column;
    flex: 1;
    // height: 100vh;
  }
`;

export const Cabecalhotela = styled.div<any>`
  padding: 3rem 1rem 1rem 1rem;

  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}
`;

export const TituloPagina = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Caminho = styled.div`
  display: flex;
  gap: 8px;

  p {
    font-family: 'Poppins';
    color: #c0c0c0;
    font-size: 1.45rem;
    @media (max-width: 460px) {
      font-size: 1.3rem;
    }
    font-weight: 500;

    :hover {
      color: ${borderInputFocus};
      cursor: pointer;
    }

    :last-child {
      color: #d0944b;
    }
  }
`;

export const AddButton = styled.button`
  color: ${colorWhite};
  background-color: ${borderInputFocus};
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;

  :hover {
    background-color: #c08845;
  }

  font-family: 'Poppins';
  font-size: 2.3rem;
  font-weight: 500;
`;

export const ContainerPesquisa = styled.div<any>`
  display: flex;
  gap: 8px;
  padding-top: 12px;

  ${({ modal }) =>
    modal &&
    css`
      flex-direction: column;
      padding-top: 0;
      align-items: flex-start;
      width: 100%;
    `}

  input {
    width: 100%;
    height: 40px;
    font-family: 'Poppins';
    font-size: 14px;
    padding: 8px;
    border-radius: 8px;
    border: 2px solid #c0c0c0;

    :focus {
      border: 2px solid ${borderInputFocus};
    }
  }

  .btns-container {
    min-width: 30rem;
    display: flex;
    gap: 0.8rem;
    align-items: center;

    button {
      color: ${colorWhite};
      background-color: ${borderInputFocus};
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 8px;

      :hover {
        background-color: #c08845;
      }

      font-family: 'Poppins';
      font-size: 1.6rem;
      font-weight: 500;
    }
  }
`;

export const Footer = styled.div<any>`
  font-family: 'Poppins';
  position: sticky;
  bottom: 0;
  left: 0;
  height: 6rem;
  display: flex;
  justify-content: flex-end;

  gap: 1.2rem;
  align-items: center;
  border-top: 2px solid #dfdfdf;
  padding: 1rem 2.5rem 1rem 2.5rem;
  background-color: white;

  ${({ typeCabecalho }) =>
    typeCabecalho === 'cadastro' &&
    css`
      user-select: none;
      display: flex;
      justify-content: flex-start;
      padding: 1rem;
    `}

  div {
    flex-direction: column;
    justify-content: center;
    height: 4rem;

    p {
      font-family: 'Poppins';
      color: black;
      font-size: 1.4rem;
      @media (max-width: 460px) {
        font-size: 1.2rem;
      }
    }
  }

  .filtro {
    display: flex;
    align-items: center;
    width: 15rem;
    border: 1px solid ${borderInputFocus};
    border-radius: 8px;
    margin: 0 auto;

    @media (max-width: 460px) {
      width: 12rem;
    }

    p {
      color: ${borderInputFocus};
    }
  }

  button {
    height: 3rem;
    border: none;
    font-size: 1.4rem;
    font-weight: 600;
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

    :disabled {
      opacity: 0.7;
      cursor: default;
    }
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* z-index: 100000; */
  z-index: 99998;
`;

export const TotalsContainer = styled.div<any>`
  font-family: 'Poppins';
  position: sticky;
  bottom: 6rem;
  left: 0;
  height: 6rem;
  display: flex;
  justify-content: flex-end;

  gap: 1.2rem;
  align-items: center;
  border-top: 2px solid #dfdfdf;
  padding: 1rem 2.5rem 1rem 2.5rem;
  background-color: white;

  transform: translateY(100%);
  animation: slideUp 0.5s ease-out forwards;

  div {
    flex-direction: column;
    justify-content: center;
    height: 4rem;

    p {
      font-family: 'Poppins';
      color: black;
      font-size: 1.4rem;
      @media (max-width: 460px) {
        font-size: 1.2rem;
      }
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  width: 100%;
  max-width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  .btns-container {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 2rem;
    width: 100%;
    justify-content: space-between;

    button {
      border: none;
      background-color: white;

      span {
        font-family: 'Poppins';
        font-size: 1.4rem;
        color: #55585a;
      }
    }

    .btnFilter {
      background-color: ${borderInputFocus};
      border-radius: 20px;
      height: 3rem;
      width: 46rem;

      span {
        color: white;
      }
    }
  }
`;
