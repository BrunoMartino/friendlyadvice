import styled from 'styled-components';
import { isMobile } from '../../utils/consts';

export const Container = styled.div`
  position: relative;

  span {
    @media (max-height: 568px) {
      width: 8.5rem;
      font-size: 0.8rem;
      min-width: 6.4rem;
    }

    width: ${isMobile ? '12rem' : '16rem'};
    background: #b7022c;
    padding: 0.48rem;
    border-radius: 0.4rem;
    font-size: 1.36rem;
    font-weight: 600;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 1.2rem);
    left: 50%;
    transform: translateX(-50%);

    color: #fff;

    &::before {
      content: '';
      border-style: solid;
      border-color: #b7022c transparent;
      border-width: 0.5rem 0.5rem 0 0.5rem;
      top: 0%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  & span {
    opacity: 1;
    visibility: visible;
  }
`;
