import styled, { keyframes } from 'styled-components';
import { Colors } from '../../utils/colorsAtualizada';

const expandAnimation = keyframes`
  0% {
    transform: scaleY(0);
    transform-origin: top;
    padding: 0 0;
  }
  100% {
    transform: scaleY(1);
    transform-origin: top;
    padding: 3rem 0;
  }
`;

export const Container = styled.div`
  position: fixed;
  /* background-color: rgba(0, 0, 0, 0.6); */
  width: 100vw;
  height: 100vh;
  z-index: 1070;
  overflow: hidden;
  inset: 0;
  z-index: 2001;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 100%; */
  /* width: 45rem; */
  /* max-width: 90%; */
  margin: 0 auto;
`;

export const Body = styled.div`
  padding: 1.3rem;
  min-height: 40rem;
  max-height: auto;
  width: 60rem;
  max-width: 90%;
  margin: 0 auto;
  background-color: #f9f7f2;
  border-radius: 2rem;

  header {
    margin-top: 3.2rem;
    display: flex;
    align-items: center;
    width: 100%;
    gap: 6px;
    justify-content: center;

    h1 {
      margin: 0;
      color: #df8f2e;
    }
  }

  display: flex;
  flex-direction: column;

  justify-content: space-around;

  .error-div {
    display: flex;
    max-height: 50rem;
    height: 75%;
    padding: 2rem !important;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    animation: ${expandAnimation} 0.5s ease-in-out forwards;

    span {
      padding: 0 0 1.5rem 0;
      font-weight: bold;
      font-size: 1.35rem;
    }

    .pedido-erros {
      display: flex;
      flex-direction: column;
      align-items: flex-start !important;
      justify-content: start !important;
      height: 100%;
      padding: 0 0 0 3rem;
      overflow-y: auto;
      width: 100%;

      strong {
        font-size: 1.3rem;
      }

      p {
        text-indent: 1.25rem;
        font-size: 1.1rem;
        font-style: italic;
        color: #df8f2e;
      }
    }

    p {
      font-weight: bold;
      color: ${Colors.TextColors.textGray30};
      font-size: 1.3rem;
      text-align: center;
    }

    .exist-other-errors {
      margin-top: 0.6rem;
      width: 100%;
      display: flex;
      justify-content: center;
      align-content: center;

      strong {
        font-style: italic;
        align-items: center;
      }
    }
  }
`;
