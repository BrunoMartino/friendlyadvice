import styled from 'styled-components';
import { backgroundInpera, colorText } from '../../../../utils/colorsInpera';

export const ContainerHeader = styled.header`
  display: flex;
  align-items: center;
  background: transparent;
  color: ${colorText};
  margin-bottom: 0.5rem;

  h1 {
    cursor: default;
    font-size: 2.4rem;
    margin: 0 0 0 0.48rem;
    color: ${(props) => (props.theme.title === 'dark' ? '#ecf0f5' : '#35373d')};
    font-weight: bold;

    .styleTitleSecundary {
      color: ${backgroundInpera};
    }
  }

  .iconFinanceiro {
    color: ${colorText};
    font-size: 3rem;
    margin-right: 0.48rem;
  }
`;
