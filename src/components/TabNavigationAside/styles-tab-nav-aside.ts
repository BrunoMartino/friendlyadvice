import styled from 'styled-components';
import { backgroundInpera, colorText } from '../../utils/colorsInpera';

export const MenuItems = styled.ul`
  @media (min-width: 68.75em) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 77%;
    gap: 1.5rem;
    list-style: none;
    margin-top: 3rem;
  }

  @media (max-width: 68.75em) {
    display: flex;

    .options {
      display: flex;
    }
  }
`;

interface iMenuItem {
  disabled?: boolean;
}

export const MenuItem = styled.li<iMenuItem>`
  color: ${colorText};
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.3rem 1.5rem;
  border-left: 0px solid ${colorText};
  transition: 300ms;
  opacity: 35%;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;

  :not([class*='selected']):hover {
    border-left: ${({ disabled }) =>
      disabled ? `0px solid ${colorText}` : `4px solid ${colorText}`};
  }

  &.selected {
    color: ${backgroundInpera};
    border-left: 4px solid ${backgroundInpera};
    opacity: 100%;
  }
`;

export const MenuItemBack = styled.li`
  color: ${colorText};
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  border-left: 0px solid ${colorText};
  transition: 300ms;
  opacity: 35%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
