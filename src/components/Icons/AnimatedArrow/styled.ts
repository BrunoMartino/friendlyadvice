import styled, { css, keyframes } from 'styled-components';

interface IContainer {
  transform: 'vertical' | 'horizontal';
}

const animate = keyframes`
    0% {
        opacity: 0;
        transform: rotate(45deg) translate(-15px, -15px);
    }
    50% {
        opacity: 0.6;
    }
    100% {
        opacity: 0;
        transform: rotate(45deg) translate(15px, 15px);
    }
`;

export const Container = styled.div<IContainer>`
  position: absolute;
  /* z-index: 999; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* transform: rotate(90deg); */
  cursor: pointer;

  ${({ transform }) =>
    transform === 'vertical' &&
    css`
      transform: rotate(0deg);
    `}

  ${({ transform }) =>
    transform === 'horizontal' &&
    css`
      transform: rotate(270deg);
    `}

  span {
    display: block;
    width: 1.5rem;
    opacity: 0.6;
    height: 1.5rem;
    border-bottom: 5px solid #f0a830;
    border-right: 5px solid #ea9b1c;
    transform: rotate(45deg);
    margin: -10px;
    animation: ${animate} 2s infinite;

    &:nth-child(2) {
      animation-delay: -0.2s;
    }

    /* &:nth-child(3) {
      animation-delay: -0.4s;
    } */
  }
`;
