import styled from 'styled-components';
import {
  backgroundInpera,
  backgroundLightSecundary,
  colorText,
} from '../../../utils/colorsInpera';
import { boxShadowDashboard, _mediaQueryGraficos } from '../../../utils/consts';

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  justify-content: center;
  background: transparent;
  padding: 0.8rem 0;

  p {
    background: ${backgroundLightSecundary};
    box-shadow: ${boxShadowDashboard};
  }

  p {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.6rem;
    font-weight: bold;
    color: ${colorText};
  }
`;

export const ContainerConteudo = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.28rem;
  background: ${backgroundLightSecundary};
  flex: 1;
  align-content: space-between;
  box-shadow: ${boxShadowDashboard};

  @media (max-width: ${_mediaQueryGraficos}px) {
    flex-flow: row wrap;
  }

  .grafico {
    width: 50%;
    height: 26.5rem;
    padding-left: 3.2rem;

    @media (max-width: ${_mediaQueryGraficos}px) {
      width: 100%;
      padding-left: 0;
    }

    .custom-tooltip {
      background: #fff;
      text-align: center;
      padding-left: 1rem;
      padding-right: 1rem;
      border: 0.1rem solid ${backgroundInpera};
    }

    .label {
      padding-top: 0.5rem;
      font-weight: 600;
      color: #000;
    }
  }

  .legenda {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.8rem;
    color: ${colorText};
    font-size: 1.6rem;

    .itemLegenda {
      display: flex;
      align-items: center;

      svg {
        margin-right: 0.8rem;
        font-size: 1.6rem;
      }
    }
  }
`;
