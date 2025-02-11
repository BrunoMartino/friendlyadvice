import styled, { css } from 'styled-components';
import { backgroundInpera, backgroundInpera10 } from '../../utils/colorsInpera';

interface IStylesModalList {
  width: string | undefined;
  height: string | undefined;
  breakMobile?: number;
}

export const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  width: 100%;
  height: 100%;

  z-index: 1301;
  background-color: rgba(0, 0, 0, 0.9);

  .line-separator {
    width: 100%;
    height: 0.1rem;
    background-color: ${backgroundInpera};
    margin: 0.5rem 0;
  }

  .paginacao {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const Modal = styled.div<IStylesModalList>`
  margin: 3rem auto;
  opacity: 1;
  padding: 1rem 2rem;
  max-width: ${({ width }) => (width ? width : '60rem')};
  width: 100%;
  height: ${({ height }) => (height ? height : '60rem')};
  overflow: hidden;
  background-color: ${backgroundInpera10};

  ${({ breakMobile }) =>
    breakMobile &&
    css`
      @media (max-width: ${breakMobile}px) {
        position: absolute;
        inset: 0;
        height: 110vh;
        width: 100vw;
        min-height: 125vh;
        min-width: 100vw;
        margin: 0 auto;
        padding-bottom: 15rem;
      }
    `}

  .div-search {
    padding-top: 0.5rem;
    padding-bottom: 1rem;
  }
`;
