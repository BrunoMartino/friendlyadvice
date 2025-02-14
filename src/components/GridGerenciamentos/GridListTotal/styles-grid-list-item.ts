import styled, { css } from 'styled-components';

interface iListItem {
  templateColumns: string;
  isTotalGeral?: boolean;
}

export const ListItem = styled.li<iListItem>`
  margin: 0;
  padding: 0;
  border-bottom: 0.1rem solid #70788f;
  position: relative;
  color: var(--color-Text);
  background-color: #fff;

  ${({ isTotalGeral }) =>
    isTotalGeral &&
    css`
      background-color: #f4e7d7 !important;
      color: #d0944b !important;
    `}

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
  }
`;
