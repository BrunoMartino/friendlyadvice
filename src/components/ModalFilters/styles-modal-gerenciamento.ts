import styled from 'styled-components';
import { backgroundInpera } from '../../utils/colorsInpera';

export const Modal = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  width: 100%;
  min-height: 100vh;
  height: 100%;
  /* height: calc(7.539rem - 100vh); */
  position: absolute;
  z-index: 2;
  /* top: 7.539rem; */
  bottom: 0;
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 804px) {
    bottom: -50px;
    overflow: hidden;
  }
`;

export const ModalContainer = styled.div`
  background-color: #f2e1cc;
  max-width: 40rem;
  margin: auto;
  padding: 2rem;
  height: min-content;
  inset: 0;
  top: 80px;
  position: absolute;

  @media (max-height: 430px) {
    height: 60%;
    position: auto;
  }

  /* @media (max-width: 530px) {
    top: 80px;
  } */

  .line-separator {
    width: 100%;
    height: 2px;
    background-color: ${backgroundInpera};
    margin: 1rem 0;
  }

  .modal-filters-header {
    display: flex;
    align-items: center;
  }

  @media (max-width: 530px) {
    .modal-filters-header {
      /* margin-top: 5px; */
    }
  }

  .modal-filters-icon {
    color: #2c2f38;
    font-size: 1.9rem;
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }

  .modal-filters-title {
    color: #2c2f38;
    font-size: 2rem;
    font-weight: 600;
  }

  @media (max-height: 580px) {
    .modal-filters-icon,
    .modal-filters-title {
      font-size: 1.4rem;
      margin-top: 1rem;
    }
  }

  .modal-filters-content {
    background-color: #efc891;
    padding: 1rem;
  }

  @media (max-height: 430px) {
    .modal-filters-content {
      height: 60px !important;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      margin-bottom: 1.5rem;
      padding: 0.4rem;
    }
  }

  .modal-filters-field {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0;

    label {
      color: #000000;
      font-size: 1.4rem;
    }
  }

  .modal-filters-footer {
    display: flex;
    position: sticky;
    bottom: 2rem;
    width: 100%;
    margin-top: 1.5rem;

    button:nth-child(odd) {
      margin-right: 1rem;
    }
  }

  @media (max-height: 430px) {
    .modal-filters-footer {
      position: relative;
      bottom: 0.8rem;
    }

    .modal-filters-footer button {
      width: 65%;
    }
  }

  @media (min-height: 430px) and (max-height: 580px) {
    .modal-filters-content select,
    .modal-filters-content button {
      height: 60%;
    }
  }

  @media (max-width: 430px) {
    .modal-filters-footer {
      position: relative;
    }
  }

  @media (max-width: 385px) {
    .modal-filters-footer button {
      width: 70%;
      font-size: 1.4rem;
    }
  }
`;
