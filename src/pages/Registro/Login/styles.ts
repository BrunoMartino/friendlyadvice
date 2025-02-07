import styled, { css, keyframes } from 'styled-components';
import { shade } from 'polished';
import signInBackgroundImg from '../../../assets/sign-in-background.png';
import {
  backgroundGrid,
  backgroundInpera,
  backgroundInpera10,
  colorText,
} from '../../../utils/colorsInpera';

export const Container = styled.div<any>`
  display: flex;
  height: 100vh;

  /* background: url(${signInBackgroundImg}) no-repeat right; */
  background: url(${signInBackgroundImg}) no-repeat center;

  background-size: contain;

  @media (max-height: 360px) {
    padding: 2rem;
    height: 100%;
  }

  @media (max-width: 61em) {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${backgroundInpera10};
    opacity: 100%;
    min-height: 0;
  }
`;

export const Content = styled.div`
  display: flex;

  flex-direction: column;
  align-self: center;
  justify-content: center;
  width: inherit;

  > a {
    color: #f4ede8;
    display: block;

    text-decoration: none;
    transition: color 0.2s;
    font-size: 1.6rem;
    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
    a {
      color: #b7022c;
    }
  }

  .form {
    display: flex;

    flex-direction: column;
    align-self: center;
    justify-content: center;

    .inputDiv {
      .input {
        background-color: ${backgroundGrid};
        border: 0.1rem solid ${colorText};

        font-size: 1.7rem;
        font-family: 'Source Sans Pro', sans-serif;
        border-radius: 0;
        &:focus {
          border: 0.1rem solid ${backgroundInpera} !important;
        }
      }
    }

    .link {
      display: flex;
      justify-content: center;
      align-items: center;

      color: ${backgroundInpera};

      font-size: 1.8rem;
      font-weight: 400;
      font-family: 'Source Sans Pro', sans-serif;
      padding: 0.5rem;

      cursor: pointer;
      transition: filter 2s;

      &:hover {
        filter: contrast(10%);
      }

      svg {
        margin-right: 1.5rem;
        font-size: 2rem;
        cursor: pointer;
      }
    }
  }

  .Logo {
    display: flex;
    align-self: flex-start;
  }

  @media (max-width: 61em) {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    align-self: center;
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }


`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40rem;
  animation: ${appearFromLeft} 1s;
  padding: 0 2.5rem;

  @media (max-width: 526px) {
    align-items: center;
    width: 100%;
    padding: 0;
  }

  form {
    display: flex;
    flex: 1;
    width: 30rem;
    flex-direction: column;

    .btnEntrar {
      width: 100%;
    }
  }
`;
