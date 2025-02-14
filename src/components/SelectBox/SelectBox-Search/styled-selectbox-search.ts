import styled, { css } from 'styled-components';
import { Colors } from '../../../utils/colorsAtualizada';
import {
  colorText,
  backgroundInperaInput,
  borderInput,
} from '../../../utils/colorsInpera';

interface ISelectDefaultProps {
  searchActive?: boolean;
  styleMethod?: string;
  disabled?: boolean;
  dontSearch?: boolean;
  theme?: string;
  borderless?: boolean;
  marginTop?: string
}
interface liSelectProps {
  padding?: string;
  disabled?: boolean;
  styleMethod?: string
}

export const Content = styled.div<ISelectDefaultProps>`
  border: none;
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '')};

  input:focus {
    outline: none;
    border: none;
  }
`

export const DropDownContainer = styled.div<ISelectDefaultProps>`
  background: '#EBE8E4';
  // border: 0.1rem solid ${borderInput};
  border: ${({ borderless }) => (borderless ? 'none' : `0.1rem solid ${borderInput}`)};
  position: relative;
  #divSearch {
    input:focus {
      outline: none;
    }

    ${({ styleMethod }) =>
      styleMethod === 'vendas' &&
      css`
        &:focus-within {
          border: 0.1rem solid #e8ad65;
          border-radius: 1rem;
        }
      `}/* ${({ styleMethod }) =>
      styleMethod === 'vendas2' &&
      css`
        border: none;
        &:focus-within {
          border: 0.1rem solid #e8ad65;
          border-radius: 1rem;
        }
      `} */
  }

  .icon-left {
    display: none;
    width: auto;

    ${({ styleMethod }) =>
      styleMethod === 'vendas' &&
      css`
        margin-bottom: 1rem;
      `}
    ${({ styleMethod }) =>
      styleMethod === 'vendas2' &&
      css`
        margin-bottom: 1rem;
      `}
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: auto;
      opacity: 0.3;
    `}

  ${({ dontSearch }) =>
    dontSearch &&
    css`
      cursor: pointer;
    `}

  ${({ styleMethod }) =>
    styleMethod === 'vendas' &&
    css`
      border: 0.1rem solid white;
      border-radius: 0.2rem;
    `}
  ${({ styleMethod }) =>
    styleMethod === 'vendas2' &&
    css`
      border: none;
      border-radius: 0.2rem;
    `}

  ${({ styleMethod }) =>
    styleMethod === 'cadastroEmpresa' &&
    css`
      border-radius: 0.5rem;
    `}

  /* &:hover {
    background-color: #ebe8e4;
    border: 0.1rem solid #e8ad65 !important;
  } */
  ${({ styleMethod }) =>
    styleMethod !== 'vendas' &&
    css`
      &:focus-within {
        border: 0.1rem solid #e8ad65;
      }
    `}

  ${({ styleMethod }) =>
    styleMethod === 'vendas' &&
    css`
      .icon-left {
        display: flex !important;
        position: absolute;
        z-index: 10;
        bottom: 1rem;
        left: 1rem;
      }
    `}
  /* ${({ styleMethod }) =>
    styleMethod !== 'vendas2' &&
    css`
      &:focus-within {
        border: 0.1rem solid #e8ad65;
        border-radius: 1rem;
      }
    `} */

  ${({ styleMethod }) =>
    styleMethod === 'vendas2' &&
    css`
      .icon-left {
        display: flex !important;
        position: absolute;
        z-index: 10;
        bottom: 1rem;
        left: 1rem;
      }
    `}

  .button-toggle {
    border: 0.2rem solid #e8ad65;
    border-radius: 3px;
    background-color: #e19537 !important;

    &:hover {
      color: #fff;
      border: 0.2rem solid #2b2b2b;
      cursor: pointer;
    }
  }
