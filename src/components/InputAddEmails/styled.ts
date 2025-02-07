import styled from 'styled-components';
import { borderInput } from '../../utils/colorsInpera';

export const Main = styled.div`
  margin: 0.6rem 0 0.6rem 0;

  label {
    font-weight: 600;
    color: #2c2f38;
    font-size: 1.4rem;
  }

  .error-handling{
    line-height: 10px !important;
    font-size: 1.2rem !important;
    color: red !important;
  }
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  border: ${borderInput} solid 1px;
  overflow-x: auto;
  width: 100%;

  input {
    height: 2rem;
    min-width: 25rem;
    font-size: 1.4rem;
    padding-left: 0.6rem;
    border: none;
    background-color: transparent;
    width: 100%;
  }

  p {
    color: #2c2f38;
    font-weight: 400;
    text-align: start;
    font-size: 1.4rem;
  }
`;

export const ContainerEmail = styled.div`
  border-radius: 2rem;
  background-color: #ebe8e4;
  display: flex;
  justify-items: start;
  align-items: center;
  padding: 0rem 0.6rem 0rem 0.6rem;

  button {
    border: none;
  }
`;
