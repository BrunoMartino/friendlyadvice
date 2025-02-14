import styled from 'styled-components';

interface iEyeIcon {
  show: boolean;
}

export const ButtonEye = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.8rem;
`;

export const EyeIcon = styled.svg<iEyeIcon>`
  --eye-background: ${({ show }) => (show ? '1' : '0')};
  --eye-offset: ${({ show }) => (show ? '0px' : '3px')};
  --eye-wrapper-y: 0;
  --eye-y: 0;
  --eye-x: 0;
  --eye-s: ${({ show }) => (show ? '0' : '1')};

  path {
    fill: #564f5280;
  }

  display: block;
  width: 2.3rem;
  height: 2.3rem;
  pointer-events: none;
  .top,
  .bottom,
  .lashes {
    fill: none;
    stroke: #9b9797;
    stroke-width: 1.5px;
    stroke-linecap: round;
  }
  .lashes {
    stroke-dasharray: 3px;
    stroke-dashoffset: var(--eye-offset);
    transition: stroke-dashoffset 200ms ease;
    transition-delay: ${({ show }) => (show ? '100ms' : '0ms')};
  }
  .top {
    fill: transparent;
    fill-opacity: var(--eye-background);
    transition: d 200ms ease;
  }
  .eye {
    fill: #9b9797;
    transform-origin: 10.5px 13.5px;
    transform: translate(var(--eye-x), var(--eye-y)) scale(var(--eye-s))
      translateZ(0);
    transition: transform var(--eye-duration, 0.3s);
  }
`;
