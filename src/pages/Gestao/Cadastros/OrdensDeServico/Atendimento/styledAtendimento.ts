import styled, { css } from 'styled-components';
import { borderInputFocus } from '../../../../../utils/colorsInpera';

export const BreadCrumbs = styled.div`
  display: flex;
  gap: 8px;

  p {
    font-family: 'Poppins';
    color: #c0c0c0;
    font-size: 1.45rem;
    font-weight: 500;

    @media (max-width: 530px) {
      font-size: 1.3rem;
    }

    @media (max-width: 415px) {
      font-size: 1rem;
      margin-bottom: 0.6rem;
    }

    :hover {
      color: ${borderInputFocus};
      cursor: pointer;
    }
  }
`;

export const Container = styled.div`
  padding: 2rem 1rem;
  color: black;

  .selected-os-div {
    display: flex;

    h2 {
      font-size: 1.6rem;
    }
  }

  .icons-div {
    display: flex;
    gap: 10px;

    svg {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    @media (max-width: 530px) {
      flex-direction: column;
    }

    .arrow {
      width: 40px;
      height: 28px;
      cursor: pointer;
    }

    .OsTopInfos {
      display: flex;
      align-items: center;
      gap: 10px;

      span {
        color: #c0c0c0;
        font-size: 14px;
      }
    }

    .headerRightIcons {
      width: max-content;
      display: flex;
      gap: 10px;

      .printer {
        width: 30px;
        height: 30px;
        cursor: pointer;
      }

      .whatsapp {
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
    }
  }

  section {
    margin-bottom: 32px;

    .service-provided-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        font-size: 1.6rem;
      }
    }

    .plusButton {
      display: flex;
      justify-content: space-between;
    }
  }

  h1 {
    color: #d0944b;
  }
`;

export const HeaderGridService = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 8rem 3fr;
  align-items: center;
  border-bottom: 1px solid #c0c0c0;
  padding: 2rem;

  p {
    font-size: 1.6rem;
    font-weight: 400;
    color: #c0c0c0;
    margin: 0;
  }

  .codigo {
    text-align: left;
    font-weight: 600;
    padding-right: 1rem;
  }

  .descricao {
    text-align: left;
  }
`;

export const BodyGridService = styled.div<any>`
  width: 100%;
  display: grid;
  grid-template-columns: 8rem 3fr;
  align-items: center;
  border-bottom: 1px solid #c0c0c0;
  padding: 2rem;
  cursor: pointer;

  .descricao-itens {
    max-width: 50rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: #e0dede;
    `}

  p {
    font-size: 1.6rem;
    font-weight: 400;
    color: #000;
    margin: 0;
  }
`;

export const AtendimentoGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 8rem 10rem 10rem 8rem minmax(20rem, 50rem) 1fr 20rem;
  align-items: center;
  border-bottom: 1px solid #c0c0c0;
  padding: 2rem;

  .assinatura {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 1060px) {
    grid-template-columns: 8rem 10rem 8rem minmax(20rem, 50rem) 1fr 20rem;

    .cd-servico {
      display: none;
    }
  }

  @media screen and (max-width: 900px) {
    grid-template-columns: 8rem 10rem 15rem 1fr 20rem;

    .cd-servico,
    .descricao {
      display: none;
    }
  }

  @media screen and (max-width: 710px) {
    grid-template-columns: 8rem 10rem 15rem minmax(10rem, 40rem) 20rem;

    .cd-service,
    .descricao,
    .assinatura {
      display: none;
    }
  }

  @media screen and (max-width: 455px) {
    grid-template-columns: 8rem 10rem minmax(16rem, 20rem) minmax(10rem, 20rem);

    .cd-servico,
    .descricao,
    .assinatura {
      display: none;
    }
  }

  p {
    font-size: 1.6rem;
    font-weight: 400;
    color: #c0c0c0;
    font-weight: 600;
    margin: 0;
  }
`;

export const BodyAtendimentoGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 8rem 10rem 10rem 8rem minmax(20rem, 50rem) 1fr 20rem;
  align-items: center;
  border-bottom: 1px solid #c0c0c0;
  padding: 2rem;

  .assinatura-body {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 1060px) {
    grid-template-columns: 8rem 10rem 8rem minmax(20rem, 50rem) 1fr 20rem;

    .cd-service-body {
      display: none;
    }
  }

  @media screen and (max-width: 900px) {
    grid-template-columns: 8rem 10rem 15rem minmax(10rem, 40rem) 20rem;

    .cd-service-body,
    .descricao {
      display: none;
    }
  }

  @media screen and (max-width: 710px) {
    grid-template-columns: 8rem 10rem minmax(10rem, 20rem) minmax(10rem, 23rem);

    .cd-service-body,
    .descricao,
    .assinatura-body {
      display: none;
    }
  }

  @media screen and (max-width: 455px) {
    grid-template-columns: 8rem 10rem minmax(10rem, 20rem) minmax(10rem, 23rem);

    .cd-service-body,
    .descricao,
    .assinatura-body {
      display: none;
    }
  }

  .button-div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.6rem;

    /* @media screen and (min-width: 710px) {
      svg {
        :nth-child(1) {
          display: none;
        }
      }
    } */

    @media screen and (max-width: 455px) {
      width: 4rem;

      svg {
        /* :nth-child(1) {
          display: none;
        } */

        width: 14px;
        height: 14px;
      }
    }

    svg {
      :nth-child(2) {
        fill: #a02121;
      }

      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }

  .descricao {
    max-width: 45rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .assinatura {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    font-size: 1.6rem;
    font-weight: 400;
    color: #000;
    margin: 0;
  }
`;

export const ExpandedDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  /* align-items: center; */
  /* gap: 10px; */
  padding: 2rem;
  background-color: #e0dede;
  border-bottom: 1px solid #c0c0c0;

  /* .extra-details {
    display: flex;
    gap: 10px;

    svg {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  } */

  p {
    font-size: 1.6rem;
    font-weight: 600 !important;
    color: #000;
    margin: 0;
  }

  span {
    font-weight: 400;
  }
`;
