import styled, { keyframes, css } from 'styled-components';
import { shade } from 'polished';
import { BsArrowRepeat } from 'react-icons/bs';
import {
  CorPrimaria,
  lightGreyColor,
  secondaryDarkColor,
} from '../../utils/colors';

import { Colors } from '../../utils/colorsAtualizada';
import { ButtonThemes } from './ButtonThemesEnum';

interface ContainerButton {
  color?: string;
  textColor?: string;
  buttonWidth?: number | string;
  buttonHeigth?: number | string;
  iconRight?: any;
  iconLeft?: any;
  opacity?: any;
  border?: string;
  borderRadius?: string;
  textShadow?: string;
  fontSize?: string | number;
  disable?: boolean;
  theme?: ButtonThemes;
}

interface IMainDiv {
  position?: string;
}

export const Main = styled.div<IMainDiv>`
  display: flex;
  justify-content: ${(props) => (props.position ? props.position : 'start')};
`;

export const ContainerDisabled = styled.button<ContainerButton>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.buttonHeigth ? props.buttonHeigth : '5.6rem')};
  width: ${(props) => (props.buttonWidth ? props.buttonWidth : '100%')};
  border: ${(props) => (props.border ? props.border : '0')};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '0')};
  padding: 0 1.3rem;
  transition: background-color 0.2s;
  background-color: #d6d6d6;
  pointer-events: none;

  cursor: not-allowed;
  opacity: 0.3;

  & {
    text-shadow: none;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 2rem;
  }

  @media (max-width: 35em) {
    height: 5.6rem;
    border: ${(props) => (props.border ? props.border : '0')};
    padding: 0 1.6rem;
    width: 95%;
    font-weight: 600;
    margin-top: 1rem;
    transition: background-color 0.2s;
  }

  @media (max-width: 370px) {
    height: 5rem;
    width: 15rem;
    white-space: nowrap;
  }

  ${({ theme }) =>
    theme === 'deleteButton' &&
    css`
      background-color: ${Colors.componentes.Button.backgroundDelete};

      color: ${Colors.componentes.Button.textColor};
      text-shadow: none;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 1.3rem;
      line-height: 2rem;

      border-radius: 0.6rem;

      &:hover {
        background-color: ${Colors.componentes.Button.backgroundDelete};
      }
    `}

  ${({ theme }) =>
    theme === 'default' &&
    css`
      background-color: ${Colors.componentes.Button.backGroundDefault};
      color: ${Colors.componentes.Button.textColor};

      text-shadow: none;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 1.3rem;
      line-height: 2rem;

      border-radius: 0.6rem;

      &:hover {
        background-color: ${Colors.componentes.Button.backGroundDefault};
      }
    `}

  ${({ theme }) =>
    theme === 'grayButton' &&
    css`
      background-color: ${Colors.componentes.Button.backgroundGray};
      color: ${Colors.componentes.Button.textColor};

      text-shadow: none;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 1.3rem;
      line-height: 2rem;

      border-radius: 0.6rem;

      &:hover {
        background-color: ${Colors.componentes.Button.backgroundGray};
      }
    `}

    ${({ theme }) =>
    theme === 'greenButton' &&
    css`
      background-color: ${Colors.componentes.Button.backgroundGreen};
      color: ${Colors.componentes.Button.textColor};

      text-shadow: none;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 1.3rem;
      line-height: 2rem;

      border-radius: 0.6rem;

      &:hover {
        background-color: ${Colors.componentes.Button.backgroundGreen};
      }
    `}
