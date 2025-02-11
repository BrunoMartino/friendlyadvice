import styled, { css } from 'styled-components';

import { borderInputFocus, colorWhite } from '../../utils/colorsInpera';

export const ContentModalOpen = styled.div<any>`
  user-select: none;

  padding: 0.8rem;

  .titleModal {
    display: flex;
    align-items: center;
    gap: 1.4rem;
  }

  .menuModal {
    div {
      display: flex;
      align-items: center;
      width: 2.8rem;
      height: 2.8rem;
      border-radius: 2rem;
      justify-content: center;
      background-color: ${borderInputFocus};

      .iconMenuModal {
        width: 1.1rem;
        height: 1.1rem;
        color: ${colorWhite};

        ${({ mobileMode }) =>
          mobileMode &&
          css`
            width: 2.2rem;
            height: 2.2rem;
          `}
      }

      :hover {
        cursor: pointer;
      }
    }
  }

  p {
    font-family: 'Poppins';
    color: black;
    font-size: 1.4rem;
    font-weight: 500;
  }

  .optionsMenuModal {
    display: flex;
    flex-direction: column;
    margin-top: 1.6rem;
    gap: 0.6rem;
    ${({ mobileMode }) =>
      mobileMode &&
      css`
        gap: 1.6rem;
      `}
    padding-left: 0.6rem;
    align-items: start;

    button {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-family: 'Poppins';
      color: black;
      font-size: 14px;
      font-weight: 500;
      border: none;
      background-color: ${colorWhite};

      @media (max-width: 345px) {
        font-size: 12px;
      }

      &:hover {
        cursor: pointer;
        color: ${borderInputFocus};
      }
    }
  }
`;
