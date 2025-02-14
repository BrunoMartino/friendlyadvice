import styled from 'styled-components';
import { borderInputFocus, colorText } from '../../utils/colorsInpera';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99998;
`;

export const InputContainerImagem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;

  .input-area {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
    cursor: pointer;

    input {
      display: none;
    }

    p {
      margin-left: 1rem;
      font-size: 1.6rem;
      font-weight: 600;
      color: #c0c0c0;
    }

    .icon {
      width: 4rem;
      height: 35px;
      border: 2px dashed #ccc;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      font-size: 2rem;
      color: #ccc;
      cursor: pointer;
    }
  }
`;

export const PreviewContainerImagem = styled.div`
  display: flex;
  gap: 1rem;

  flex-wrap: wrap;
`;

export const ImageBox = styled.div`
  position: relative;
  width: 6rem !important;
  height: 10rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InputInLine = styled.div<{ width?: number }>`
  display: flex;
  gap: 1rem;
  width: ${({ width }) => (width ? `${width}rem` : '100%')};
  /* margin-bottom: 1.6rem */

  div {
    position: relative;
    width: 100%;
  }

  textarea {
    margin-bottom: 0.6rem;
  }

  input {
    font-family: 'Poppins';
    font-size: 1.4rem;
    color: #757575;
    height: 4rem;
    background-color: white;
    border-radius: 0.8rem;
    border: 2px solid #c0c0c0;
    margin-top: 0.5rem;
    margin-bottom: 0.6rem;

    width: 100%;

    :focus {
      border: 2px solid ${borderInputFocus};
    }
  }

  textarea {
    font-family: 'Poppins';
    font-size: 1.4rem;
    color: #757575;
    background-color: white;
    border-radius: 8px;
    border: 2px solid #c0c0c0;
    margin-top: 5px;

    width: 98vw;

    :focus {
      border: 2px solid ${borderInputFocus};
    }
  }

  input::placeholder {
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  input:focus::placeholder {
    opacity: 0;
  }

  label {
    position: absolute;
    left: 10px;
    top: -4%;
    transform: translateY(-5%);
    font-size: 1.2rem;
    color: ${colorText};
    background-color: white;
    display: flex;
    justify-content: center;
    padding: 0 4px;
    letter-spacing: 0.7px;
    opacity: 1;
    transition: opacity 0.3s ease, top 0.3s ease;
  }
`;
