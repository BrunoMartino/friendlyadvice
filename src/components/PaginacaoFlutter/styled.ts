import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  color: black;
  margin: 0 auto;
  color: rgb(85, 85, 85);
  font-size: 18px;
  font-weight: bold;
  align-items: center;

  button {
    border: none;
    background-color: unset;
    color: rgb(85, 85, 85);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    transition: 500ms;
  }

  button:hover {
    background-color: #d0944b;
  }
`;
