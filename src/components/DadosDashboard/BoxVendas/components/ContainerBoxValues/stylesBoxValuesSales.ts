import styled from 'styled-components';
import {
  backgroundInpera,
  backgroundLightSecundary,
  colorText,
} from '../../../../../utils/colorsInpera';
import { boxShadowDashboard, _mediaQuery } from '../../../../../utils/consts';

export const ContainerBoxValuesSales = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${backgroundLightSecundary};
  box-shadow: ${boxShadowDashboard};

  h2 {
    margin: 0.64rem 0 0 0.64rem;
    font-weight: 600;
    font-size: 1.9rem;
    color: ${colorText};
  }

  hr {
    margin: 0 0 0.64rem 0;
    border-top: 0.1rem solid ${colorText};
  }

  margin-right: 1rem;

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: ${_mediaQuery}px) {
    margin-right: 0;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 1rem;
    }
  }
`;
