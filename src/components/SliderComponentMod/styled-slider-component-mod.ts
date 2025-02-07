import styled from 'styled-components';

interface IProps {
  activation?: any;
}

export const DivCarrossel = styled.div<IProps>`
  .active {
    background-color: #f2b05e;
    font-weight: bold;
    color: black;
  }

  p {
    padding: 0.6rem 2.5rem;
    cursor: pointer;
    border-radius: 1rem;
    background-color: #d7d7d7;
    width: 20rem !important;

    font-size: 1.6rem;
    color: #A8A4A6;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
