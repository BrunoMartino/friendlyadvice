import styled from 'styled-components';
import {
  backgroundInpera,
  backgroundLightSecundary,
  colorText,
} from '../../../utils/colorsInpera';
import { boxShadowDashboard, _mediaQuery } from '../../../utils/consts';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  width: 100%;
  padding: 0.8rem 0;
`;

export const BoxValue = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${backgroundLightSecundary};
  border: none;
  margin-right: 1rem;
  color: ${colorText};
  box-shadow: ${boxShadowDashboard};

  &:last-child {
    margin-right: 0;
  }

  h2 {
    display: flex;
    flex: 1;
    height: 100vh;
    justify-content: flex-start;
    align-items: center;
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: 0;
    margin-left: 0.5rem;
  }

  h1 {
    text-align: center;
    align-items: center;
    font-weight: 600;
    font-size: 5rem;
    padding: 1.6rem;
    color: ${backgroundInpera};
  }

  hr {
    margin: 0;
    border-top: 0.1rem solid ${colorText};
  }

  @media (max-width: ${_mediaQuery}px) {
    margin-right: 0;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 1rem;
    }
  }
`;

export const ContainerBox = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  margin-top: 0.48rem;

  @media (max-width: ${_mediaQuery}px) {
    flex-flow: row wrap;
  }
`;
