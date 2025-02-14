import styled from 'styled-components';
import {
  backgroundInpera,
  backgroundInperaInput,
  borderInput,
  borderInputFocus,
  colorPlaceHolder,
  colorText,
} from '../../utils/colorsInpera';

import DatePicker from 'react-datepicker';

interface IData {
  width: string;
  align: string;
  marginTop: string;
}

export const Modal = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  width: 100%;
  /* height: 100%; */
  position: absolute;
  z-index: 11;
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100svh;
  flex: 1;
`;

export const ModalContent = styled.div`
  background-color: #f2e1cc;
  width: 40rem;

  margin: auto;
  padding: 2rem;
  position: relative;

  @media (max-width: 430px) {
    margin: 5rem 2rem 0 2rem;
    width: 30rem;
  }

  .line-separator {
    width: 100%;
    height: 2px;
    background-color: ${backgroundInpera};
    margin: 1rem 0;
  }

  .modal-data-personalizada-title {
    color: #2c2f38;
    font-size: 2rem;
    font-weight: 600;
  }

  .modal-data-personalizada-field {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0;

    label {
      color: #000000;
      font-size: 1.4rem;
    }
  }

  .modal-data-personalizada-content {
    background-color: #efc891;
    padding: 1rem;
  }

  .modal-data-personalizada-footer {
    display: flex;
    position: sticky;
    bottom: 2rem;
    width: 100%;
    margin-top: 1.5rem;

    button:nth-child(odd) {
      margin-right: 1rem;
    }
  }

  .react-datepicker {
    font-size: 1.2em;
  }
  .react-datepicker__header {
    padding-top: 0.8em;
  }
  .react-datepicker__month {
    margin: 0.4em 1em;
  }
  .react-datepicker__day-name,
  .react-datepicker__day {
    width: 2em;
    line-height: 1.9em;
    margin: 0.166em;
  }
  .react-datepicker__current-month {
    font-size: 1.2em;
  }
  .react-datepicker__navigation {
    top: 1em;
    line-height: 1.7em;
    border: 0.45em solid transparent;
  }
  .react-datepicker__navigation--previous {
    border-right-color: #ccc;
    left: 1em;
  }
  .react-datepicker__navigation--next {
    border-left-color: #ccc;
    right: 1em;
  }

  .react-datepicker__input-container {
    margin: 0 auto !important;
    right: 0px !important;
    inset: 0 !important;
  }

  .react-datepicker {
    width: 100% !important;
  }

  .react-datepicker-popper {
  z-index: 1;

  @media (max-width: 430px) {
    left: 0px !important;
  }
}

.react-datepicker__header {
  width: 22rem !important;
}
`;

export const DatePickerFilter = styled(DatePicker)`
  width: 100%;
  color: ${colorText};
  font-size: 1.4rem;
  font-weight: 400;
  height: 2.7rem;
  background: ${backgroundInperaInput};
  border: 0.15rem solid ${borderInput};
  padding: 0 0.5rem;
`;

export const BtnData = styled.button<IData>`
  width: ${({ width }) => (width ? width : '25em')};
  height: 2.7rem;
  background: ${backgroundInperaInput};
  border: 0.15rem solid ${borderInput};
  color: ${colorText};
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  padding: 0 0.5rem;
  font-size: 1.4rem;
  text-align: ${({ align }) => (align ? align : 'left')};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '0.5rem')};
  cursor: text;

  &:focus {
    border: 0.15rem solid ${borderInputFocus};
  }
  &placeholder {
    color: ${colorPlaceHolder};
    font-size: 1.4rem;
  }
`;
