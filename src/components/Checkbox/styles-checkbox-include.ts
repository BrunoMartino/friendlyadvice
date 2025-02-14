import styled from 'styled-components';

export const Container = styled.div`
  .check--label {
    margin: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    min-height: max-content;
    width: max-content;
  }

  .checkbox-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0rem 0.7rem;
    width: 100%;
  }

  .hidden-box {
    display: none;
  }

  .checkbox {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 1.8rem;
    min-height: 1.8rem;
    background-color: #fff;
    z-index: 1;
    border: 0.1rem solid #2b2b2b;
    border-radius: 0.5rem;
    margin: 0.5rem 0;
  }

  .checkbox-descricao {
    font-size: 1.3rem;
    font-weight: 500;
    color: #2b2b2b;

    position: relative;
    width: fit-content;
    display: grid;
    align-items: center;
    transition: color 0.3s ease;
  }

  .checkbox-circle {
    position: absolute;
    top: auto;
    width: 0rem;
    height: 0rem;
    background-color: orange;
    border-radius: 50%;
  }

  .checkbox svg {
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    top: auto;
    left: auto;
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

  .hidden-box:checked + .check--label .checkbox {
    background-color: orange;
    border: 0.1rem solid orange;
    transition: 300ms ease-in-out;
  }

  .hidden-box:checked + .check--label .checkbox-descricao {
    color: #2b2b2b;
    transition: 300ms ease-in-out;
  }

  .hidden-box:checked + .check--label .checkbox-valor {
    color: #2b2b2b;
    transition: 300ms ease-in-out;
  }

  .hidden-box:checked + .check--label .checkbox svg path {
    transition: 300ms ease-in-out;
  }

  .hidden-box:checked + .check--label .checkbox .checkbox-circle {
    width: 2.2rem;
    height: 2.2rem;
    opacity: 0;
    transition: 700ms ease-out;
  }

  .hidden-box:checked + .check--label .checkbox svg polyline {
    stroke-dashoffset: 0;
    transition: 300ms ease-in-out;
  }

  .hidden-box:disabled + .check--label .checkbox {
    border: 0.2rem solid #2b2b2b;
  }

  .hidden-box:disabled + .check--label .checkbox-descricao {
    color: #2b2b2b;
  }
`;
