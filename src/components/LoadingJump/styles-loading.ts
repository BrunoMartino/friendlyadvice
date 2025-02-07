import styled from 'styled-components';
import { backgroundInpera } from '../../utils/colorsInpera';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30rem;
  width: 100%;

  .dots-bars-4 {
    width: 7.4rem;
    height: 3.5rem;
    --c: radial-gradient(farthest-side, ${backgroundInpera} 93%, #0000);
    background: var(--c) 0 0, var(--c) 50% 0, var(--c) 100% 0;
    background-size: 1.8rem 1.8rem;
    background-repeat: no-repeat;
    position: relative;
    animation: db4-0 1s linear infinite alternate;
  }
  .dots-bars-4:before {
    content: '';
    position: absolute;
    /* width: 0.8rem;
    height: 1.2rem; */
    width: 1.2rem;
    height: 1.6rem;
    background: ${backgroundInpera};
    left: 0;
    top: 0;
    animation: db4-1 1s linear infinite alternate,
      db4-2 0.5s cubic-bezier(0, 200, 0.8, 200) infinite;
  }

  @keyframes db4-0 {
    0% {
      background-position: 0 100%, 50% 0, 100% 0;
    }
    8%,
    42% {
      background-position: 0 0, 50% 0, 100% 0;
    }
    50% {
      background-position: 0 0, 50% 100%, 100% 0;
    }
    58%,
    92% {
      background-position: 0 0, 50% 0, 100% 0;
    }
    100% {
      background-position: 0 0, 50% 0, 100% 100%;
    }
  }

  @keyframes db4-1 {
    100% {
      left: calc(100% - 8px);
    }
  }

  @keyframes db4-2 {
    100% {
      top: -0.15px;
    }
  }
`;
