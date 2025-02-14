import styled from 'styled-components';

interface iResetSearchBtn {
  hide?: boolean;
}

export const ResetSearchBtn = styled.button<iResetSearchBtn>`
  --btn-size: ${({ hide }) => (hide ? '0%' : '100%')};
  --icon-pos: ${({ hide }) => (hide ? '-2rem' : '0rem')};

  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  margin-right: 0.8rem;
  background-color: #dad7d3;
  border-radius: 0.3rem;
  padding: 0.2rem;
  transform: scale(var(--btn-size));
  transition: 350ms cubic-bezier(0.75, 0.21, 0.21, 0.89);
  overflow: hidden;

  svg {
    width: 1.6rem;
    height: 1.6rem;
    transform: translateY(var(--icon-pos));
    transition: 400ms cubic-bezier(0.86, 0.07, 0.44, 0.82);
  }
`;
