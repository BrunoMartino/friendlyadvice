import styled, { css } from 'styled-components';

import {
  greenInpera,
  backgroundGrid,
  backgroundInpera,
  backgroundInpera45,
  colorWhite,
  colorPlaceHolder,
  colorText,
  redInpera,
  borderGrid,
  backgroundInpera10,
} from '../../utils/colorsInpera';

interface ILoading {
  isLoading?: boolean;
  breakWidth?: number;
}

export const Container = styled.div<ILoading>`
  display: flex;
  flex-direction: column;

  height: inherit;

  font-family: 'Source Sans Pro', sans-serif;

  padding-top: 1rem;

  @media (min-width: 900px) {
    margin: 0 0.5rem;
  }

  .create-div {
    max-width: 31.5rem;
    flex-wrap: nowrap;
    min-width: 10rem;
  }
`;

export const HeaderAction = styled.header<any>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  font-family: 'Source Sans Pro', sans-serif;
  position: sticky;
  top: ${({ spaceTop }) => (spaceTop ? spaceTop : 0)}px;
  background-color: ${backgroundInpera10};
  /* background-color: ${({ colorHeader }) => (colorHeader ? '#ebe8e4' : '#f2e1cc')}; */
  // background-color: #f2e1cc;
  z-index: 999;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${backgroundInpera};

  ${({ breakWidth, hasPadding }) => css`
    @media (max-width: ${breakWidth}px) {
      ${hasPadding ? 'padding: 0 0.5rem !important' : ''};
      max-width: 98vw;
      justify-content: space-between;
      align-items: center;
      left: 5px;
    }
  `}
`;

export const TitleContainer = styled.div<any>`
  display: flex;
  flex-direction: column;
`

export const SubTitlePage = styled.div<any>`
  display: flex;
  align-items: baseline;
  justify-content: start;

  .subtitle {
    display: flex;
    align-self: flex-end;

    @media (max-width: 583px) {
      align-items: center;
    }

    height: 4.2rem;

    .text {
      font-size: 2.2rem;
      font-family: 'Source Sans Pro', sans-serif;
      color: ${colorText};
      display: flex;
      align-items: center;

      @media (max-width: 615px) {
        font-size: 1.8rem;
      }

      @media (max-width: 570px) {
        font-size: 1.6rem;
      }

      @media (max-width: 400px) {
        font-size: 1.5rem;
      }

      @media (max-width: 360px) {
        font-size: 1.4rem;
      }
    }
  }
`;

export const TitlePage = styled.div<any>`
  display: flex;
  align-items: baseline;
  /* justify-content: end; */

  .title {
    display: flex;
    align-self: flex-end;

    @media (max-width: 583px) {
      align-items: center;
    }

    height: 4.2rem;

    .iconeTitle {
      display: flex;
      align-self: flex-end;
      color: ${backgroundInpera};

      margin-bottom: 0.8rem;
      margin-right: 1rem;
      padding: 0;

      height: 2.4rem;
      width: 2.4rem;

      svg {
        font-size: 2.4rem;
      }
    }

    .text {
      font-size: 2.9rem;
      font-family: 'Source Sans Pro', sans-serif;
      color: ${colorText};
      display: flex;
      align-items: center;

      @media (max-width: 750px) {
        font-size: 2.5rem;
      }

      @media (max-width: 615px) {
        font-size: 2rem;
      }

      @media (max-width: 570px) {
        font-size: 1.8rem;
      }

      @media (max-width: 400px) {
        font-size: 1.6rem;
      }

      @media (max-width: 360px) {
        font-size: 1.5rem;
      }
    }
  }
`;

export const ButtonActions = styled.div<any>`
  display: flex;
  gap: 1rem;

  button {
    border-radius: 2px !important;
  }

  @media (max-width: 827px) {
    button {
      width: 15.6rem;
    }
  }

  @media (max-width: 450px) {
    button {
      width: 11.5rem;
    }
  }

  .btn-tela {
    width: 15.6rem;
    height: 4rem;
    margin: 1rem 0;

    padding: 0.375rem 0.75rem;

    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 700;
    font-size: 2rem;
    background: ${greenInpera};
    color: ${colorWhite};
    border: none;
    transition: filter 0.2;

    @media (max-width: 550px) {
      min-width: 13.6rem;
      max-width: 13.6rem;
      width: 13.6rem;
    }

    @media (max-width: 450px) {
      min-width: 10rem;
      max-width: 10rem;
      width: 10rem;
    }

    @media (max-width: 350px) {
      min-width: 8rem;
      max-width: 8rem;
      width: 8rem;
    }

    &:hover {
      filter: brightness(95%);
    }
  }

  .btn.cancel {
    background: ${redInpera};

    width: 15.6rem;
    height: 4rem;
    margin: 1rem 0;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 2rem;
    font-weight: 700;

    color: ${colorWhite};

    border: none;

    transition: filter 0.2;

    @media (max-width: 550px) {
      min-width: 13.6rem;
      max-width: 13.6rem;
      width: 13.6rem;
    }

    @media (max-width: 450px) {
      min-width: 10rem;
      max-width: 10rem;
      width: 10rem;
    }

    @media (max-width: 350px) {
      min-width: 8rem;
      max-width: 8rem;
      width: 8rem;
    }

    &:hover {
      filter: brightness(95%);
    }
  }
