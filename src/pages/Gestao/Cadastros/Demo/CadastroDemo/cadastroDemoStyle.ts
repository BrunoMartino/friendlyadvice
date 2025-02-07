import styled, { css } from 'styled-components';

import {
  borderInputFocus,
  colorText,
  colorWhite,
} from '../../../../../utils/colorsInpera';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';

interface IData {
  width: string;
  align: string;
  marginTop: string;
}

export const Container = styled.div<any>`
  display: flex;
  flex-direction: column;
  width: 100vw;
  background-color: ${colorWhite};
  min-height: 100vh;
  height: 100vh;
`;

export const ContainerCadastro = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 99vw;
  padding: 1rem;
  background: white;
`;

export const Content = styled.div<any>`
  &:first-child {
    margin-bottom: 1rem;
  }

  display: flex;
  flex-direction: column;
  gap: 5px;

  ${({ borderBottom }) =>
    borderBottom &&
    css`
      border-bottom: 2px solid #c0c0c0;
      padding-bottom: 2rem;
    `}

  @media (max-width: 900px) {
    gap: 1rem;

    .label-btnData {
      transform: translateY(-40%) !important;
    }
  }

  .content-div {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .react-datepicker-wrapper {
      width: 100%;
      .data {
        width: 100%;
      }
    }
    .input-time {
      width: 100%;
    }
  }

  [class^='grid-'] {
    position: relative;
  }

  [class^='grid-'] input::placeholder {
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  [class^='grid-'] input:focus::placeholder {
    opacity: 0;
  }

  [class^='grid-'] .label,
  .label-btnData {
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

  .disabled-label {
    color: #c2c2c2 !important;
  }

  @media (min-width: 900px) {
    .content-div {
      display: grid;
      grid-auto-flow: row;
      grid-column-gap: 1rem;
      grid-row-gap: 0.1rem;
      grid-template-columns: repeat(2, 1fr);

      grid-template-areas:
        'livreField numericField'
        'situacaoOS clientes'
        'data hora'
        'textArea textArea';

      .grid-livreField {
        grid-area: livreField;
      }
      .grid-numericField {
        grid-area: numericField;
      }
      .grid-situacaoOS {
        grid-area: situacaoOS;
      }
      .grid-clientes {
        grid-area: clientes;
      }
      .grid-data {
        grid-area: data;
      }
      .grid-hora {
        grid-area: hora;
      }
      .grid-textArea {
        grid-area: textArea;
      }

      div:not(.react-datepicker__tab-loop div) {
        width: 100%;
      }
      input {
        width: 100%;
      }
    }

    .secao-demonstrativa {
      display: grid;
      grid-auto-flow: row;
      grid-column-gap: 1rem;
      grid-row-gap: 0.1rem;
      grid-template-columns: repeat(4, 1fr);

      grid-template-areas: 'codigo nome qtde valor';

      .grid-codigo {
        grid-area: codigo;
      }
      .grid-nome {
        grid-area: nome;
      }
      .grid-qtde {
        grid-area: qtde;
      }
      .grid-valor {
        grid-area: valor;
      }
    }
  }

  input {
    font-family: 'Poppins';
    font-size: 1.4rem;
    color: #757575;
    height: 4rem;
    background-color: white;
    border-radius: 8px;
    border: 2px solid #c0c0c0;
    margin-top: 5px;

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

  .react-datepicker {
    width: 25rem;
    .react-datepicker__month-container {
      width: 24.8rem;
    }
    .react-datepicker__current-month {
      font-size: 1.2rem;
    }
    .react-datepicker__day-name,
    .react-datepicker__day {
      font-size: 1.2rem;
      margin: 0.5rem;
    }
  }

  @media (min-width: 900px) {
    .react-datepicker {
      width: 30rem;
      .react-datepicker__month-container {
        width: 29.8rem;
      }
      .react-datepicker__current-month {
        font-size: 1.4rem;
      }
      .react-datepicker__day-name,
      .react-datepicker__day {
        font-size: 1.4rem;
        margin: 0.7rem;
      }
    }
  }

  .listagem {
    display: flex;
    gap: 1rem;

    p {
      font-family: 'Poppins', sans-serif;
      font-size: 1.4rem;
      @media (max-width: 510px) {
        font-size: 1.2rem;
      }
    }

    &.header {
      padding-top: 1.5rem;
      p {
        color: #c0c0c0;
      }
    }
    &.content {
      padding-top: 1rem;
      p {
        color: black;

        display: flex;
        overflow-wrap: anywhere;
      }
      .actions {
        display: flex;

        button {
          border: none;
          border-radius: 50%;
          background: none;
          width: 2.5rem;
          height: 2.5rem;

          :hover {
            background: #ebebeb;
          }
        }
      }
    }
  }
  .itens {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns:
      minmax(5rem, 150rem) minmax(1rem, 30rem) minmax(5rem, 30rem)
      minmax(5rem, 30rem) minmax(3rem, 15rem);
    align-items: center;
  }

  .centralizado {
    display: flex;
    justify-content: center;
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

export const BtnData = styled.button<IData>`
  height: 4rem;
  background: white;
  border: 2px solid #c0c0c0;
  border-radius: 8px;
  color: #757575;
  font-family: 'Poppins';
  font-weight: 400;
  padding: 0 0.5rem;
  font-size: 1.4rem;
  text-align: ${({ align }) => (align ? align : 'left')};
  cursor: text;

  &:focus {
    border: 2px solid ${borderInputFocus};
  }
  &placeholder {
    color: #757575;
    font-size: 1.4rem;
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  height: 4rem;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-family: 'Poppins', sans-serif;
    color: black;
    font-size: 1.5rem;
    padding-top: 1rem;
  }

  button {
    color: ${borderInputFocus};
    background: none;
    border: none;
    font-size: 3.5rem;
  }
`;
