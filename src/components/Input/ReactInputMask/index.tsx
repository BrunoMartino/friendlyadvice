import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
  ChangeEvent,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import NumberFormat from 'react-number-format';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  mask?: string | Array<string> | Array<RegExp>;
  pesquisaCEP?: any;
}

const InputMask: React.FC<any> = ({
  name,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isFocusField, setIsFocusField] = useState(false);

  const inputRef = useRef<any>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // Função para Limpar Input de Formatação

  /* istanbul ignore next */
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);

    if (!isFocusField) {
      setIsFocusField(true);
    }
  }, [isFocusField]);
  /* istanbul ignore next */
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFocusField(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
      data-testid="input-container"
    >
      {Icon && <Icon size={20} />}

      <NumberFormat
        displayType="input"
        type="tel"
        ref={inputRef}
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Troco para"
        fixedDecimalScale
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        allowNegative={false}
        maxLength={12}
        allowedDecimalSeparators={['.', ',']}
        removeFormatting={(v: any) => {
          return v.replace('.', '').replace(',', '.');
        }}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default InputMask;
