import styled, { css, keyframes } from 'styled-components';
import { colorBlack, colorWhite } from '../../utils/colorsInpera';

interface IProps {
  error?: boolean;
}

const shakeAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-5px);
  }
  40% {
    transform: translateX(5px);
  }
  60% {
    transform: translateX(-5px);
  }
  80% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
`;

export const LocalizarSearch = styled.div<IProps>`
  transition: box-shadow 300ms ease-in-out;

  .localizar-icon-search {
    color: #bfbfbf;
    display: flex;
    font-size: 1.4rem;
    align-items: center;
    justify-content: center;
    margin: 1rem;
  }

  .localizar-search-input {
    background-color: transparent;
    border: none;
    width: 100%;
    padding: 0.5rem 0;
    font-size: 1.4rem;
    text-align: left;
    display: flex;
    align-items: center;
  }

  .localizar-search-input::placeholder {
    color: #bfbfbf;
    font-size: 1.4rem;
    text-align: left;
  }

  .localizar-search-input:focus::placeholder {
    color: transparent;
    font-size: 1.4rem;
    text-align: left;
  }

  .localizar-underline-search {
    background-color: ${colorBlack};
    height: 0.3rem;
    width: 0rem;
    position: absolute;
    bottom: -0.2rem;
    transition: 300ms ease-in-out;
  }

  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  background-color: ${colorWhite};

  height: 3.5rem;

  :focus-within {
    outline: 0.1rem solid #e7ab62;
    box-shadow: 0rem 0rem 0.1rem 0.3rem #e7ab6230;
  }

  ${({ error }) =>
    error &&
    css`
      animation: ${shakeAnimation} 0.3s ease-in-out;
      :focus-within {
        outline: 0.1rem solid tomato;
        box-shadow: 0rem 0rem 0.1rem 0.3rem #ffb3b3;
      }
    `}/* border-bottom: 1px solid #00a04a; */
`;
