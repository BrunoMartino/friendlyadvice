import styled, { css } from 'styled-components';

import {
  borderInputFocus,
  colorWhite,
} from '../../../../../utils/colorsInpera';

export const InputSection = styled.div`
  flex: 1;
`;
export const ButtonSection = styled.div`
  min-width: 15rem;
  width: 15rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  background-color: ${colorWhite};
  min-height: 100vh;
  height: 100vh;

  .carousel-div-style {
    margin: 1.6rem 3.6rem;

    @media screen and (max-width: 1025px) {
      margin: 1.6rem 2.2rem;
    }

    @media screen and (max-width: 600px) {
      margin: 0rem 3.6rem 0rem 3.6rem;
    }
  }
`;

export const ContainerListagem = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: white;
  @media (max-height: 400px) {
    padding: 0;
  }
`;

export const ContainerContent = styled.div<any>`
  height: 5rem;
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 2px solid #dfdfdf;
  margin-top: 1rem;

  ${({ checked }) =>
    checked &&
    css`
      height: 4.9rem;
      border: 2px solid #c08845;
      border-radius: 12px;
      padding: 0.8rem;
      margin-right: 0.5rem;

      @media (max-width: 900px) {
        margin: 1rem;
      }
    `}
`;

export const Content = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 2.5fr 1.5fr 1fr 1fr 1fr 1fr;
  grid-template-areas: 'checkbox numeroOs cliente telefone equipamento valorOrcado tecnico';
  gap: 1rem;
  align-items: center;

  padding: 1rem;

  @media (max-width: 800px) {
    grid-template-columns:
      minmax(50px, 75px)
      minmax(50px, 85px)
      minmax(75px, 250px)
      minmax(50px, 150px)
      70px;

    grid-template-areas: 'checkbox numeroOs cliente valorOrcado';
  }

  @media screen and (max-width: 600px) {
    .body-list {
      grid-template-columns:
        minmax(50px, 85px) minmax(90px, 100px) minmax(90px, 100px)
        minmax(15px, 100px) minmax(10px, 80px);
      grid-template-areas: 'checkbox numeroOs valorOrcado valorOrcado';
    }

    grid-template-columns:
      minmax(50px, 85px) minmax(90px, 100px) minmax(90px, 100px)
      minmax(15px, 100px) minmax(10px, 80px);
    grid-template-areas: 'checkbox numeroOs valorOrcado valorOrcado';
  }

  .header {
    p {
      color: #a8a4a6;
    }
  }

  p {
    font-family: 'Poppins';
    font-size: 1.4rem;
    color: #000;

    @media (max-width: 460px) {
      font-size: 1.2rem;
    }
  }

  .arrowContainer {
    display: flex;
    justify-content: flex-end;

    div {
      display: flex;
      align-items: center;
      width: 2.8rem;
      height: 2.8rem;
      border-radius: 2rem;
      justify-content: center;

      .arrow {
        color: #14181b;
        width: 1.7rem;
        height: 1.7rem;
      }

      :hover {
        background-color: ${borderInputFocus};
        cursor: pointer;
        .arrow {
          color: white;
        }
      }
    }
  }

  .cliente-row {
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 22vw;
  }

  .checkboxContainer {
    grid-area: checkbox;
    display: flex;
    align-items: center;

    input[type='checkbox'] {
      width: 17px;
      height: 17px;
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-color: #fff;
      border: 2px solid #57636c;
      border-radius: 2px;
      outline: none;
      position: relative;
    }

    input[type='checkbox']:checked {
      background-color: ${borderInputFocus};
      border-color: ${borderInputFocus};
    }

    input[type='checkbox']:checked::after {
      content: '';
      position: absolute;
      top: 1px;
      left: 3px;
      width: 7px;
      height: 9px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }

  .direita {
    grid-area: valorOrcado;
  }

  .menuModalContainer {
    width: 6.3rem;
    @media (max-width: 800px) {
      width: 4.3rem;
    }
    display: flex;
    justify-content: flex-end;

    div {
      display: flex;
      align-items: center;
      width: 2.8rem;
      height: 2.8rem;
      border-radius: 2rem;
      justify-content: center;

      .menuModal {
        color: #14181b;
        width: 1.1rem;
        height: 1.1rem;
      }

      :hover {
        background-color: ${borderInputFocus};
        cursor: pointer;
        .menuModal {
          color: white;
        }
      }
    }
  }
`;

export const BtnData = styled.button<any>`
  height: 4rem;
  background: white;
  border: 2px solid #c0c0c0;
  border-radius: 8px;
  color: #757575;
  font-family: 'Poppins';
  font-weight: 400;
  padding: 0 0.5rem;
  font-size: 1.4rem;
  text-align: ${({ align }) => (align ? align : 'left')};
  cursor: text;
  width: 500px;

  @media (max-width: 899px) {
    width: 250px;
  }

  @media (max-width: 800px) {
    width: 100%;
  }

  &:hover {
    border-radius: 5px;
  }

  &:focus {
    border: 2px solid ${borderInputFocus};
  }
`;

export const ContextExpanded = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  border-bottom: 2px solid #dfdfdf;
  width: 100%;

  span {
    font-family: 'Poppins';
    font-size: 1.4rem;
    color: #14181b;
    font-weight: bold;
  }

  p {
    font-family: 'Poppins';
    font-size: 1.4rem;
    color: #14181b;

    @media (max-width: 460px) {
      font-size: 1.2rem;
    }
  }
`;
