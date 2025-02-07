import { lighten } from 'polished';
import styled from 'styled-components';
import { backgroundInpera, colorText } from '../../../utils/colorsInpera';

interface iListItem {
  templateColumns: string;
  index?: number;
  colorLine?: string;
}

const hoverColor = lighten(0.3, backgroundInpera);

export const ListItem = styled.li<iListItem>`
  margin: 0;
  padding: 0;
  border-bottom: 0.1rem solid #70788f;
  position: relative;
  color: ${({ colorLine }) => (colorLine ? colorLine : colorText)};
  background-color: ${(props: any) =>
    props.index && props.index % 2 ? '#E8E8E8' : '#FFF'};

  &:last-child {
    border: 0;
    border-bottom: 0.1rem solid #70788f;
  }

  .check--label {
    margin: 0;
    display: grid;
    grid-template-columns: ${(props: any) =>
      props.templateColumns ? props.templateColumns : '1fr 1fr 1fr'};
    align-items: center;
    cursor: pointer;
    min-height: 3rem;
  }

  .hidden-box {
    display: none;
  }

  .checkbox {
    margin: auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 1.5rem;
    min-height: 1.5rem;
    border: 0.2rem solid #70788f90;
    border-radius: 0.3rem;
  }

  .checkbox-circle {
    position: absolute;
    top: auto;
    width: 0rem;
    height: 0rem;
    background-color: var(--backgroundInpera);
    border-radius: 50%;
  }

  .checkbox svg {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    top: -0.2rem;
    left: -0.2rem;
  }

  .checkbox svg path {
    fill: transparent;

    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;

    transition: all 0.6s ease;
  }

  .checkbox svg polyline {
    fill: none;
    stroke: #fff;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 1.8rem;
    stroke-dashoffset: 1.8rem;
    transition: all 0.3s ease;
  }

  .checkbox > span {
    pointer-events: none;
    vertical-align: middle;
  }

  &:hover {
    background-color: ${hoverColor} !important;
    transition: 400ms;
  }

  .hidden-box:checked + .check--label .checkbox {
    border-color: var(--backgroundInpera);

    transition: 300ms ease-in-out;
  }

  .hidden-box:checked + .check--label .checkbox svg path {
    fill: var(--backgroundInpera);
    transition: 300ms ease-in-out;
  }

  .hidden-box:checked + .check--label .checkbox .checkbox-circle {
    width: 3rem;
    height: 3rem;
    opacity: 0;
    transition: 700ms ease-out;
  }

  .hidden-box:checked + .check--label .checkbox svg polyline {
    stroke-dashoffset: 0;
    transition: 300ms ease-in-out;
  }

  .actions {
    margin-bottom: 0 !important;
  }

  .check--label-text-left {
    word-break: break-all;
  }

  #edit {
    margin-top: 1px !important;
  }

  @media (max-width: 961px) {
    .dropdown-item {
      font-size: 1.2rem !important;
    }

    .dropdown-item.disabled {
      font-size: 1.2rem !important;
    }
  }

`;
