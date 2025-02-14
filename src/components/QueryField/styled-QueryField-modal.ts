import styled from 'styled-components';

import { Colors } from '../../utils/colorsAtualizada';

export const Container = styled.div`
  position: fixed;

  inset: 0;
  width: 100vw;
  max-height: 100vh;
  background: rgba(46, 43, 44, 0.35);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  .div-main {
    width: 73.7rem;
    height: 59.4rem;
    background-color: ${Colors.InperaColors.backgroundMainColor};
    border-radius: 2rem;
    padding: 4.8rem;
  }
`;
