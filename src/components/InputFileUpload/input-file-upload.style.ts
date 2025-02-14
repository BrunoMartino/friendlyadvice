import styled from 'styled-components';
import { backgroundInpera, greenInpera } from '../../utils/colorsInpera';

interface ContainerProps {
  width?: string;
  height?: string;
  disabled?: any;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.35 : 1)};

  border: 0.1rem dashed ${backgroundInpera};
  background-color: transparent;

  .menu {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 0.2rem;
    margin-top: 0.2rem;
    z-index: 110;
    border: 0.1rem solid white;
    cursor: pointer;

    background-color: rgba(255, 255, 255, 0.7);
    border: 0.1rem solid black;
  }

  .status-menu {
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: 0;
    left: 1;
    margin-bottom: 0.2rem;
    padding: 0.2rem;
    background-color: rgba(255, 255, 255, 0.6);
    width: 90%;
    z-index: 90;
    border: 1px solid black;

    span {
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 1.2rem;
      color: black;
      font-weight: 600;
    }
  }

  .side-menu {
    display: flex;
    justify-content: space-around;
    position: absolute;
    top: 0;
    right: 1;
    z-index: 110;
    margin-top: 0.2rem;
    width: 10rem;
    padding: 0.2rem;

    text-align: right;
    background-color: rgba(255, 255, 255, 0.7);
    border: 0.1rem solid black;

    span {
      cursor: pointer;
    }
  }

  .container {
    display: flex;
    flex-direction: row;
    justify-content: 'center';
  }

  label {
    cursor: pointer;
    z-index: 100;
    display: flex;
    width: 100%;
    height: inherit;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .tipoImagem {
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 1.2rem;
      color: black;
      font-weight: 400;
      text-align: center;
      align-items: center;
      opacity: 0.8;
      background-color: rgba(255, 255, 255, 0.3);
    }

    .tipoImagem:hover {
      color: ${greenInpera} !important;
      opacity: 1;
      background-color: rgba(255, 255, 255, 0.65);
    }

    .addIcon:hover {
      color: ${greenInpera} !important;
      border: 0.2rem double ${greenInpera} !important;
    }
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    border: none;
    outline: none;
  }
`;
