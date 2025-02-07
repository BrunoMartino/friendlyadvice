import styled, { css, keyframes } from 'styled-components';

import { Colors } from '../../utils/colorsAtualizada';

type TProps = {
  widthComponent?: string | number;
  heigthComponent?: string | number;
  opened?: boolean;
};

type TUl = {
  animeClose?: boolean;
};

type TDivProps = {
  position?: string;
};

const openDrop = keyframes`
  from{
    padding: 0 0.5rem 0 0.5rem;

  }to{
    height: 100%;
  }
`;

const closeDrop = keyframes`
  from{
    height: 100%;
  }to{
    padding: 0 0.5rem 0 0.5rem;
  }
`;

export const Container = styled.div<TDivProps>`
  display: flex;
  justify-content: ${({ position }) => (position ? position : 'start')};

  .div-control {
    position: relative;
  }
`;

export const Button = styled.button<TProps>`
  padding: 1rem;
  border: none;
  border-radius: ${({ opened }) => (opened ? '0.5rem 0.5rem 0 0' : '0.5rem')};
  width: ${({ widthComponent }) => (widthComponent ? widthComponent : '22rem')};
  display: flex;
  align-items: center;
  display: start;
  position: relative;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0.01rem;
    padding: 0.4rem;
    height: 100%;
    border-left: 0.1rem solid ${Colors.componentes.ButtonDropDown.borderLeft};
    background-color: ${Colors.componentes.ButtonDropDown.backgroundColor};
    border-radius: 0 0.5rem 0.5rem 0;

    svg {
      transform: ${({ opened }) =>
        opened ? 'rotate(270deg)' : 'rotate(90deg)'};
      transition: transform 1s;
    }
  }

  p {
    color: ${Colors.componentes.Button.textColor};
    text-shadow: none;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 1.3rem;
    line-height: 2rem;
    margin: 0rem 0.8rem 0 0.8rem;
  }
`;

export const ButtonDrop = styled.div<TUl>`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  background-color: ${Colors.componentes.ButtonDropDown.backgroundColor};
  width: 100%;
  border-radius: 0 0 0.5rem 0.5rem;
  box-shadow: rgb(50 50 93 / 25%) -1px 4px 12px 0px,
    rgb(0 0 0 / 30%) 0px 18px 36px -18px;

  ul {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  li {
    animation: ${openDrop} 0.6s forwards;
    padding: 0.7rem 0.5rem 0.5rem 1rem;
    display: flex;
    align-items: center;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 0.05rem solid
      ${Colors.componentes.ButtonDropDown.borderBottom};
    justify-content: start;
    height: 100%;
    color: ${Colors.componentes.Button.textColor};
    text-shadow: none;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 2rem;

    &:first-child {
      box-shadow: rgb(50 50 93 / 25%) 0px 0px 0px 0px inset,
        rgb(0 0 0 / 30%) -1px 20px 15px -20px inset;
    }

    &:last-child {
      border: none;
    }

    &:last-child {
      border-radius: 0 0 0.5rem 0.5rem;
    }

    &:hover {
      background-color: ${Colors.componentes.ButtonDropDown.backgroundHover};
      cursor: pointer;
      user-select: none;
    }
    span {
      margin-right: 0.6rem;
    }

    ${({ animeClose }) =>
      animeClose &&
      css`
        animation: ${closeDrop} 0.6s forwards;
        animation-delay: 100ms;
      `}
  }
`;
