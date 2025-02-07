import React, { InputHTMLAttributes } from 'react';
import { InputDefault } from './styles-inputfield-default';
import InputFieldContainer, {
  iInputFieldContainer,
} from '../InputField-Container/index-inputfield-container';
import ReactInputMask from 'react-input-mask';

export interface iInputFieldDefault
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'width' | 'height'>,
    iInputFieldContainer {
  mask?: string | (string | RegExp)[];
  textAlign?: 'center' | 'right' | 'left';
  ref?: React.RefObject<HTMLInputElement> | any;
}

const InputFieldDefault: React.FC<iInputFieldDefault> = ({
  disabled,
  mask,
  label,
  required,
  error,
  fowardComponent,
  width,
  height,
  icon,
  focusColor,
  textAlign,
  ref,
  ...props
}) => {
  return (
    <InputFieldContainer
      disabled={disabled}
      label={label}
      required={required}
      error={error}
      fowardComponent={fowardComponent}
      width={width}
      height={height}
      icon={icon}
      ref={ref}
      focusColor={focusColor}
    >
      <InputDefault
        mask={mask ? mask : ''}
        textalign={textAlign}
        ref={ref}
        {...props}
        disabled={disabled}
      />
    </InputFieldContainer>
  );
};

export default InputFieldDefault;
