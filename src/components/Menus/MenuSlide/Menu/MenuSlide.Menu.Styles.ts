import styled from 'styled-components';
import {
  backgroundInpera,
  backgroundLightSecundary,
  backgroundLightSecundary_50,
  colorText,
} from '../../../../utils/colorsInpera';

export const Container = styled.div`
  position: fixed;
  top: 7.539rem;
  left: 0;
  width: 30rem;
  z-index: 120;
  transition: all 500ms cubic-bezier(0.77, 0.01, 0.23, 1.01);

  .subMenu-divPai {
    position: absolute;
    left: 29rem;
    top: 0rem;
    width: 30rem;
    min-height: 100vh;
    background-color: ${backgroundLightSecundary_50};
    backdrop-filter: blur(0.9rem) !important;
    -webkit-backdrop-filter: blur(1rem);
    border-left: 0.2rem solid #66616926;

    p {
      font-size: 1.9rem;
      font-weight: 600;
    }

    .tittleSubMenu {
      border-bottom: 0.1rem solid #666169;
      color: #666169;
      padding-top: 0.2rem;
      padding-left: 0;
      width: 80%;
      cursor: default;
    }

    .buttonCloseMenu {
      position: absolute;
      left: 25.5rem;
      top: 0.3rem;
      border: none;
      font-size: 2rem;
      padding: 0 1rem;
      border-radius: 100%;
      z-index: 100;
      border: 0.1rem solid ${colorText};

      &:hover {
        color: ${backgroundInpera};
        font-size: 2.1rem;
        font-weight: bold;
        background-color: ${backgroundLightSecundary};
        border: 0.1rem solid ${backgroundInpera};
      }
    }

    @media screen and (max-width: 38.125em) {
      position: absolute;
      left: 0;
    }
  }
`;

export const Body = styled.div`
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;

  min-height: 100vh;
  background-color: ${backgroundLightSecundary_50};
  backdrop-filter: blur(0.9rem);

  p {
    font-size: 1.9rem;
    font-weight: 600;
  }

  .inputDiv {
    input {
      width: 87%;
      height: 3.5rem;
      padding: 0.2rem;
      padding-left: 2.9rem;
      padding-right: 0.3rem;
      border-radius: 1rem;
      font-size: 1.6rem;
      color: ${colorText};
      background-color: #f2b05e85;
      border: none;
    }

    .searchIcon {
      position: absolute;
      top: 2.3rem;
      /* left: 1rem; */
      border-right: 0.1rem solid ${colorText};
    }
  }

  .subTitle {
    margin: 1rem 0.5rem 1rem 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #666169;
  }

  .buttonCloseMenu {
    position: absolute;
    left: 26rem;
    border: none;
    font-size: 2rem;
    padding: 0 1rem;
    border-radius: 100%;
    z-index: 100;
    border: 0.1rem solid ${colorText};

    &:hover {
      color: ${backgroundInpera};
      font-size: 2.1rem;
      font-weight: bold;
      background-color: ${backgroundLightSecundary};
      border: 0.1rem solid ${backgroundInpera};
    }
  }
`;

export const NavItem = styled.div`
  display: flex;
  /* align-items: center; */

  p {
    margin-bottom: 1rem;
    padding-left: 1rem;
    color: ${colorText};
    align-items: center;
    cursor: pointer;
    padding-right: 5rem;
  }

  span {
    margin-right: 0.5rem;
    margin-bottom: 0.3rem;
  }

  .subItens {
    width: 100%;

    p {
      padding-left: 2rem;
      margin: 0;
      padding-left: 0;
      display: flex;
      align-items: center;
    }

    span {
      margin-left: 1.5rem;
      margin-bottom: 0.3rem;
    }

    &:hover {
      background-color: #f2b05e40;
      border-radius: 0.5rem;
      width: calc(93% - 1rem);
      margin-left: 1rem;
    }
  }
`;
