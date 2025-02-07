import styled, { css } from 'styled-components';
import { Colors } from '../../utils/colorsAtualizada';

interface IStyles {
  cod?: number;
  size?: number;
}

export const Main = styled.div<IStyles>`
  display: flex;
  align-items: center;

  ${({ cod, size }) =>
    cod &&
    css`
      .check-input {
        display: none;
      }

      .checkbox {
        width: ${size}rem;
        height: ${size}rem;
        border-radius: 0.8rem;
        border: 0.2rem solid ${Colors.componentes.CheckBoxComponent.borderOff};
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        padding: 0.3rem;
        transition: 0.3s all;
      }
      .checkbox svg {
        width: 2rem;
        height: 2rem;
      }

      .check-input:checked + .checkbox {
        background-color: ${Colors.componentes.CheckBoxComponent.backgroundActive};
        border: 0.2rem solid ${Colors.componentes.CheckBoxComponent.borderActive};
      }
      .check-input:checked + .checkbox svg path {
        stroke: #fff;
        stroke-width: 3;
        animation: check 1s forwards;
      }

      .checkbox::before {
        content: '';
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        display: block;
        width: 6rem;
        height: 6rem;
        background: ${Colors.componentes.CheckBoxComponent.backgroundActive};
        opacity: 0.5;
        z-index: 1;
      }
      .check-input-${cod}:checked + .checkbox::before {
        animation: ripple 0.3s;
      }

      @keyframes check {
        to {
          stroke-dasharray: 0;
        }
      }

      @keyframes ripple {
        to {
          transform: scale(1);
        }
      }

      .check-label {
        text-shadow: none;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 1.25rem;
        line-height: 2rem;
        margin-left: 0.6rem;
        margin-right: 1rem;
        color: ${Colors.componentes.CheckBoxComponent.color};
      }
    `}
`;
