import styled from 'styled-components';

interface iGridContainer {
  templateColumns: string;
  templateColumnsMedia?: string;
  maxWidth?: Array<number>;
  dontExistCheck?: boolean;
}

export const GridContainer = styled.div<iGridContainer>`
  display: flex;
  flex-direction: column;
  flex: 1;
  /* border: 1px solid #70788f; */
  border-left: 0.1rem solid #70788f;
  border-top: 0.1rem solid #70788f;
  border-bottom: 0.1rem solid #70788f;

  .list {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
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
    grid-template-columns: ${(props: any) =>
      props.templateColumns ? props.templateColumns : '1fr 1fr 1fr'};
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    user-select: none;
    min-height: 3rem;
  }

  .check--label-display-none {
    span {
      display: none;
    }
  }

  .check--label-text-center {
    display: flex;
    align-self: center;
    position: relative;
    padding: ${(props: any) => (props.maxWidth![0] ? '0 0.5rem' : '0 1rem')};
    font-size: 1.4rem;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-right: 0.1rem solid #70788f;
    &:last-child {
      border-right: none;
    }
  }

  .text-break {
    text-overflow: ellipsis !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
    /* margin-top: 7px; */
    padding: 6px !important;
  }

  .check--label-text-acoes {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${(props: any) => (props.maxWidth![0] ? '0 0.5rem' : '0 1rem')};
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
    padding: ${(props: any) => (props.maxWidth![0] ? '0 0.5rem' : '0 1rem')};
    border-right: 0.1rem solid #70788f;
    justify-content: start;
    align-items: center;
    font-size: 1.4rem;
    height: 100%;
    word-break: break-all;
  }

  .check--label-text-right {
    display: flex;
    align-self: center;
    position: relative;
    padding: ${(props: any) => (props.maxWidth![0] ? '0 0.5rem' : '0 4rem')};
    border-right: 0.1rem solid #70788f;
    justify-content: end;
    align-items: center;
    font-size: 1.4rem;
    height: 100%;
  }

  .check--header-newTemplate {
    grid-template-columns: ${(props) =>
      !props.dontExistCheck
        ? `3rem ${props.templateColumns}`
        : `${props.templateColumns}`};
  }

  @media (max-width: ${(props) => props.maxWidth![0]}em) {
    .list {
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
      list-style: none;
      overflow: hidden;
    }

    .list .list-header {
      margin: 0;
      padding: 0;
      border-bottom: 1px solid #70788f;
      position: relative;
      color: var(--color-Text);
      font-weight: 600;
      /* background-color: var(--color-Text); */
    }

    .check--header {
      font-size: 1.5rem;
      margin: 0;
      display: grid;
      grid-template-columns: ${(props: any) =>
        props.templateColumnsMedia
          ? props.templateColumnsMedia
          : '1fr 1fr 1fr'};
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      user-select: none;
      min-height: 3rem;
    }

    .check--label-text-center {
      display: flex;
      align-self: center;
      position: relative;
      padding: ${(props: any) => (props.maxWidth ? '0 0.5rem' : '0 1rem')};
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
      padding: ${(props: any) => (props.maxWidth ? '0 0.5rem' : '0 1rem')};
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
      padding: ${(props: any) => (props.maxWidth ? '0 0.5rem' : '0 1rem')};
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
      padding: ${(props: any) => (props.maxWidth ? '0 0.5rem' : '0 1rem')};
      border-right: 0.1rem solid #70788f;
      justify-content: end;
      align-items: center;
      font-size: 1.4rem;
      height: 100%;
      -webkit-justify-content: flex-end;
    }
  }
`;

// .grid-pedidos-container {
//   display: flex;
//   flex-direction: column;
//   flex: 1;
//   border: 1px solid #70788f;
// }

// .list {
//   display: flex;
//   flex-direction: column;
//   margin: 0;
//   padding: 0;
//   list-style: none;
//   overflow: hidden;
// }

// .list .list-item {
//   margin: 0;
//   padding: 0;
//   border-bottom: 1px solid #70788f;
//   position: relative;
//   color: var(--color-Text);
// }

// .list .list-item:last-child {
//   border: 0;
// }

// .list .list-header {
//   margin: 0;
//   padding: 0;
//   border-bottom: 1px solid #70788f;
//   position: relative;
//   color: var(--color-Text);
//   font-weight: 600;
//   background-color: var(--backgroundInpera45);
// }

// .list .list-footer {
//   margin: 0;
//   padding: 0;

//   position: relative;
//   color: var(--color-Text);
//   font-weight: 600;
//   background-color: #fff;
// }

// .list .list-header:last-child {
//   border: 0;
// }

// .check--label {
//   margin: 0;
//   display: grid;
//   grid-template-columns: 3% 1fr 1fr 20% 1fr 1fr 8% 1fr 1fr 1fr 1fr 1fr;

//   align-items: center;
//   cursor: pointer;
//   min-height: 3rem;
// }

// .check--footer {
//   margin: 0;
//   display: grid;
//   grid-template-columns: 3% 1fr 1fr 20% 1fr 1fr 8% 1fr 1fr 1fr 1fr 1fr;
//   flex-direction: row;
//   flex-wrap: nowrap;
//   justify-content: flex-start;
//   align-items: center;
//   user-select: none;
//   min-height: 3rem;
// }

// .check--header {
//   font-size: 1.5rem;
//   margin: 0;
//   display: grid;
//   grid-template-columns: 3% 1fr 1fr 20% 1fr 1fr 8% 1fr 1fr 1fr 1fr 1fr;
//   flex-direction: row;
//   flex-wrap: nowrap;
//   justify-content: flex-start;
//   align-items: center;
//   user-select: none;
//   min-height: 3rem;
// }
