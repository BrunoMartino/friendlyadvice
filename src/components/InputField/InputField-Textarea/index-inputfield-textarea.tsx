import React from 'react';
import InputFieldContainer, {
  iInputFieldContainer,
} from '../InputField-Container/index-inputfield-container';
import { iInputFieldDefault } from '../InputField-Default/index-inputfield-default';
import { TextAreaDefault } from './styles-inputfield-textarea';

interface iInputTextArea extends Omit<iInputFieldDefault, 'icon' | 'height'> {
  height?: string;
}

const InputFieldTextArea: React.FC<iInputTextArea> = ({
  height,
  placeholder,
  ...props
}) => {
  return (
    <InputFieldContainer {...props} height="100%">
      <TextAreaDefault
        height={height}
        placeholder={placeholder}
      ></TextAreaDefault>
    </InputFieldContainer>
  );
};

export default InputFieldTextArea;
