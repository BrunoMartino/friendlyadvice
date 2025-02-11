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

const inputStyles = css`
  font-family: 'Poppins';
  font-size: 1.4rem;
  color: #757575;
  background-color: white;
  border-radius: 8px;
  border: 2px solid #c0c0c0;
  width: 100%;
  padding: 1rem;

  &:focus {
    border: 2px solid ${borderInputFocus};
  }
`;

const labelStyles = css`
  position: absolute;
  left: 10px;
  top: -4px;
  font-size: 1.2rem;
  color: ${colorText};
  background-color: white;
  padding: 0 4px;
  letter-spacing: 0.7px;
  border: 0.001px solid rgba(0, 0, 0, 0.001);
  border-radius: 3px;
`;

export const Container = styled.div<any>`
  display: flex;
  flex-direction: column;
  width: 100vw;
  background-color: ${colorWhite};
  min-height: 100vh;
  height: 100vh;
`;

export const ContainerCadastroOrdemServico = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 99vw;
  padding: 1rem;
  background: white;
  gap: 1rem;
`;

export const ItemAgendamentoStatus = styled.div<any>`
  ${({ borderRight }) =>
    borderRight &&
    css`
      border-right: 2px solid #c0c0c0;
      padding-right: 2rem;

      @media (max-width: 900px) {
        border-right: none;
        padding-right: 0;
      }
    `}

  ${({ paddingLeft }) =>
    paddingLeft &&
    css`
      padding-left: 2rem;

      @media (max-width: 900px) {
        padding-left: 0;
      }
    `}
