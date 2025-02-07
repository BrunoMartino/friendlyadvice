import { ButtonHTMLAttributes } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { Colors } from '../../utils/colorsAtualizada';

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selectCheck: boolean;
};

export const Container = styled.div``;

export const Button = styled.button<TButtonProps>`
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.componentes.Button.backgroundGray};
  border: none;
  border-radius: 0.6rem;
  cursor: default !important;
  opacity: 0.6;
  transition: 1s all;




  ${({ selectCheck }) =>
    selectCheck &&
    css`
      width: 12.9rem;
      justify-content: none;
      text-shadow: none;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 1.25rem;
      line-height: 2rem;
      margin-left: 0.6rem;
      color: ${Colors.componentes.Button.textColor};
      background-color: ${Colors.componentes.ButtonDelectOnSelect
        .backgroundColorSelected};
      opacity: 1;

      &:hover {
        cursor: pointer !important;
        box-shadow: rgb(50 50 93 / 25%) -1px 4px 12px 0px,
          rgb(0 0 0 / 30%) 0px 18px 36px -18px;
        /* box-shadow: 0 0.2rem 0.6rem ${Colors.TextColors.textGray05}; */
      }

      svg {
        margin-right: 1rem;
      }

      transition: 1s all;
    `}
`;
