import styled, { css } from 'styled-components';
import { TTheme } from './index-slider-component-mod';

interface IProps {
  activation?: any;
  switchTheme?: TTheme;
}

export const DivCarrossel = styled.div<IProps>`
  box-sizing: border-box;
  border-top: transparent 0.1rem solid;
  ${({ switchTheme }) =>
    switchTheme === undefined &&
    css`
      .active {
        background-color: #f2b05e;
        font-weight: bold;
        color: black;
      }

      p {
        padding: 0.6rem 2.5rem;
        cursor: pointer;
        border-radius: 1rem;
        background-color: #d7d7d7;
        // width: 20rem !important;
        width: 2%;

        font-size: 1.6rem;
        color: #a8a4a6;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}

  ${({ switchTheme }) =>
    switchTheme === TTheme.Flutter &&
    css`
      width: 30rem !important;

      .active {
        background-color: #d0944b;
        font-weight: bold;
        color: #fff;
      }

      p {
        cursor: pointer;
        padding: 0.6rem 2.8rem;
        border-radius: 0 !important;
        background-color: #fff;

        font-size: 1.6rem;
        color: #a8a4a6;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:hover {
        border-top: #a8a4a6 0.1rem solid;
      }

      @media screen and (max-width: 768px) {
        width: 20rem;
      }

      @media screen and (max-width: 600px) {
        width: 16rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    `}
`;
