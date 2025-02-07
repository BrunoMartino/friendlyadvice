import styled from 'styled-components';
import { borderDarkColor } from '../../utils/colors';
import {
  backgroundInpera,
  backgroundInperaInput,
  colorPlaceHolder,
  colorText,
  colorWhite,
} from '../../utils/colorsInpera';

interface styleInputUpload {
  width?: string;
}

export const Input = styled.div<styleInputUpload>`
  background-color: ${backgroundInperaInput};
  height: 2.7rem;
  width: ${({ width }) => (width ? width : '30rem')};
  margin-top: 0.5rem;
  border: 1px solid ${borderDarkColor};
  display: grid;
  align-items: center;
  grid-template-columns: 1fr max-content;
  overflow: hidden;

  .input-upload-handler {
    border: none;
    background-color: ${backgroundInperaInput};
    color: ${colorText};
    font-size: 1.4rem;
    font-weight: 500;
    padding: 0 0.5rem;
    overflow: hidden;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &::placeholder {
      color: ${colorPlaceHolder};
      font-size: 1.4rem;
      font-weight: 500;
    }
  }

  .input-upload-btn {
    background-color: ${backgroundInpera};
    color: ${colorText};
    height: 2.5rem;
    width: 4rem;
    min-width: 4rem;
    border-left: 1px solid ${borderDarkColor};
    min-height: 2.7rem;
    min-width: 2.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    cursor: pointer;
    color: ${colorWhite};

    &:hover {
      color: ${borderDarkColor};
    }
  }

  .input-upload-certificate {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    padding-right: 0.5rem;

    .input-upload-reset {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
`;
