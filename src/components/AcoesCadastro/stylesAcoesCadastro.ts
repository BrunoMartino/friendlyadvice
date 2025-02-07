import styled, { css } from 'styled-components';
import {
  backgroundGrid,
  backgroundInpera,
  borderGrid,
  colorText,
} from '../../utils/colorsInpera';

interface iAcoes {
  backgroundColor?: string;
  desabilitar?: boolean;
  isFirst?: boolean;
  breakWidth?: number;
  system?: any;
  isAbsolute?: boolean
}

export const Container = styled.div<iAcoes>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  border-bottom: ${(props: any) =>
    props.backgroundColor ? props.backgroundColor : borderGrid};

  background: ${(props: any) =>
    props.backgroundColor ? props.backgroundColor : backgroundGrid};

  border-right: ${(props: any) =>
    props.backgroundColor ? props.backgroundColor : borderGrid} !important;



  ${({ breakWidth }) => css`
    #edit,
    #delete {
      @media (max-width: ${breakWidth}px) {
        display: none;
      }
    }
  `}


  @media (max-width: 827px) {
    height: 100%;
    //border-left: ${borderGrid};
  }

  .opcoes {
    display: flex;
    align-items: center;

    ${({ isAbsolute }) =>
      isAbsolute &&
      css`
        position: absolute;
      `
    }

    svg {
      color: ${colorText};
      font-size: 1.6rem;

      transition: filter 0.2;

      &:hover {
        filter: brightness(95%);
      }
    }

    .dropdown-toggle::after {
      display: none;
    }

    .dropdown-toggle {
      height: 2.5rem;
      display: flex;
      align-items: center;
      padding: 0;
      margin: 0;
    }
    .show {
      width: inherit;
    }
    /* .dropdown-item {
      background: ${backgroundGrid};
      color: ${colorText};
      width: inherit;
      padding-left: 1rem;
    } */
    .dropdown-menu {
      width: inherit;
      background: ${backgroundGrid};
    }

    .dropdown-item {
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 1.4rem;
      color: ${colorText};
      /* width: 102%; */
      width: 100%;
      padding-left: 1rem;
      background: ${backgroundGrid};
      font-weight: 400;
      border-bottom: 0.1rem;
      border-style: solid;
      border-color: ${backgroundInpera};
      height: auto;

      svg {
        color: ${backgroundInpera};
      }
    }
    .dropdown-item svg {
      font-size: 1.6rem;
    }
  }

  ${(props) =>
    props.desabilitar &&
    css`
      .desativado {
        opacity: 0.3;
        color: ${backgroundGrid};
      }
    `}
`;
