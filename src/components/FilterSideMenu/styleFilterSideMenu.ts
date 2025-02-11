import styled from 'styled-components';
import {
  borderInputFocus,
  colorText,
  colorWhite,
} from '../../utils/colorsInpera';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';

interface ModalProps {
  topMobile: boolean;
}

interface IData {
  width: string;
  align: string;
  marginTop: string;
}

export const BtnData = styled.button<IData>`
  height: 4rem;
  background: white;
  border: 2px solid #c0c0c0;
  border-radius: 8px;
  color: #757575;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  padding: 0 0.5rem;
  font-size: 1.4rem;
  text-align: ${({ align }) => (align ? align : 'left')};
  cursor: text;

  &:focus {
    border: 2px solid ${borderInputFocus};
  }

  &::placeholder {
    color: #757575;
    font-size: 1.4rem;
  }
`;

export const ContainerGeral = styled.div`
  overflow: hidden;

  #overlay {
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 10;
  }
`;

export const Container = styled.div<ModalProps>`
  display: flex;
  flex-direction: column;
  width: 40vw;
  color: black;

  @media (max-width: 800px) {
    width: 100vw;
  }
  background-color: ${colorWhite};
  min-height: 100dvh;
  height: 100dvh;
  max-height: max-content;

  position: fixed;
  z-index: 100;
  top: 75px;

  @media (max-width: 800px) {
    top: 0px;
  }

  right: 0;
  padding: 10px;
  gap: 2rem;

  #form {
    padding-bottom: 2rem;
    height: 90svh;
  }

  @media (max-width: 800px) {
    #form {
      flex: 1;
      padding-bottom: 0;
      /* padding-top: 7rem; */
      /* overflow-y: hidden; */
      /* height: 100svh; */
    }
  }
`;

export const ContainerCadastro = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  background: white;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  /* @media (max-width: 900px) {
    gap: 0px;
  } */

  .data-picker {
    width: 100% !important;
    .react-datepicker__input-container {
      /* width: 26rem; */
      width: 100% !important;
    }
    .react-datepicker-wrapper {
      width: 100% !important;
    }
  }

  .content-div {
    display: grid;
    grid-auto-flow: row;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    grid-template-columns: 1fr;
    // grid-template-columns: repeat(2, 1fr);

    @media (max-width: 800px) {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  [class^='item'] {
    position: relative;

    .data-picker {
      /* width: 100%; */
      width: 30rem;
    }
  }

  [class^='item'] input::placeholder {
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  [class^='item'] input:focus::placeholder {
    opacity: 0;
  }

  [class^='item'] .label {
    position: absolute;
    left: 10px;
    // top: -4%;
    transform: translateY(-4.8rem);
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

  #content-div-top {
    grid-template-columns: 0.5fr 1.5fr;
  }

  .item {
    position: relative;

    .react-datepicker__month-container {
      width: 24.8rem !important;

      @media (max-width: 800px) {
        width: auto !important;
      }
    }

    .react-datepicker {
      width: 25rem !important;

      @media (max-width: 800px) {
        width: auto !important;
      }
    }

    // .label {
    //   top: -7px !important;
    // }
  }

  #item {
    @media (max-width: 800px) {
      width: 100% !important;
    }
  }

  .title {
    color: #000;
    font-weight: 500;
    font-size: 22px;
  }

  input {
    font-family: 'Poppins';
    font-size: 1.4rem;
    color: #757575;
    height: 4rem;
    background-color: white;
    border-radius: 8px;
    border: 2px solid #c0c0c0;
    width: 100%;

    :focus {
      border: 2px solid ${borderInputFocus};

      ::placeholder {
        transition: all 0.2s ease-in-out;
        opacity: 0;
      }
    }
  }
`;

export const Footer = styled.div`
  bottom: 0;
  display: flex;
  height: 4rem;
  gap: 1.2rem;
  /* padding-left: 2rem; */

  button {
    height: 3rem;
    border: none;
    font-size: 1.4rem;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 0.5px;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;

    :hover {
      opacity: 0.9;
    }
  }

  .botao-voltar {
    background: ${colorWhite};
  }

  .botao-salvar {
    /* width: 11rem; */
    background: ${borderInputFocus};
    color: ${colorWhite};
    padding: 5px;
  }
`;

export const DatePickerFilter = styled(DatePicker)`
  font-family: 'Poppins', sans-serif;
  text-align: center;
  border: 2px solid #c0c0c0;
  border-radius: 8px;
  font-size: 1.4rem;
  padding: 4px;

  :focus {
    border: 2px solid ${borderInputFocus};
  }
`;
