import styled, { css, keyframes } from 'styled-components';
import { Colors } from '../../utils/colorsAtualizada';
import { TipoMensagemSnack } from './enum';

//interface
interface IContainerSnack {
  isOpened?: boolean;
  type?: TipoMensagemSnack;
  time?: number;
}

const tranlateXText = keyframes`
  from{
    width: 60%;
  }
  to{
    width: 100%;
  }
`;

const tranlateX = keyframes`
    from{
      transform: translateX(-100px);
    }

    to{
      transform: translateX(0px);
    }
`;

const closeAnimate = keyframes`
 from{
   transform: translateX(0px);
   opacity: 1;
  }

  to{
        transform: translateX(-100px);
        opacity: 0;
    }
`;

export const Main = styled.div`
  position: fixed;
  right: -1px;
  /* display: flex; */
  /* height: 100vh; */
  /* width: 50vw; */
  z-index: 999999;
  max-width: 99vw;
  div {
    /* margin: 1.6rem; */
    margin: 0.5rem 0.5rem 0;
  }
`;

export const ContainerSnack = styled.div<IContainerSnack>`
  /* padding: 0.6rem; */
  /* width: 25rem; */
  /* height: 5rem; */
  /* min-width: 10rem; */

  width: auto;

  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 0.2rem;
  animation: ${tranlateX} 0.6s forwards;
  transition: width 1s;
  background-color: green;
  /* box-shadow: -2px 3px 1px 5px #2b2b2b; */
  box-shadow: 0 0px 10px rgb(0 0 0 / 0.5);

  padding: 1rem;

  ${({ type }) =>
    type &&
    type === 'info' &&
    css`
      background-color: ${Colors.CoresUtilitarias.infoColor};
    `}
  ${({ type }) =>
    type &&
    type === 'error' &&
    css`
      background-color: ${Colors.CoresUtilitarias.errorMessage};
    `}
    ${({ type }) =>
    type &&
    type === 'success' &&
    css`
      background-color: ${Colors.CoresUtilitarias.successColorLight};
    `}


  .div-snack-text {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    flex-wrap: wrap;
    animation: 1.6s forwards ${tranlateXText};

    p {
      font-size: 1.4rem;
      /* white-space: nowrap; */
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0 1.5rem;
    }
  }

  .close-div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 0;

    cursor: pointer;
    &:hover {
      svg > path {
        fill: ${Colors.TextColors.textWhiteGray};
      }
    }
    /* svg:last-child {
      path {
        &:hover {
          fill: green;
        }
      }
    } */
  }

  ${({ isOpened, time }) =>
    isOpened &&
    css`
      animation: ${closeAnimate} 0.6s forwards;
      animation-delay: calc(${time! - 500}ms);
    `}
`;