`;

export const Container = styled.button<ContainerButton>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.color ? props.color : CorPrimaria)};
  height: ${(props) => (props.buttonHeigth ? props.buttonHeigth : '5.6rem')};
  border: ${(props) => (props.border ? props.border : '0')};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '0')};

  padding: 0 1.3rem;
  color: ${(props) => (props.textColor ? props.textColor : '#f4ede8')};
  width: ${(props) => (props.buttonWidth ? props.buttonWidth : '100%')};
  font-weight: 600;
  transition: background-color 0.2s;
  text-shadow: ${(props) =>
    props.textShadow ? props.textShadow : '0.2rem 0.1rem 0.16rem #333'};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '2rem')};
  opacity: ${(props) => (props.opacity ? props.opacity : 1)};

  @media (max-width: 35em) {
    height: 5.6rem;
    border: ${(props) => (props.border ? props.border : '0')};
    padding: 0 1.6rem;
    font-weight: 600;
    margin-top: 1rem;
    transition: background-color 0.2s;
  }

  @media (max-width: 370px) {
    height: 5rem;
    width: 15rem;
    white-space: nowrap;
  }

  &:hover {
    background: ${(props) =>
      props.color
        ? shade(0.4, `${props.color}`)
        : shade(0.4, `${CorPrimaria}`)};
  }

  :hover:not(:disabled),
  :focus:not(:disabled) {
    filter: saturate(1.5);
  }

  svg {
    font-size: 4rem;
  }

  p {
    color: ${Colors.componentes.Button.textColor};
    text-shadow: none;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 1.3rem;
    line-height: 2rem;
  }

  //TEMAS PARA OS BOTÕES;

  ${({ disable }) =>
    disable &&
    css`
      background-color: ${lightGreyColor} !important;

      color: ${Colors.componentes.Button.textColor};
      text-shadow: none;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 1.3rem;
      line-height: 2rem;
      /* margin: 0rem 1rem 0 1rem; */

      background-color: tomato;
    `}

  ${({ theme }) =>
    theme === 'deleteButton' &&
    css`
      /* background-color: ${Colors.componentes.Button.backgroundDelete}; */
      background-color: tomato;

      color: ${Colors.componentes.Button.textColor};
      text-shadow: none;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 1.3rem;
      line-height: 2rem;

      border-radius: 0.6rem;

      svg {
        /* margin-right: 1rem; */
      }

      &:hover {
        background-color: #ff6347;
      }
    `}

  ${({ theme }) =>
    theme === 'default' &&
    css`
      background-color: ${Colors.componentes.Button.backGroundDefault};
      color: ${Colors.componentes.Button.textColor};

      text-shadow: none;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 1.3rem;
      line-height: 2rem;

      border-radius: 0.6rem;

      svg {
        /* margin-right: 1rem; */
      }

      &:hover {
        background-color: ${Colors.componentes.Button.backGroundDefault};
      }
    `}

  ${({ theme }) =>
    theme === 'grayButton' &&
    css`
      background-color: ${Colors.componentes.Button.backgroundGray};
      color: ${Colors.componentes.Button.textColor};

      text-shadow: none;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 1.3rem;
      line-height: 2rem;

      border-radius: 0.6rem;

      svg {
        /* margin-right: 1rem; */
      }

      &:hover {
        background-color: ${Colors.componentes.Button.backgroundGray};
      }
    `}

    ${({ theme }) =>
    theme === 'greenButton' &&
    css`
      background-color: ${Colors.componentes.Button.backgroundGreen};
      color: ${Colors.componentes.Button.textColor};

      text-shadow: none;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 1.3rem;
      line-height: 2rem;

      border-radius: 0.6rem;

      svg {
        /* margin-right: 1rem; */
      }

      &:hover {
        background-color: ${Colors.componentes.Button.backgroundGreen};
      }
    `}

    ${({ theme }) =>
    theme === 'pdvCupom' &&
    css`
      background-color: ${Colors.componentes.Button.backgroudPdvCupom};
      color: ${Colors.componentes.Button.textColor};

      text-shadow: none;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 1.3rem;
      line-height: 2rem;

      border-radius: 0.6rem;

      svg {
        /* margin-right: 1rem; */
      }

      &:hover {
        background-color: ${Colors.componentes.Button.backgroudPdvCupom};
      }
    `}

    ${({ theme }) =>
    theme === 'pdvPedido' &&
    css`
      background-color: ${Colors.componentes.Button.backgroudPdvPedido};
      color: ${Colors.componentes.Button.textColor};

      text-shadow: none;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 1.3rem;
      line-height: 2rem;

      border-radius: 0.6rem;

      svg {
        /* margin-right: 1rem; */
      }

      &:hover {
        background-color: ${Colors.componentes.Button.backgroudPdvPedido};
      }
    `}
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingIcon = styled(BsArrowRepeat)`
  animation: ${rotate} 1s linear infinite;
`;
