import styled from 'styled-components';

interface iInputDefault {
  height?: string;
}

export const TextAreaDefault = styled.textarea<iInputDefault>`
  --txtarea-h: ${({ height }) => (height ? height : '100%')};

  display: flex;
  resize: none;
  border: none;
  border-radius: 0.5rem;
  color: #2e2b2c;
  background-color: transparent;
  font-size: 1.5rem;
  padding: 0.8rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: var(--txtarea-h);
  &::placeholder {
    color: #564f5280;
  }
`;