`;

export const DropDownHeader = styled('div')<ISelectDefaultProps>`
  input {
    position: relative;
    border: transparent;
    width: 100%;
    /* min-width: 3rem; */
    /* background-color: #faf4ed; */
    background: 'transparent';

    text-align: left;
    padding: 0.3rem;
    cursor: text;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
    font-weight: 500;
    font-size: 1.35rem;

    color: ${colorText};
    border: ${borderInput};

    /* &:focus-within {
      border: #e8ad65;
    } */

    @media screen and (max-width: 650px) {
      /* padding: 0.3rem 0.2rem; */
      padding: 0.3rem 0.2rem;
    }

  }

  @media screen and (min-width: 650px) {
    /* padding-left: 0.5rem; */
    /* height: 2.7rem; */
  }


  ${({ styleMethod }) =>
    styleMethod === 'cadastroEmpresa' &&
    css`
      input {
        --border-color: #564f5240;
        --border-focus: #fca53b;
        --background-color: #fff;
        --icon-color: #564f5280;
        --icon-focus: #fca53b;
        --input-width: 100%;
        --input-height: 3.85rem;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        box-sizing: border-box;

        border: 1px solid var(--border-color);
        /* border: 0.1rem solid red; */

        border-radius: 0.5rem;
        font-weight: 500;
        -webkit-transition: 200ms ease-in-out;
        transition: 200ms ease-in-out;
        background-color: var(--background-color);
        padding: 0 0.6rem 0 0.6rem;
        height: var(--input-height);
        width: var(--input-width);
        overflow: hidden;

        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 1.25rem;
        line-height: 2rem;
      }
    `}

  ${({ styleMethod }) =>
    styleMethod === 'vendas' &&
    css`
      input {
        display: flex;
        padding: 2rem 2rem 2rem 5rem;
        color: black;
        align-items: center;
        height: 2.7rem;
        background-color: #ebe8e4;
        /* border: 0.2rem solid white; */
        border-radius: 1rem;
        font-family: 'Montserrat', sans-serif;

        &:hover {
          border: none !important;
        }

        @media screen and (max-width: 600px) {
          /* padding: 1.5rem; */
        }

        @media screen and (max-width: 72em) {
          input {
            width: 15rem;
          }
        }

        &:focus-within {
          /* border: 0.1rem solid #e8ad65; */
          border: none;
        }
      }
    `}
  ${({ styleMethod }) =>
    styleMethod === 'vendas2' &&
    css`
      input {
        display: flex;
        padding: 2rem 2rem 2rem 5rem;
        color: black;
        align-items: center;
        height: 2.7rem;
        background-color: #ebe8e4;
        /* border: 0.2rem solid white; */
        border-radius: 1rem;
        font-family: 'Montserrat', sans-serif;

        &:hover {
          border: none !important;
        }

        @media screen and (max-width: 600px) {
          /* padding: 1.5rem; */
        }

        @media screen and (max-width: 72em) {
          input {
            width: 15rem;
          }
        }

        &:focus-within {
          /* border: 0.1rem solid #e8ad65; */
          border: none;
        }
      }
    `}

      ${({styleMethod}) => styleMethod === 'bubble' && css`
        input {
        --border-color: #564f5240;
        --border-focus: #fca53b;
        --background-color: #fff;
        --icon-color: #564f5280;
        --icon-focus: #fca53b;
        --input-width: 100%;
        --input-height: 3.3rem;

        display: flex;
        align-items: center;
        

        font-weight: 500;
        -webkit-transition: 200ms ease-in-out;
        transition: 200ms ease-in-out;
        background-color: var(--background-color);
        padding: 1rem;
        width: var(--input-width);
        height: var(--input-height);
        overflow: hidden;

        font-style: normal;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2rem;
        box-shadow: none;

        &:focus-within {
          border: 0.1rem solid red !important;
          border: none !important;
        } 
      }
      `}

    ${({ styleMethod }) =>
    styleMethod === 'cadastros' &&
    css`
      input {
        --border-color: #564f5240;
        --border-focus: #fca53b;
        --background-color: #fff;
        --icon-color: #564f5280;
        --icon-focus: #fca53b;
        --input-width: 100%;
        --input-height: 3.3rem;

        display: flex;
        align-items: center;

        /* border: 0.1rem solid red; */

        font-weight: 500;
        -webkit-transition: 200ms ease-in-out;
        transition: 200ms ease-in-out;
        background-color: var(--background-color);
        padding: 1rem;
        width: var(--input-width);
        height: var(--input-height);
        overflow: hidden;

        font-style: normal;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2rem;
        box-shadow: none;
      }
    `}

    ${({ styleMethod }) =>
    styleMethod === 'confFaciliteSmart' &&
    css`
      input {
        /* display: flex;
        padding: 2rem 2rem 2rem 5rem;
        color: black;
        align-items: center;
        height: 2.7rem;
        background-color: #ebe8e4;
        /* border: 0.2rem solid white;
        border-radius: 1rem; */
        font-family: 'Source Sans Pro', sans-serif;
/*
        &:hover {
          border: none !important;
        }

        @media screen and (max-width: 600px) {
          /* padding: 1.5rem;
        }

        @media screen and (max-width: 72em) {
          input {
            width: 15rem;
          }
        }

        &:focus-within {
          /* border: 0.1rem solid #e8ad65;
          border: none;
        } */
      }
    `}
`;

export const DropDownListContainer = styled.div<ISelectDefaultProps>`
  position: relative;

  ${({ styleMethod }) =>
    styleMethod === 'vendas' &&
    css`
      top: 1rem;
      /* margin-top: 1rem; */
      border: none;
    `}
  ${({ styleMethod }) =>
    styleMethod === 'vendas2' &&
    css`
      top: 1rem;
      /* margin-top: 1rem; */
      border: none;
    `}
`;

export const DropDownList = styled.ul<ISelectDefaultProps>`
  position: absolute;
  cursor: pointer;
  z-index: 10;
  max-height: 12.5rem;
  overflow: auto;

  ${({ styleMethod }) =>
    styleMethod === 'cadastroEmpresa' &&
    css`
      border-radius: 0 0 0.3rem 0.3rem;
    `}

  width: 100%;
  padding: 0;
  margin: 0;
  background: #ffffff;
  border: 0.2rem solid #e5e5e5;
  box-sizing: border-box;
  color: ${colorText};
  font-size: 1.3rem;
  font-weight: 500;
`;

export const ListItem = styled.li<liSelectProps>`
  list-style: none;
  padding: ${({ padding }) => (padding ? padding : '0.5rem')};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};

  ${({ styleMethod }) =>
    styleMethod === 'cadastroEmpresa' &&
    css`
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 1.25rem;
      line-height: 2rem;

      border-radius: 0.3rem;
      &:hover {
        background-color: ${Colors.componentes.inputDefault
          .backgroundHover} !important;
      }
    `}

  ${({ styleMethod }) =>
    styleMethod === 'vendas' &&
    css`
      &:hover {
        background-color: #f2b05e !important;
        border-radius: 0.3rem;
      }
    `}

  &:hover {
    color: #2b2b2b;
    background-color: ${backgroundInperaInput};
  }
  ${({ styleMethod }) =>
    styleMethod === 'vendas2' &&
    css`
      &:hover {
        background-color: #f2b05e !important;
        border-radius: 0.3rem;
      }
    `}

  &:hover {
    color: #2b2b2b;
    background-color: ${backgroundInperaInput};
  }
`;
