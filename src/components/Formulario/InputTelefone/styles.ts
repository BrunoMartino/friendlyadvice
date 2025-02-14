import styled from 'styled-components';

export const ContainerTelefone = styled.div`
  width: 100%;
  height: 100%;

  .inputTelefone {
    flex: 1;
    width: 100%;
    height: 100%;
    background: transparent;
    border-radius: 1rem;
    color: #f4ede8;
    padding-left: 1.4rem;
    border: 0.2rem solid #232129;

    &::placeholder {
      color: #666360;
    }

    &:not([id='senha']):focus {
      color: #f4ede8;
      border-color: #f4ede8;
    }

    &fill {
      color: #f4ede8;
    }
  }
`;
