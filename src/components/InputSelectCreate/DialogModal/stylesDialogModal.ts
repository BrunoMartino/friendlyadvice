import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import styled from 'styled-components';
import {
  backgroundBodyModal,
  backgroundHeaderModal,
  borderAllModal,
  borderBottomModal,
  colorWhite,
} from '../../../utils/colorsInpera';

export const Container = styled.div<any>`
  @media (max-width: 850px) {
    overflow: hidden;
  }

  form {
    min-width: 42rem;
    font-size: 1.5rem;
    background-color: ${backgroundBodyModal};
    border: ${borderAllModal};

      @media (max-width: 850px) {
        min-width: 0rem;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-direction: column;
      }
  }
  .titulo {
    font-size: 1.4rem;
    font-weight: 600;
    font-family: 'Source Sans Pro';
  }
`;

export const ModalDialogTitle = styled(DialogTitle)`
  display: flex;

  justify-content: center;
  background-color: ${backgroundHeaderModal};
  border-bottom: ${borderBottomModal};
  .MuiTypography-root {
    text-align: left;
    font-size: 2.1rem;
    font-weight: 600;
    font-family: 'Source Sans Pro';

    @media (max-width: 850px) {
      text-align: center;
    }
  }
`;
export const ModalDialogContent = styled(DialogContent)`
  @media (max-width: 850px) {
    max-width: 50.5rem;
    width: 100%;
    padding: 8px !important;
  }

  .MuiFormControl-root {
    width: 100%;
    .MuiInputBase-input {
      font-size: 1.8rem;
      font-weight: 600;
      font-family: 'Source Sans Pro';
      height: 3rem;

      &::placeholder {
        padding: 1rem 0;
      }
    }
  }
`;
export const ModalDialogActions = styled(DialogActions)`
  .MuiDialogActions-root {
    display: flex;
    justify-content: space-evenly;
  }

  .MuiButton-text {
    border-radius: 0;
    text-transform: none;
    .MuiButton-label {
      width: 9rem;
      font-size: 1.8rem;
      font-weight: 600;
      font-family: 'Source Sans Pro';
      color: ${colorWhite};
    }
  }
`;

export const ErrorPanel = styled.div`
  color: red;
  background-color: rgba(255, 0, 0, 0.1);
  font-size: 1.2rem;
  font-weight: 400;
  font-family: 'Source Sans Pro', sans-serif;
  padding: 0.5rem;
  margin: 0.8rem 0 0.5rem 0;

  li {
    list-style: none;
  }
`;
