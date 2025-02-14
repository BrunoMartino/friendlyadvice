import styled from 'styled-components';
import {
  backgroundInpera,
  colorWhite,
  colorText,
  greenInpera,
  redInpera,
} from '../../utils/colorsInpera';

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RigthSide = styled.div`
  display: flex;
  align-items: flex-end;

  .titleText {
    font-size: 2rem;
    font-weight: 800;
    color: ${colorText};

    @media (max-width: 450px) and (max-height: 500px){
      font-size: 1.5rem;
    }
  }
  .iconTitle {
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
    svg {
      color: ${backgroundInpera};
      font-size: 2.4rem;
    }
  }
`;

export const LeftSide = styled.div`
  padding-bottom: 0.5rem;

  @media (max-width: 450px) and (max-height: 750px){
      display: flex;
    }

  .btn-cancel {
    background: ${redInpera};

    width: 15.6rem;
    height: 3.5rem;
    font-size: 2rem;
    font-weight: 700;

    color: ${colorWhite};

    border: none;

    transition: filter 0.2;

    @media (max-width: 580px) {
      width: 10rem;
      font-size: 1.6rem;
    }

    @media (max-width: 470px) {
      width: 8rem;
      font-size: 1.6rem;
    }

    &:hover {
      filter: brightness(95%);
    }
  }

  .btn-save {
    width: 15.6rem;
    height: 3.5rem;
    font-size: 2rem;
    font-weight: 700;

    margin-left: 1rem;

    background: ${greenInpera};
    color: ${colorWhite};

    border: none;

    transition: filter 0.2;

    @media (max-width: 580px) {
      width: 10rem;
      font-size: 1.6rem;
    }

    @media (max-width: 470px) {
      width: 8rem;
      font-size: 1.6rem;
    }

    &:hover {
      filter: brightness(95%);
    }
  }
`;
