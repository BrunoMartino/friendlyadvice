import React, {
  InputHTMLAttributes,
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  readOnly: boolean;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  fontSize?: string;
  value?: string;
  inputRef?: React.MutableRefObject<HTMLTextAreaElement>;
}

const TextArea: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  fontSize,
  value,
  readOnly,
  inputRef,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled] = useState(false);
  const [isFocusField, setIsFocusField] = useState(false);
  const { fieldName, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    if (!isFocusField) {
      setIsFocusField(true);
    }
  }, [isFocusField]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFocusField(false);
  }, []);

  // Função para Limpar Input de Formatação

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isFocused={isFocused}
      isFilled={isFilled}
      data-testid="input-container"
      fontSize={fontSize}
    >
      {Icon && <Icon size={20} />}

      <textarea
        ref={inputRef}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        rows={10}
        defaultValue={value}
        readOnly={readOnly}
        data-testid="textarea"
      />
    </Container>
  );
};

export default TextArea;