`;

export const Separator = styled.hr<any>`
  height: 0.1rem;
  width: 100%;
  background: ${backgroundInpera};
`;

export const ContentOptions = styled.div<any>`
  /* max-width: 100%;
  width: 98vw;
  margin: 0 auto; */
  padding: 1rem 0;
  align-items: center;

  ${({ hasMoreField, breakWidth }) =>
    !hasMoreField &&
    css`
      display: grid;
      grid-template-columns: 1fr min-content;
      width: 100%;
      gap: 1rem;

      /* @media (max-width: 440px) {
        width: 100%;
        display: flex;
        flex-direction: column;
      } */
    `}

  ${({ breakWidth, hasMoreField }) =>
    hasMoreField &&
    css`
      @media (min-width: ${breakWidth}px) {
        display: flex;
        justify-content: space-between;
        /* max-width: 100%;
        width: 98vw;
        margin: 0 auto; */
        gap: 1rem;
      }
    `}

    ${({ breakWidth, hasMoreField }) =>
    hasMoreField &&
    css`
      @media (max-width: ${breakWidth}px) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 100%;
        width: 98vw;
        margin: 0 auto;
        gap: 1rem;
      }
    `}
`;

export const Section = styled.section<any>`
  ${({ hasMoreField }) =>
    hasMoreField &&
    css`
      display: flex;
      width: 100%;
    `}

  ${({ hasMoreField }) =>
    !hasMoreField &&
    css`
      display: grid;
      grid-template-columns: 1fr min-content;
    `}

  .escolha {
    margin-right: 0.5rem;
  }
`;

export const Form = styled.form<any>`
  display: grid;
  grid-template-columns: 1fr min-content;

  width: inherit;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.4rem;
  font-weight: 200;

  ${({ breakWidth }) => css`
    @media (max-width: ${breakWidth}px) {
      /* width: 80vw; */
      width: 100%;
    }

    /* @media (max-width: 440px) {
      width: 98vw;
    } */
  `}

  input {
    background: ${backgroundGrid};
    border: ${borderGrid};
    color: ${colorText};

    height: 3.5rem;
    padding: 0 1rem;
    font-family: 'Source Sans Pro', sans-serif;
    min-width: 154px;

    ::placeholder {
      color: ${colorPlaceHolder};
      font-family: 'Source Sans Pro', sans-serif;
    }
  }

  #search-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 3.5rem;
    width: 5rem;

    border-top: ${borderGrid};
    border-bottom: ${borderGrid};
    border-right: ${borderGrid};
    border-left: ${borderGrid};

    background: ${backgroundInpera45};
    cursor: pointer;

    svg {
      display: flex;
      align-self: center;
      justify-content: center;

      text-align: center;

      font-size: 2.3rem;
      color: ${colorText};
    }
  }

  input[type='search']::-webkit-search-cancel-button {
    padding: 0.1rem;
    cursor: pointer;
  }
`;

export const Icons = styled.div<any>`

  display: flex;

  ${({ breakWidth, hasMoreField }) =>
    hasMoreField &&
    css`
      @media (max-width: ${breakWidth}px) {
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
    `}

  /* ${({ breakWidth, hasMoreField }) =>
    !hasMoreField &&
    css`
      @media (max-width: 440px) {
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
    `} */

  /* ${({ breakWidth, hasMoreField }) =>
    !hasMoreField &&
    css`
      @media (max-width: ${breakWidth}px) {
        display: flex;
      }

      @media (max-width: 420px) {
        display: flex;
        flex-wrap: wrap;
      }
    `} */

  svg {
    font-size: 3.5rem;
    color: ${greenInpera};

    cursor: pointer;
    transition: filter 0.2;

    &:hover {
      filter: brightness(90%);
    }

    &:last-child {
      font-size: 3rem;
      margin-top: 0.2rem;
      color: ${redInpera};
    }
  }
`;
