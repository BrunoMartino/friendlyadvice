import styled from 'styled-components';
import { Overlay } from '../shared-styles';

interface ModalProps {
  width?: number;
  height?: number;
  maxWidth?: number;
  maxHeight?: number;
  minWidth: number;
  minHeight: number;
}

const ModalContainerCenter = styled.div<ModalProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fbfbfb;
  z-index: 99999;
  padding: 1.6rem;
  height: ${({ height }) => (height ? `${height}rem` : '100%')};
  width: ${({ width }) => (width ? `${width}rem` : '100%')};
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}rem` : '100%')};
  max-height: ${({ maxHeight }) => (maxHeight ? `${maxHeight}rem` : '100%')};
  min-width: ${({ minWidth }) => (minWidth && `${minWidth}rem`)};
  min-height: ${({ minHeight }) => (minHeight && `${minHeight}rem`)};
  border-radius: 1rem;

  h2 {
    font-family: Poppins, sans-serif;
    font-size: 1.8rem;
    font-weight: 500;
    color: black;
    /* padding: 0.6rem 0.6rem 1.6rem 1.6rem; */
  }

  h3 {
    font-family: Poppins, sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: black;
    padding: 1rem 0;
  }
`;

export const ModalFlutterCenter = {
  Overlay,
  ModalContainerCenter,
};
