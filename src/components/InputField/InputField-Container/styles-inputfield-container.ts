import styled from 'styled-components';

import { Colors } from '../../../utils/colorsAtualizada';

interface iInputDefault {
  error?: boolean;
  disabled?: boolean;
  width?: string;
  focusColor?: string;
  height?: string;
}

export const InputDefault = styled.div<iInputDefault>`
  --border-color: ${({ error }) =>
    error
      ? `${Colors.componentes.InputFieldContainer.colorErrors}`
      : `${Colors.componentes.InputFieldContainer.borderColor}`};
  --border-focus: ${({ error, focusColor }) =>
    focusColor
      ? focusColor
      : error
      ? `${Colors.componentes.InputFieldContainer.colorErrors}`
      : `${Colors.componentes.InputFieldContainer.contrastStrongColor}`};
  --background-color: ${({ disabled }) =>
    disabled ? `#EAE8E6` : '#fff'};
  /* --background-color: ${({ disabled }) =>
    disabled ? `${Colors.InperaColors.backgroundColorGray}` : '#fff'}; */
  --icon-color: ${({ error }) =>
    error
      ? `${Colors.componentes.InputFieldContainer.colorErrors}`
      : `${Colors.componentes.InputFieldContainer.iconColor}`};
  --icon-focus: ${({ error, focusColor }) =>
    focusColor
      ? focusColor
      : error
      ? `${Colors.componentes.InputFieldContainer.colorErrors}`
      : `${Colors.componentes.InputFieldContainer.contrastStrongColor}`};
  --input-width: ${({ width }) => (width ? width : '100%')};
  --input-height: ${({ height }) => (height ? height : '3.85rem')};

  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-weight: 500;
  transition: 200ms ease-in-out;
  background-color: var(--background-color);
  padding: 0;
  height: var(--input-height);
  width: var(--input-width);
  overflow: hidden;

  :focus-within {
    border: 1px solid var(--border-focus);

    .ipt-icon {
      svg path {
        fill: var(--icon-focus);
      }
    }
  }

  .ipt-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 0.8rem;

    svg path {
      transition: 200ms ease-in-out;
      fill: var(--icon-color);
    }
    :focus-within {
      fill: ${Colors.componentes.InputFieldContainer.contrastStrongColor};
    }
  }
  .ipt-fowardcomponent {
    position: relative;
  }
`;

export const LabelDefault = styled.label`
  display: flex;
  color: ${Colors.componentes.InputFieldContainer.labelColor};
  font-size: 1.4rem;
  margin: 0 0 0.2rem 0;
  font-weight: 600;

  .lbl-required {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    font-size: 1.4rem;
    color: ${Colors.componentes.InputFieldContainer.colorErrors};
  }
`;

export const InputError = styled.div`
  font-size: 1.2rem;
  color: ${Colors.componentes.InputFieldContainer.colorErrors};
`;
