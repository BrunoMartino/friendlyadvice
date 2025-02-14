import styled, { css } from 'styled-components';

interface iListItem {
  templateColumns: string;
  templateColumnsMedia?: string;
  maxWidth?: Array<number>;
  dontExistCheck?: boolean;
  isTotalGeral?: boolean;
  clickeable?: boolean;
}

export const ListItem = styled.li<iListItem>`
  margin: 0;
  padding: 0;
  border-bottom: 0.1rem solid #70788f;
  position: relative;
  color: var(--color-Text);
  background-color: #fff;

  &:last-child {
    border: 0;
  }

  .check--label {
    margin: 0;
    display: grid;
    grid-template-columns: ${(props: any) =>
      props.templateColumns ? props.templateColumns : '1fr 1fr 1fr'};
    align-items: center;
    font-weight: bold;
    min-height: 3rem;
    /* cursor: pointer; */

    ${({ clickeable }) =>
    clickeable &&
    css`
      cursor: pointer;
    `}
  }

  .check--label-newTemplate {
    grid-template-columns: ${(props: any) =>
      !props.dontExistCheck
        ? `3rem ${props.templateColumns}`
        : `${props.templateColumns}`};
  }

  ${({ isTotalGeral }) =>
    isTotalGeral &&
    css`
      background-color: #f4e7d7;
      color: #d0944b;
    `}

  @media (max-width: ${(props) => props.maxWidth![0]}em) {
    .check--label {
      margin: 0;
      display: grid;
      grid-template-columns: ${(props: any) => props.templateColumnsMedia};
      align-items: center;
      cursor: pointer;
      min-height: 3rem;
    }
  }
`;
