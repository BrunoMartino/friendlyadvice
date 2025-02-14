import styled from 'styled-components';
import { Colors } from '../../../utils/colorsAtualizada';

interface iSelectList {
  show: boolean;
}

interface iArrowIconBtn {
  rotateArrow?: boolean;
}

export const Container = styled.div`
  position: relative;
  z-index: 10;
  /* height: max-content; */
  input {
    cursor: pointer;
  }
`;

export const ArrowIconBtn = styled.div<iArrowIconBtn>`
  --icon-rotate: ${({ rotateArrow }) => (rotateArrow ? '180deg' : '0deg')};
  transform: rotate(var(--icon-rotate));
  transition: 300ms ease-in-out;
  margin-right: 0.8rem;
`;

export const SelectList = styled.div<iSelectList>`
  --show-list: ${({ show }) => (show ? 'auto' : '0rem')};
  position: absolute;
  width: 100%;
  height: var(--show-list);
  transition: 300ms ease-in-out;
  background-color: #fff;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  box-shadow: 0px 10px 15px rgba(86, 79, 82, 0.1);
  overflow: auto;
  max-height: 20rem;

  ul {
    list-style: none;
    padding: 0.4rem;
    margin: 0;
    width: 100%;
  }
`;

export const ListItem = styled.li`
  color: #2e2b2c;
  font-size: 1.5rem;
  padding: 0.5rem 0.8rem;
  border-radius: 0.2rem;
  cursor: pointer;
  :hover {
    /* background-color: rgba(86, 79, 82, 0.1); */
    background-color: ${Colors.componentes.inputDefault.backgroundHover};
  }
`;
