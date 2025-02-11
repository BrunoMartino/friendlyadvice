import styled, { css } from 'styled-components';
import {
  backgroundInpera10,
  backgroundLightSecundary,
  colorText,
} from '../../utils/colorsInpera';

export const Container = styled.div<any>`
  display: flex;
  flex: 1;
  justify-content: center;
  position: relative;

  padding: 0.8rem 2.4rem;

  ${({ calendarFlutter }) =>
    calendarFlutter &&
    css`
      padding: 0;
    `}

  align-items: center;
  color: ${colorText};
  background: transparent;

  .iconeCalendario {
    font-size: 3.2rem;
    cursor: pointer;
  }

  .MuiIconButton-root {
    nav-index: -1;
  }
`;

export const Calendar = styled.aside`
  display: flex;
  width: inherit;
  justify-content: center;

  > svg {
    margin: 0rem 0.8rem;
  }
`;

export const ContainerTwoCalendar = styled.div<any>`
  display: flex;
  width: 100%;
  justify-content: center;

  .iconeCalendar {
    font-size: 2.6rem;
    margin-right: 0.5rem;
    margin-top: 0.2rem;
  }

  .responsive-calendar {
    /* by setting font-size, all the elements will correspond */
    font-size: 9px !important; /* default to 10px */
  }

  @media (max-width: 1500px) {
    .responsive-calendar {
      font-size: 0.8rem !important;
    }
  }

  @media (max-width: 1200px) {
    .responsive-calendar {
      font-size: 0.7rem !important;
    }
  }

  @media (max-width: 768px) {
    .responsive-calendar {
      font-size: 0.6rem !important;
    }
  }

  /* Large screens */
  @media (min-width: 2500px) {
    .responsive-calendar {
      font-size: 1.2rem !important;
    }
  }

  .custom-today-day {
    background: none;
  }

  .my-custom-input-class {
    cursor: pointer;
    margin-right: 2.4rem;
    background: ${backgroundLightSecundary};
    border: 0.5px solid ${colorText};
    color: ${colorText};

    ${({ calendarFlutter }) =>
      calendarFlutter &&
      css`
        border: 2px solid #c0c0c0;
        color: #757575;
        background: white;
      `}

    outline: 'none';
  }

  .Calendar__day {
    color: ${colorText};
  }

  .Calendar__monthYear.-shown > *:hover,
  .Calendar:not(.-noFocusOutline) .Calendar__monthYear.-shown > *:focus,
  .Calendar__monthYear > *.-activeBackground {
    background: transparent;
  }

  .Calendar__day:not(.-blank):not(.-selectedStart):not(.-selectedEnd):not(.-selectedBetween):not(.-selected):hover {
    background: ${backgroundInpera10};
  }

  .calendarDatePicker {
    background: ${backgroundLightSecundary};
  }

  .DatePicker__input {
    width: 100%;
    height: 3.2rem;
    font-size: 1.4rem;
    font-weight: 600;

    ${({ calendarFlutter }) =>
      calendarFlutter &&
      css`
        height: 4rem;
        min-width: 20rem;
        font-weight: 400;
      `}
  }

  .Calendar__monthText
    .Calendar__yearText
    .Calendar__monthSelectorItemText
    .Calendar__yearSelectorText {
    color: ${colorText};
  }

  .Calendar__monthSelector,
  .Calendar__yearSelector {
    background-color: ${backgroundLightSecundary};
  }

  .Calendar__yearSelectorWrapper::after {
    background-image: none;
  }

  .Calendar__yearSelectorWrapper::before {
    background-image: none;
  }
`;
