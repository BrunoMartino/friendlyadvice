import styled from 'styled-components';
import { backgroundInpera, colorText } from '../../../../../utils/colorsInpera';

export const ContainerSales = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 0 0.64rem;

  p {
    font-size: 1.76rem;
    font-weight: 600;
    color: ${backgroundInpera};
  }

  .title {
    font-size: 1.76rem;
    color: ${colorText};
  }
`;
