import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
  ChangeEvent,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useField } from '@unform/core';
import ReactInputMask from 'react-input-mask';

import {
  Container,
  ButtonEye,
  ErrorMessage,
} from './styles';
// import capsLock from 'capslock';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
  showPassword?: boolean;
  iconToggle?(): void;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  isMaskedPhone?: boolean;
  isMaskedDocument?: boolean;
  mask?: string | Array<string> | Array<RegExp>;
  refIndex?: any;
  pesquisaCEP?: any;
  ref?: any
}

const Input: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  showPassword,
  isMaskedPhone = false,
  isMaskedDocument = false,
  refIndex,
  pesquisaCEP,
  iconToggle,
  ref,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  // const [caps, setCaps] = useState();
  const [isFocusField, setIsFocusField] = useState(false);
  const [maskPhone, setMaskPhone] = useState('99999999999');
  const [maskDocument, setMaskDocument] = useState('99999999999999');

  const inputRef = useRef<HTMLInputElement | any>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // Função para Limpar Input de Formatação

  /* istanbul ignore next */
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    if (!isFocusField) {
      setMaskPhone('99999999999');
      setMaskDocument('99999999999999');
      setIsFocusField(true);
    }
  }, [isFocusField]);
  /* istanbul ignore next */
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFocusField(false);
    if (inputRef.current?.value.length === 10) {
      setMaskPhone('(99) 9999-9999');
    } else if (inputRef.current?.value.length === 11) {
      setMaskPhone('(99) 99999-9999');
      // setMaskDocument('999.999.999-99');
    } else if (inputRef.current?.value.length === 14) {
      setMaskDocument('99.999.999/9999-99');
    }

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    if (refIndex) {
      refIndex((value: any) => ({
        ...value,
        [fieldName]: inputRef,
      }));
    }
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, refIndex, registerField]);
  useEffect(() => {
    if (pesquisaCEP) {
      pesquisaCEP((value: any) => ({
        ...value,
      }));
    }
  }, [pesquisaCEP]);

  return (
    <>
      <Container
        style={containerStyle}
        isErrored={!!error}
        isFocused={isFocused}
        isFilled={isFilled}
        data-testid="input-container"
        ref={ref}
      >
        {Icon && <Icon size={20} />}

        {isMaskedPhone ? (
          <ReactInputMask
            ref={inputRef}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            defaultValue={defaultValue}
            mask={maskPhone}
            maskChar=""
            {...rest}
          />
        ) : isMaskedDocument ? (
          <ReactInputMask
            ref={inputRef}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            defaultValue={defaultValue}
            mask={maskDocument}
            maskChar=""
            {...rest}
          />
        ) : (
          <input
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            defaultValue={defaultValue}
            ref={inputRef}
            {...rest}
          />
        )}

        {name === 'senha' && (
          <ButtonEye
            tabIndex={-1}
            type="button"
            onClick={iconToggle}
            data-testid="ButtonEye"
          >
            {/* {capsLock.observe(function (status: any) {
              setCaps(status);
            })} */}
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </ButtonEye>
        )}
      </Container>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {/* {caps && <CapsLockContainer>CapsLock Ativado</CapsLockContainer>} */}
    </>
  );
};

export default Input;
