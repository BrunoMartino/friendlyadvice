import styled, { keyframes } from 'styled-components';

const appearFromLeftImg = keyframes`
  from {
    opacity: 0;
    transform: translateY(+7rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimationContainerLogo = styled.div`
  display: flex;
  animation: ${appearFromLeftImg} 2s;
`;
