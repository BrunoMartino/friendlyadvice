import styled from 'styled-components';
import {
  backgroundHeaderGrid,
  backgroundGrid,
  backgroundZebraCinzadoGrid,
} from '../../utils/colorsInpera';

interface Istyles {
  maxWidth?: number;
  headerTemplate: string;
}

interface IList {
  order?: number;
  headerTemplate: string;
  newHeaderTemplateMedia?: string;

}

interface ITotal {
  headerTemplate: string;
  newHeaderTemplateMedia?: string;
}

export const TotalGridContainer = styled.div<ITotal>`
  /* border-top: 1px solid black; */
  border-right: 1px solid black;
  display: grid;
  grid-template-columns: ${(props) =>
    props.headerTemplate ? props.headerTemplate : '1fr 1fr 1fr'};
  //2.5rem 10rem 1fr 1fr 1fr 1fr 1fr 1.2fr
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  font-weight: bold;
  background-color: ${backgroundGrid};

  span {
    color: black;
    font-size: 1.6rem;
    font-weight: bold;
  }
`;

export const ListItemsContainerGrid = styled.div<IList>`
  border-top: 1px solid black;
  display: grid;
  grid-template-columns: ${(props) =>
    props.headerTemplate ? props.headerTemplate : '1fr 1fr 1fr'};
  //2.5rem 10rem 1fr 1fr 1fr 1fr 1fr 1.2fr
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  font-weight: bold;
  background-color: ${(props) =>
    props.order && props.order % 2
      ? backgroundGrid
      : backgroundZebraCinzadoGrid};

  span {
    color: black;
    font-size: 1.6rem;
  }
`;

export const TotalItemsContainer = styled.span`
  display: flex;
  align-items: center;
  border-right: 1px solid black;
  justify-content: center;
`;

export const ListItemsContainer = styled.span`
  display: flex;
  align-items: center;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  justify-content: center;

  &:last-child {
    border-right: none;
  }
  /* height: 3rem; */
`;

export const ContainerTable = styled.div<Istyles>`
  margin: 1.6rem 5rem;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  border-top: 1px solid black;

  .header-table {
    display: grid;
    grid-template-columns: ${(props) =>
      props.headerTemplate ? props.headerTemplate : '1fr 1fr 1fr'};
    //2.5rem 10rem 1fr 1fr 1fr 1fr 1fr 1.2fr
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    font-weight: bold;
    background-color: ${backgroundHeaderGrid};

    span {
      color: black;
      font-weight: bold;
      font-size: 1.6rem;
    }
  }

  .check--label-text-grid-center {
    display: flex;
    align-items: center;
    border-right: 1px solid black;
    justify-content: center;
  }

  .check--label-text-grid-right {
    display: flex;
    align-items: center;
    justify-content: right;
    border-right: 1px solid black;
  }

  .check--label-text-grid-left {
    display: flex;
    align-items: center;
    justify-content: left;
    border-right: 1px solid black;
  }

  `;
