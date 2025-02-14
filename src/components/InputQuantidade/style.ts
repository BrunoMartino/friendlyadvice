import styled from 'styled-components';

interface Props {
  buttonSize?: string;
  fontSize?: string;
  inputWidth?: string;
}

export const Container = styled.div<Props>`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;

  input {
    border: 0.1rem solid #ddd;
    /* color: #666; */
    width: ${(props) => (props.inputWidth ? props.inputWidth : '3rem')};
    text-align: center;
    font-family: inherit;
    font-size: ${(props) => (props.fontSize ? props.fontSize : '1.8rem')};
    -moz-appearance: textfield;
  }

  button {
    margin: 0;
    background: transparent;
    color: #fff;
    width: ${(props) => props.buttonSize};
    outline: none;
    border: none;

    svg {
      display: flex;
    }
  }
`;
