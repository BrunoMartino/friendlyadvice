import styled from 'styled-components';
import { Colors } from '../../utils/colorsAtualizada';
import {
  backgroundGrid,
  borderGrid,
  colorText,
  colorPlaceHolder,
  backgroundInpera45,
} from '../../utils/colorsInpera';

export const Header = styled.div`
  width: 100%;
  /* height: 6rem; */
  /* display: flex; */

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 0.6rem;

    .children-div {
      display: flex;

      button {
        &:last-child {
          margin-left: 1.6rem;
        }
      }
    }
  }

  .content-header-div {
    flex-direction: column;

    .line-separation {
      border-top: ${Colors.componentes.ContentHeader.border} solid 0.1rem;
    }

    .subTitle {
      text-shadow: none;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 1.2rem;
      line-height: 2rem;
      /* margin-left: 0.6rem; */
      color: ${Colors.componentes.ContentHeader.color};

    }

    .title {
      /* margin-top: 0.8rem; */

      text-shadow: none;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 2rem;
      line-height: 2rem;
      /* margin-left: 0.6rem; */
      color: ${Colors.componentes.ContentHeader.colorBrown};
    }
  }
`;

export const ListContent = styled.div`
  border-top: 0.1rem solid ${Colors.componentes.ContentHeader.border};
  width: 100%;
  margin-bottom: 2.4rem;
  form {
    width: 100%;

    input {
      width: 100%;
    }
  }

  .div-container-list {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 2.4rem;

    input {
      width: 100%;
    }

    .search-button {
      display: flex;
      margin-left: 2.4rem;
      align-items: center;

      div + div {
        margin-left: 1.6rem;
      }
    }
  }
`;
