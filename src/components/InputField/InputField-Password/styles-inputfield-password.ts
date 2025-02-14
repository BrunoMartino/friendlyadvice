import styled from 'styled-components';

interface iPasswordStrength {
  percentage: number;
  hide?: boolean;
}

export const handleColorMetter = (percent: number) => {
  if (percent < 50) {
    return '#F27F57';
  } else if (percent >= 50 && percent <= 75) {
    return '#F2B05E';
  } else {
    return '#47c98a';
  }
};

export const InputPassContainer = styled.div`
  position: relative;
`;

export const PasswordStrength = styled.div<iPasswordStrength>`
  --metter-size: ${({ percentage }) => (percentage ? `${percentage}%` : '5%')};
  --metter-color: ${({ percentage }) => handleColorMetter(percentage)};
  --metter-height: ${({ hide, percentage }) =>
    hide || percentage >= 100 ? `0%` : '100%'};
  --transition-delay: ${({ hide, percentage }) =>
    !hide && percentage >= 100 ? `210ms` : '0ms'};

  background-color: #dad7d3;
  transform: scaleY(var(--metter-height));
  transform-origin: bottom;
  top: 5.45rem;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: calc(100% - 0.4rem);
  transition: 200ms ease-in-out var(--transition-delay);
  margin: 0.3rem 0.2rem;
  position: absolute;
  z-index: 10;
  border-radius: 2rem;
  border: none;
  .pass-line {
    width: var(--metter-size);
    height: 0.3rem;
    background-color: var(--metter-color);
    border-radius: 2rem;
    transition: 300ms ease-in-out;
  }
`;
