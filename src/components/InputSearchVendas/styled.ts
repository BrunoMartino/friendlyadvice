import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;


  .searchIconLocation {
    background-color: #fff;
    padding-top: 0.55rem;
    padding-bottom: 0.58rem;
  }

  @media screen and (max-width: 800px) {
    .searchIconLocation {
      padding-top: 0.55rem;
      padding-bottom: 0.58rem;
    }
  }
`;

export const Input = styled.input`
  height: 3rem;
  min-width: 18rem;
  width: 25%;
  font-size: 1.2rem;
  border: none;
  display: flex;
  
`;
