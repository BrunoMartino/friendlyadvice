import styled from 'styled-components';

interface propsInput {
  disabled?: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  background: #232129;
  width: 100%;
  height: 4rem;
  margin: 0.8rem 0rem;
`;

export const ContainerInput = styled.input<propsInput>`
  flex: 1;
  height: 100%;
  background: transparent;
  color: #f4ede8;
  padding-left: 1.2rem;
  border: 0.2rem solid #232129;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  font-size: 1.6rem;

  &::placeholder {
    color: #666360;
  }

  &:not([id='senha'])&:not([id='confirmarSenha']):focus {
    color: #f4ede8;
    border-color: #f4ede8;
  }

  &fill {
    color: #f4ede8;
  }
`;
