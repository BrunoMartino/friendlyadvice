import styled from 'styled-components';
import { backgroundInpera10, colorText } from '../../utils/colorsInpera';

export const DropDown = styled.div`
  position: relative;
`;

export const ButtonDrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  padding: 0rem 1rem;
  height: 3.5rem;
  width: 20rem;
  border: 0.1rem solid #594532;
  position: relative;

  transition: 300ms ease-in-out;
  cursor: pointer;
  @media (max-width: 575px) {
    width: 95vw;
  }

  :hover {
    background-color: #d0944b20;
  }

  .dropdown-label {
    color: #594532;
    font-size: 1.4rem;
    font-weight: 600;

    display: block;

    position: relative;
  }

  .dropdown-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #594532;
    font-size: 1.6rem;
    margin-right: 0.6rem;
  }
`;

export const Options = styled.div`
  position: absolute;
  width: 100%;
  top: 3.5rem;

  z-index: 1;
  color: ${colorText};
  ul {
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1);
    list-style: none;
    width: 100%;
  }

  ul li {
    background-color: #fff;

    font-size: 1.4rem;
    padding: 0.6rem;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    border-bottom: 0.1rem solid ${colorText}50;

    transition: 300ms ease-in-out;
  }

  ul li:hover {
    background-color: #ebebeb;
  }

  .option-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    margin-right: 1rem;
  }
`;
