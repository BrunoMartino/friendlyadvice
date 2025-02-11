import styled from 'styled-components';
import {
  backgroundCheck,
  backgroundInpera,
  backgroundInpera45,
  colorWhite,
  colorText,
} from '../../utils/colorsInpera';

export const Container = styled.div`
  min-height: 5rem;
  height: max-content;

  display: flex;

  .MuiPagination-ul {
    height: 2rem;
    cursor: pointer;
  }
  .MuiPagination-ul li {
    margin: 1rem 0.3rem;

    @media screen and (max-width: 28.125em) {
      margin: 1rem 0.15rem;
    }
  }

  .MuiPaginationItem-outlined {
    background: ${colorWhite};
    color: ${colorText};
    border: 0.1rem solid ${backgroundInpera};
    border-radius: 0;

    font-size: 1.5rem;
    font-weight: 400;
    font-family: 'Source Sans Pro', sans-serif;

    text-align: center;

    svg {
      font-size: 1.7rem;
      color: ${backgroundInpera};
    }
  }
  .MuiPaginationItem-page.Mui-disabled {
    opacity: 100;
  }

  .MuiPagination-ul li button {
    @media screen and (max-width: 340px) {
      min-width: 3rem !important;
      margin: 0 0.1rem !important;
    }
  }

  .MuiPaginationItem-page.Mui-selected {
    background: ${backgroundInpera45};

    &:hover {
      background: ${backgroundInpera45};
      opacity: 95;
    }
  }

  .MuiPaginationItem-page.Mui-selected.Mui-disabled {
    background-color: ${backgroundCheck};
    color: ${backgroundInpera};
  }
  .MuiPaginationItem-outlined.Mui-selected.Mui-disabled {
    border: 0.1rem solid ${backgroundInpera};
  }
`;
