import styled, { css } from 'styled-components';
import { Colors } from '../../utils/colorsAtualizada';

interface IStylesProps {
  name: string;
  checked: boolean;
  gap?: number;
  disable?: boolean;
  tamanho?: 'pequeno' | 'grande';
}

export const Container = styled.div<IStylesProps>`
  display: flex;
  align-items: flex-start;
  flex-direction: column-reverse;
  gap: ${({ gap }) => (gap ? `${gap}rem` : 0)};

  ${({ disable, name }) =>
    disable &&
    name &&
    css`
      /* input:disabled { */
      .switch-input-${name} + .slider-${name} {
        cursor: not-allowed;
        opacity: 0.3;
        background-color: #564f52;
      }

      /* } */
    `}

  ${({ name, checked }) =>
    name &&
    checked === false &&
    css`
      .switch-${name} {
        display: inline-block;
        height: 2.4rem;
        position: relative;
        width: 6rem;
      }

      .switch-${name} .switch-input-${name} {
        display: none;
      }

      .slider-${name} {
        background-color: ${Colors.componentes.Toggle.backgroundOff};
        bottom: 0;
        cursor: pointer;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transition: 0.4s;
      }

      .slider-${name}:before {
        background-color: #fff;
        bottom: 0.4rem;
        content: '';
        height: 1.6rem;
        left: 0.4rem;
        position: absolute;
        transition: 0.4s;
        width: 1.6rem;
      }

      .slider-${name}.round-${name} {
        border-radius: 3.4rem;
      }

      .slider-${name}.round-${name}:before {
        border-radius: 50%;
      }

      .switch-label-${name} {
        text-shadow: none;
        /* font-family: 'Poppins'; */
        font-style: normal;
        font-weight: 600;
        font-size: 1.4rem;
        line-height: 2rem;
        /* margin-left: 0.6rem; */
        color: ${Colors.componentes.Toggle.color};

        @media (max-width: 500px) {
          font-size: 1.2rem;
        }

        @media (max-width: 380px) {
          font-size: 1.1rem;
        }
      }
    `};

  ${({ name, checked }) =>
    name &&
    checked === true &&
    css`
      .switch-${name} {
        display: inline-block;
        height: 2.4rem;
        position: relative;
        width: 6rem;
      }

      .switch-${name} .switch-input-${name} {
        display: none;
      }

      .slider-${name} {
        background-color: ${Colors.componentes.Toggle.backgroundOff};
        bottom: 0;
        cursor: pointer;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transition: 0.4s;
      }

      .slider-${name}:before {
        background-color: #fff;
        bottom: 0.4rem;
        content: '';
        height: 1.6rem;
        left: 1.4rem;
        position: absolute;
        transition: 0.4s;
        width: 1.6rem;
      }

      .slider-${name}.round-${name} {
        border-radius: 3.4rem;
      }

      .slider-${name}.round-${name}:before {
        border-radius: 50%;
      }

      .switch-label-${name} {
        text-shadow: none;
        /* font-family: 'Poppins'; */
        font-style: normal;
        font-weight: 600;
        font-size: 1.4rem;
        line-height: 2rem;
        /* margin-left: 0.6rem; */
        color: ${Colors.componentes.Toggle.color};

        @media (max-width: 500px) {
          font-size: 1.2rem;
        }

        @media (max-width: 380px) {
          font-size: 1.1rem;
        }
      }

      .switch-input-${name}:checked + .slider-${name} {
        background-color: ${Colors.componentes.Toggle.backgroundActive};
      }

      .switch-input-${name}:checked + .slider-${name}:before {
        transform: translateX(26px);
      }

      input:disabled {
        .switch-input-${name}:checked + .slider-${name} {
          background-color: red !important;
        }
      }
    `};

  ${({ name, tamanho, checked }) =>
    name &&
    tamanho === 'pequeno' &&
    css`
      .switch-${name} {
        display: inline-block;
        height: 1.8rem;
        position: relative;
        width: 4rem;
      }

      .slider-${name}:before {
        background-color: #fff;
        bottom: 0.4rem;
        content: '';
        height: 1rem;
        left: 0.4rem;
        position: absolute;
        transition: 0.4s;
        width: 1rem;
      }

      ${checked &&
      `
      .slider-${name}:before {
        background-color: #fff;
        bottom: 0.4rem;
        content: '';
        height: 1rem;
        left: 0rem;
        position: absolute;
        transition: 0.4s;
        width: 1rem;
      }`}
    `}
`;
