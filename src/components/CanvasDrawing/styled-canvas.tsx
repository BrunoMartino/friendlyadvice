import styled from 'styled-components';

export const CanvasContainer = styled.div<{ height?: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  .board {
    border: 1px dashed #c0c0c0;
    border-radius: 0.5rem;
  }

  canvas {
    width: 100%;
    height: ${({ height }) => (height ? `${height}px` : 'auto')};
    display: block;
  }

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    width: 100%;

    div {
      display: flex;
      flex-direction: row;
      justify-content: start;
    }

    button{
      width: 100%;
      max-width: 12rem;
    }

  }

  button {
    width: 16rem;
    margin-top: 0.6rem;
    height: 2.6rem;

    :nth-child(1) {
      background-color: white;
    }

    :nth-child(2) {
      color: white;
    }
  }
`;
