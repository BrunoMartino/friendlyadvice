import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  fontSize?: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  background: ${(props) =>
    props.theme.title === 'light' ? 'rgba(255, 255, 255, 0.75)' : '#232129'};
  border-radius: 1rem;
  padding: 0.5rem;
  width: 100%;
  height: auto;

  border: 2px solid
    ${(props) =>
      props.theme.title === 'light' ? '#232129' : 'rgba(255, 255, 255, 0.75)'};

  & + div {
    margin-top: 0.8rem;
  }

  ${(props) =>
    props.isFocused &&
    props.theme.title === 'dark' &&
    css`
      color: #f4ede8;
      border-color: #f4ede8;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #f4ede8;
    `}

  textarea {
    flex: 1;
    background: transparent;
    border: 0;
    color: ${(props) => (props.theme.title === 'dark' ? '#f4ede8' : '#000')};
    resize: none;

    ${(props) =>
      props.fontSize &&
      css`
        font-size: ${props.fontSize}px;
      `}

    &::placeholder {
      color: #fff;
    }
  }
`;