`;

export const Content = styled.div<any>`
  padding-bottom: 2rem !important;

  ${({ borderBottom }) =>
    borderBottom &&
    css`
      border-bottom: 2px solid #c0c0c0 !important;
      padding-bottom: 2rem;
    `}

  &:first-child {
    margin-bottom: 1rem;
  }

  display: flex;
  flex-direction: column;
  gap: 5px;

  @media (max-width: 900px) {
    gap: 1rem;
    padding: 0 1rem;

    input,
    textarea,
    .react-datepicker-wrapper {
      ${inputStyles}
      height: 4rem;
      margin-top: 1.5rem;
    }

    .react-datepicker__input-container {
      margin-top: -1rem;
      height: 3.5rem;
      width: 100%;
      overflow: hidden;
      button {
        border: none;
      }
    }

    textarea {
      height: 10rem;
      resize: vertical;
      min-height: 5rem;
    }

    .label {
      top: -1rem;
      font-size: 1.4rem;
      background: white;
      padding: 0 0.5rem;
    }

    .content-div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      grid-template-columns: 1fr;
      grid-template-areas: none;
    }

    .secao-dados-basicos-middle,
    .secao-dados-basicos-middle-bottom,
    .secao-dados-basicos-bottom,
    .secao-items-repetidores {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
    }

    .secao-items-repetidores {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
    }

    @media (min-width: 900px) {
      .content-div {
        margin-bottom: 1rem;
      }

      .secao-dados-basicos-middle,
      .secao-dados-basicos-middle-bottom,
      .secao-dados-basicos-bottom,
      .secao-items-repetidores {
        margin-bottom: 1rem;
      }

      .secao-items-repetidores {
        margin-top: 1rem;
      }
    }

    .grid-botoes {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1rem;
    }

    .modal-content {
      width: 90%;
      max-height: 80vh;
      padding: 1.5rem;
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

  .label,
  .label-btnData {
    ${labelStyles}
    transition: all 0.2s ease;
  }

  [class^='grid-'] .label,
  .label-btnData {
    ${labelStyles}
  }

  .disabled-label {
    color: #c2c2c2 !important;
  }

  .produto-os-container {
    min-width: 17rem;
    display: flex;
    flex-wrap: wrap;
    gap: 4rem;
    background: white;
    border-radius: 8px;
    margin-top: 1rem;

    #produto-em-edicao {
      width: 100%;
      margin-right: -5rem;
    }

    .grid-textArea {
      margin-top: -25px;
      width: 100%;
    }

    @media (max-width: 900px) {
      ${({ borderBottom }) =>
        borderBottom &&
        css`
          border-bottom: none !important;
        `}

      #produto-em-edicao {
        min-width: 35rem;
        width: 100%;
        max-width: 10rem;
        margin-left: -0.2rem;
      }

      .grid-textArea {
        max-width: 35rem;
      }
    }

    @media (max-width: 400px) {
      #produto-em-edicao {
        min-width: 25rem;
        width: 100%;
        max-width: 10rem;
      }

      .grid-textArea {
        max-width: 25rem;
      }
    }

    .produto-os-items-container {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;

      .produto-os-item {
        min-width: 12rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        position: relative;

        .label {
          font-size: 1.2rem;
          color: ${colorText};
          position: absolute;
          left: 0.6rem;
          background-color: white;
          padding: 0.1rem;
        }

        input {
          min-width: 100%;
          width: 100%;
          margin-right: auto;
        }
      }

      @media (max-width: 900px) {
        grid-template-columns: 1fr;

        .produto-os-item {
          min-width: 35rem;
          flex-direction: row;
          align-items: center;

          input {
            min-width: 35rem;
            width: 100%;
          }

          fieldset {
            min-width: 35rem;
          }
        }

        .label {
          font-size: 1.4rem;
        }
      }

      @media (max-width: 400px) {
        grid-template-columns: 1fr;

        .produto-os-item {
          min-width: 20rem;
          width: 100%;
          flex-direction: row;

          input {
            min-width: 25rem;
            width: 100%;
          }

          fieldset {
            min-width: 25rem;
          }
        }

        .label {
          font-size: 1.4rem;
        }
      }
    }

    .btn-voltar {
      background: ${colorWhite};
    }
    .btn-salvar {
      width: 11rem;
      background: ${borderInputFocus};
      color: ${colorWhite};
    }
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

    .container-agendamento-entrega-status {
      width: 100%;
      margin-top: 2rem;
      display: grid;
      grid-template-columns: repeat(2, minmax(100px, 0.5fr)) 2fr;
      grid-column-gap: 5px;
    }

    .secao-clientes {
      display: grid;
      grid-auto-flow: row;
      grid-column-gap: 1rem;
      grid-row-gap: 0.1rem;
      grid-template-columns: 0.8fr 0.2fr;

      grid-template-areas: 'clientes valor-produtos';

      .grid-clientes {
        grid-area: clientes;
      }
      .grid-valor-produtos {
        grid-area: valor-produtos;
      }
    }

    .secao-dados-basicos-top {
      display: grid;
      grid-auto-flow: row;
      grid-column-gap: 1rem;
      grid-row-gap: 0.1rem;
      grid-template-columns: 0.6fr 0.4fr 4fr;

      grid-template-areas: 'data hora fabricante';

      .grid-data {
        grid-area: data;
      }
      .grid-hora {
        grid-area: hora;
      }
      .grid-fabricante {
        grid-area: fabricante;
      }
    }

    .secao-dados-basicos-middle {
      display: grid;
      grid-auto-flow: row;
      grid-column-gap: 1rem;
      grid-row-gap: 0.1rem;
      grid-template-columns: 2fr 2fr;

      grid-template-areas: 'equipamento serie';

      .grid-equipamento {
        grid-area: equipamento;
      }
      .grid-serie {
        grid-area: serie;
      }
    }

    .secao-dados-basicos-middle-bottom {
      display: grid;
      grid-auto-flow: row;
      grid-column-gap: 1rem;
      grid-row-gap: 0.1rem;
      grid-template-columns: 2fr 2fr;

      grid-template-areas: 'problema descricao';

      .grid-problema {
        grid-area: problema;
      }
      .grid-descricao {
        grid-area: descricao;
      }
    }

    .secao-dados-basicos-bottom {
      display: grid;
      grid-auto-flow: row;
      grid-column-gap: 1rem;
      grid-row-gap: 0.1rem;
      grid-template-columns: 2fr 2fr;

      grid-template-areas: 'valor tecnico';

      .grid-valor {
        grid-area: valor;
      }
      .grid-tecnico {
        grid-area: tecnico;
      }
    }

    .secao-agendamento {
      display: grid;
      grid-auto-flow: row;
      grid-column-gap: 1rem;
      grid-row-gap: 0.1rem;
      grid-template-columns: 2fr 2fr;
      grid-template-areas: 'data hora';
      width: 100%;

      .grid-data {
        grid-area: data;
      }
      .grid-hora {
        grid-area: hora;
      }
    }

    .secao-entrega {
      display: grid;
      grid-auto-flow: row;
      grid-column-gap: 1rem;
      grid-row-gap: 0.1rem;
      grid-template-columns: 2fr 2fr;
      grid-template-areas: 'data hora';
      width: 100%;

      .grid-data {
        grid-area: data;
      }
      .grid-hora {
        grid-area: hora;
      }
    }

    .secao-status {
      display: grid;
      grid-auto-flow: row;
      grid-template-columns: 2fr;
      width: 100%;
      grid-template-areas: 'status';

      .grid-status {
        grid-area: status;
      }
    }

    .secao-items-repetidores {
      display: grid;
      margin-top: 8px;
      grid-auto-flow: row;
      grid-column-gap: 1rem;
      grid-row-gap: 0.1rem;
      grid-template-columns: 0.6fr 0.2fr 0.2fr 0.2fr 0.1fr 0.1fr;

      grid-template-areas: 'item quantidade preco-unit preco-total action';

      .grid-item {
        grid-area: item;
      }
      .grid-quantidade {
        grid-area: quantidade;
      }
      .grid-preco-unit {
        grid-area: preco-unit;
      }
      .grid-botoes {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
      }

      .btn-editar,
      .btn-remover {
        height: 35px;
        color: ${borderInputFocus};
        background: none;
        border: none;
        font-size: 3.5rem;

        &:hover {
          background-color: #f0f0f0;
          cursor: pointer;
        }
      }
    }

    .secao-items {
      display: grid;
      grid-auto-flow: row;
      grid-column-gap: 1rem;
      grid-row-gap: 0.1rem;
      grid-template-columns: 0.6fr 0.2fr 0.2fr 0.2fr;
      border-bottom: 2px solid #c0c0c0;
      padding-bottom: 1rem;
      margin-bottom: 1rem;

      grid-template-areas: 'item quantidade preco-unit preco-total';

      .grid-item {
        grid-area: item;
      }
      .grid-quantidade {
        grid-area: quantidade;
      }
      .grid-preco-unit {
        grid-area: preco-unit;
      }
      .grid-preco-total {
        grid-area: preco-total;
      }
    }

    .secao-vencimento-da-os-top {
      display: grid;
      grid-auto-flow: row;
      grid-column-gap: 1rem;
      grid-row-gap: 0.1rem;
      grid-template-columns: 0.2fr 0.1fr 0.1fr 0.6fr;

      grid-template-areas: 'documento data-lancto data-vencto valor-vencimento';

      .grid-documento {
        grid-area: documento;
      }
      .grid-data-lancto {
        grid-area: data-lancto;
      }
      .grid-data-vencto {
        grid-area: data-vencto;
      }
      .grid-valor-vencimento {
        grid-area: valor-vencimento;
      }
    }

    .secao-vencimento-da-os-top-modal {
      display: grid;
      grid-auto-flow: row;
      grid-column-gap: 1rem;
      grid-row-gap: 0.1rem;
      grid-template-columns: 0.6fr 0.6fr 0.6fr 0.6fr;

      grid-template-areas: 'documento data-lancto data-vencto valor-vencimento';

      .grid-documento {
        grid-area: documento;
      }
      .grid-data-lancto {
        grid-area: data-lancto;
      }
      .grid-data-vencto {
        grid-area: data-vencto;
      }
      .grid-valor-vencimento {
        grid-area: valor-vencimento;
      }
    }

    .secao-vencimento-da-os-middle {
      display: grid;
      grid-auto-flow: row;
      grid-column-gap: 1rem;
      grid-row-gap: 0.1rem;
      grid-template-columns: 0.4fr 0.6fr;

      grid-template-areas: 'conta cobranca';

      .grid-conta {
        grid-area: conta;
      }
      .grid-cobranca {
        grid-area: cobranca;
      }
    }

    .secao-vencimento-os-linha {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto auto;
      grid-column-gap: 1rem;
      align-items: center;
      width: 100%;

      .grid-documento {
        grid-area: auto;
      }
      .grid-data-lancto {
        grid-area: auto;
      }
      .grid-data-vencto {
        grid-area: auto;
      }
      .grid-valor-vencimento {
        grid-area: auto;
      }
      .grid-cobranca {
        grid-area: auto;
      }
      .grid-botoes {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
      }

      .btn-editar,
      .btn-remover {
        height: 35px;
        color: ${borderInputFocus};
        background: none;
        border: none;
        font-size: 3.5rem;

        &:hover {
          background-color: #f0f0f0;
          cursor: pointer;
        }
      }
    }
  }

  input,
  textarea,
  .react-datepicker-wrapper,
  .input-time,
  .btn-data {
    width: 100%;
  }

  @media (max-width: 900px) {
    input,
    textarea,
    .react-datepicker-wrapper,
    .input-time {
      margin-top: 8px;
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

    width: 100%;

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
  position: relative;
  margin-top: 8px;
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
    font-size: 2rem;
    padding-top: 1rem;
  }

  button {
    color: ${borderInputFocus};
    background: none;
    border: none;
    font-size: 3.5rem;
  }
`;
