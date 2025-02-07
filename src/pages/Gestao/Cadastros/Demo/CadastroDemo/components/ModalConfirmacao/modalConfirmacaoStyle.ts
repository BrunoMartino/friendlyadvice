import styled from 'styled-components';
import { Colors } from '../../../../../../../utils/colorsAtualizada';

export const Container = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  z-index: 1070;
  overflow: hidden;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const Header = styled.div`
  background-color: #e4e0dd;
  width: 38rem;
  max-width: 90%;
  border-radius: 1rem 1rem 0 0;
  margin: 0 auto;
  padding: 2rem;

  .text-area {
    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: start;

    h1 {
      font-size: 2.2rem;
      font-weight: bolder;
      color: ${Colors.TextColors.textGray30};
    }

    span {
      font-size: 1.6rem;
      color: ${Colors.TextColors.textWhiteGray};
    }
  }
`;

export const Body = styled.div`
  padding: 0 2rem 2rem 2rem;
  min-height: 10rem;
  width: 38rem;
  max-width: 90%;
  border-radius: 0 0 1rem 1rem;
  margin: 0 auto;
  background-color: #f9f7f2;

  .content-body {
    color: #2c2c2c;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .button-area {
    display: flex;
    justify-content: center;
    flex-direction: row;

    gap: 0.6rem;

    div {
      width: 100%;

      .button-p {
        padding: 0.4rem 0;
      }
    }
  }

  .input-area {
    padding: 1.6rem 0;
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;

    div {
      width: 100%;
    }
  }
`;
