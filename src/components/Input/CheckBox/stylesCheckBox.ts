import styled from 'styled-components';
import {
  backgroundInpera45,
  borderGridColor,
} from '../../../utils/colorsInpera';

export const Container = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: center;

  .checkbox {
    display: inline-block;
    width: 2rem;
    height: 2rem;

    border: '0.1rem solid #e6e6f0';

    border: 0.1rem solid ${borderGridColor};
    background: ${backgroundInpera45};

    cursor: pointer;
  }
`;
