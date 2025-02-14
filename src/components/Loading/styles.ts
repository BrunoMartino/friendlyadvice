import styled from 'styled-components';

export const Container = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Spinner = styled.div`
  /* General styles end */

  position: relative;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;

  &::before,
  &:after {
    content: '';
    position: absolute;
    border-radius: inherit;
  }
  &:before {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(0deg, #f2b05e 0%, #e4e0dd 100%);
    animation: spin 0.5s infinite linear;
  }
  &:after {
    width: 85%;
    height: 85%;
    background-color: #ebe8e4;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
