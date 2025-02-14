import styled, { css } from 'styled-components';

interface iGridContainer {
  templateColumns: string;
  overflow?: boolean;
  gridCaixas?: boolean;
}

export const GridContainer = styled.div<iGridContainer>`
  /* display: grid; */
  /* grid-template-columns: ${({ templateColumns }) => templateColumns}; */
  /* width: 100%; */
  display: flex;
  flex: 1;
  border: 0.1rem solid #70788f;
  @media (max-width: 828px) {
    min-height: 140px;
  }

  ${({ gridCaixas }) =>
    !gridCaixas &&
    css`
    @media (max-width: 828px) {
      min-height: 41rem !important;
    }

    min-height: 18rem !important;
    `}

  ${({ overflow }) =>
    overflow &&
    css`
      overflow-x: auto;
    `}

  .list {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    list-style: none;
    flex: 1;
    /* overflow: hidden; */
    /* ${({ overflow }) =>
      overflow &&
      css`
        width: 100vw;
      `} */
  }

  .list .list-header {
    margin: 0;
    padding: 0;
    border-bottom: 0.1rem solid #70788f;
    position: relative;
    color: var(--color-Text);
    font-weight: 600;
    background-color: var(--backgroundInpera45);
  }

  .check--header {
    font-size: 1.5rem;
    margin: 0;
    display: grid;
    grid-template-columns: ${({ templateColumns }) => templateColumns};
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    user-select: none;
    min-height: 3rem;

    /* .check--label-text-center {
      border-bottom: 0.1rem solid #70788f;
      background-color: var(--backgroundInpera45);
    }

    .check--label-text-acoes {
      border-bottom: 0.1rem solid #70788f;
      background-color: var(--backgroundInpera45);
    }

    .check--label-text-right {
      border-bottom: 0.1rem solid #70788f;
      background-color: var(--backgroundInpera45);
    }

    .check--label-text-left {
      border-bottom: 0.1rem solid #70788f;
      background-color: var(--backgroundInpera45);
    } */

    span:last-child {
      border-right: none;
    }
  }

  /* @media (max-width: 804px) {
    .check--label {
      border-bottom: 0.1rem solid #70788f;
    }
  } */

  .check--label-text-center {
    display: flex;
    align-self: center;
    position: relative;
    padding: 0 1rem;
    font-size: 1.4rem;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-right: 0.1rem solid #70788f;

    &:last-child {
      border-right: none;
    }
  }

  .check--label-text-acoes {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    height: 100%;
  }

  .check--label-text-void {
    position: relative;
    padding: 0;
    height: 100%;
  }

  .check--label-text-left {
    display: flex;
    align-self: center;
    position: relative;
    padding: 0 1rem;
    border-right: 0.1rem solid #70788f;
    justify-content: start;
    align-items: center;
    font-size: 1.4rem;
    height: 100%;
  }

  .check--label-text-right {
    display: flex;
    align-self: center;
    position: relative;
    padding: 0 1rem;
    border-right: 0.1rem solid #70788f;
    justify-content: end;
    align-items: center;
    font-size: 1.4rem;
    height: 100%;
  }
`;
