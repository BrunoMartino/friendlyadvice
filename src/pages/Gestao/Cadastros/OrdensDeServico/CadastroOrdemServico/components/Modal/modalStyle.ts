import styled from 'styled-components';
import { borderInputFocus } from '../../../../../../../utils/colorsInpera';

export const ContentModalOpen = styled.div`
  user-select: none;

  padding: 0.8rem;

  @media (max-width: 500px) {
    padding: 0px;
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

  .titleModal {
    display: flex;
    align-items: center;

    p {
      font-family: 'Poppins', sans-serif;
      color: black;
      font-size: 1.5rem;
      padding-top: 1rem;
    }
  }

  button {
    margin-top: 6px;
    color: black;
    background: none;
    border: none;
    font-size: 1.3rem;
  }

  .confirm-button {
    background: ${borderInputFocus};
    color: white;

    &:hover {
      background-color: #f0f0f0;
      color: ${borderInputFocus};
      cursor: pointer;
    }
  }

  p {
    font-family: 'Poppins';
    color: black;
    font-size: 1.4rem;
    font-weight: 500;
  }
`;
