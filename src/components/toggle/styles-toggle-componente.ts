import styled, { css } from 'styled-components';
import { Colors } from '../../utils/colorsAtualizada';

interface IStylesProps {
  widthComponent?: number;
  heigthComponent?: number;
  cod: number;
  checked: boolean;
}

export const Container = styled.div<IStylesProps>`
  display: flex;
  align-items: center;

  ${({ cod, checked }) =>
    cod &&
    checked === false &&
    css`
      .switch-${cod} {
        display: inline-block;
        height: 3.4rem;
        position: relative;
        width: 6rem;
      }

      .switch-${cod} .switch-input-${cod} {
        display: none;
      }

      .slider-${cod} {
        background-color: ${Colors.componentes.Toggle.backgroundOff};
        bottom: 0;
        cursor: pointer;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transition: 0.4s;
      }

      .slider-${cod}:before {
        background-color: #fff;
        bottom: 0.4rem;
        content: '';
        height: 2.6rem;
        left: 0.4rem;
        position: absolute;
        transition: 0.4s;
        width: 2.6rem;
      }

      .slider-${cod}.round-${cod} {
        border-radius: 3.4rem;
      }

      .slider-${cod}.round-${cod}:before {
        border-radius: 50%;
      }

      .switch-label-${cod} {
        text-shadow: none;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 1.25rem;
        line-height: 2rem;
        margin-left: 0.6rem;
        color: ${Colors.componentes.Toggle.color};
      }
    `};

  ${({ cod, checked }) =>
    cod &&
    checked === true &&
    css`
      .switch-${cod} {
        display: inline-block;
        height: 3.4rem;
        position: relative;
        width: 6rem;
      }

      .switch-${cod} .switch-input-${cod} {
        display: none;
      }

      .slider-${cod} {
        background-color: ${Colors.componentes.Toggle.backgroundOff};
        bottom: 0;
        cursor: pointer;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transition: 0.4s;
      }

      .slider-${cod}:before {
        background-color: #fff;
        bottom: 0.4rem;
        content: '';
        height: 2.6rem;
        left: 0.4rem;
        position: absolute;
        transition: 0.4s;
        width: 2.6rem;
      }

      .slider-${cod}.round-${cod} {
        border-radius: 3.4rem;
      }

      .slider-${cod}.round-${cod}:before {
        border-radius: 50%;
      }

      .switch-label-${cod} {
        text-shadow: none;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 1.25rem;
        line-height: 2rem;
        margin-left: 0.6rem;
        color: ${Colors.componentes.Toggle.color};
      }

      .switch-input-${cod}:checked + .slider-${cod} {
        background-color: ${Colors.componentes.Toggle.backgroundActive};
      }

      .switch-input-${cod}:checked + .slider-${cod}:before {
        transform: translateX(26px);
      }
    `};
`;
