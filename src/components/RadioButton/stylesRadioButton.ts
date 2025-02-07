import styled from 'styled-components';

import {
  backgroundInpera,
  colorText,
  colorWhite,
} from '../../utils/colorsInpera';

interface ComponentProps {
  marginRight: string | undefined;
  marginLeft: string | undefined;
  border: string | undefined;
  padding: string | undefined;
  paddingSpan: string | undefined;
  marginSpan: string | undefined;
  height: string | undefined;
  marginTop: string | undefined;
  disabled?: boolean;
}

export const Component = styled.div<ComponentProps>`
  display: flex;
  flex-wrap: wrap;

  margin-left: ${(props: any) => (props.marginLeft ? props.marginLeft : '0')};
  margin-right: ${(props: any) =>
    props.marginRight ? props.marginRight : '0'};

  border: ${({ border }) => (border ? border : 'none')};
  padding: ${({ padding }) => (padding ? padding : '0')};
  height: ${({ height }) => (height ? height : 'auto')};

  opacity: ${({ disabled }) => (disabled ? '40%' : '100%')};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '0.5rem')};

  label {
    display: flex;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 2.7rem;
    input {
      position: absolute;
      left: -9999px;
      &:checked + span {
        background-color: mix(${colorWhite}, ${backgroundInpera}, 84%);
        &:before {
          box-shadow: inset 0 0 0 0.5rem ${backgroundInpera};
        }
      }
    }
    span {
      display: flex;
      align-items: center;
      padding: ${({ paddingSpan }) => (paddingSpan ? paddingSpan : '0.6rem 0')};
      color: ${colorText};
      font-size: 1.4rem;
      border-radius: 99em;
      margin: ${({ marginSpan }) => (marginSpan ? marginSpan : '0 2rem 0 0')};
      transition: 0.25s ease;
      &:hover {
        background-color: mix(${colorWhite}, ${backgroundInpera}, 84%);
      }
      &:before {
        display: flex;
        flex-shrink: 0;
        content: '';
        background-color: ${colorWhite};
        width: 1.2em;
        height: 1.2em;
        border-radius: 50%;
        transition: 0.25s ease;
        box-shadow: inset 0 0 0 0.125em ${backgroundInpera};
        margin-right: 0.5rem;
      }
    }
  }
`;
