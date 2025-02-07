import styled, { css } from 'styled-components'

import { borderInputFocus, colorWhite } from '../../../../../utils/colorsInpera'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  background-color: ${colorWhite};
  min-height: 100vh;
  height: 100vh;
`;

export const ContainerListagem = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem;
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
  margin-bottom: 1.2rem;

  ${({ checked }) =>
    checked &&
    css`
      height: 4.9rem;
      border: 2px solid #c08845;
      border-radius: 12px;
      padding: 0.8rem;
    `}
`;

export const Content = styled.div<any>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns:
    9rem minmax(9rem, 16rem) minmax(11rem, 12rem) 6rem minmax(11rem, 28rem) minmax(
      10rem,
      13rem
    )
    minmax(10rem, 100vw);
  @media (max-width: 800px) {
    grid-template-columns: 7rem 9rem 10rem minmax(10rem, 10rem) minmax(
        0rem,
        32rem
      );
  }
  @media (max-width: 460px) {
    grid-template-columns: 7rem 9rem minmax(2rem, 10rem) minmax(0rem, 20rem);
  }
  gap: 1.2rem;
  align-items: center;

  .centralizado {
    display: flex;
    justify-content: center;
  }
  .direita {
    display: flex;
    justify-content: flex-end;
  }

  .checkboxContainer {
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

  p {
    font-family: 'Poppins';
    font-size: 1.4rem;
    @media (max-width: 460px) {
      font-size: 1.2rem;
    }
    color: #14181b;

    ${({ typeContent }) =>
      typeContent === 'header' &&
      css`
        color: #c0c0c0;
      `}
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
`;

export const ContextExpanded = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  border-bottom: 2px solid #dfdfdf;
  width: 100%;

  p {
    font-family: 'Poppins';
    font-size: 1.4rem;
    color: #14181b;

    @media (max-width: 460px) {
      font-size: 1.2rem;
    }
  }
`;