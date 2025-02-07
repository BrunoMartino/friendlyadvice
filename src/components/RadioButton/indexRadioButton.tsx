import React, { InputHTMLAttributes } from 'react';
import { Component } from './stylesRadioButton';

interface Option {
  text: string;
  value: any;
}

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  itens: Array<Option>;
  name: string;
  value: any;
  setFieldValue?: any;
  marginRight?: any;
  marginLeft?: any;
  border?: string | undefined;
  padding?: string | undefined;
  paddingSpan?: string | undefined;
  marginSpan?: string | undefined;
  height?: string | undefined;
  marginTop?: string | undefined;
  handleChange?: any;
  disabled?: boolean;
}

const RadioButton: React.FC<RadioProps> = ({
  itens,
  name,
  setFieldValue,
  value,
  marginRight,
  marginLeft,
  border,
  padding,
  paddingSpan,
  marginSpan,
  height,
  marginTop,
  handleChange,
  disabled,
}) => {
  const changeFn = (e: any) => {
    setFieldValue(name, e.target.value);
    if (handleChange) handleChange();
  };

  return (
    <Component
      id={name}
      marginRight={marginRight}
      marginLeft={marginLeft}
      border={border}
      padding={padding}
      paddingSpan={paddingSpan}
      marginSpan={marginSpan}
      height={height}
      disabled={disabled}
      marginTop={marginTop}
    >
      {itens &&
        itens.length > 0 &&
        itens.map((item, i) => {
          return (
            <label key={i}>
              <input
                type="radio"
                name={name}
                value={item.value}
                id={item.text}
                onChange={changeFn}
                checked={item.value === value ? true : false}
                disabled={disabled}
              />
              <span>{item.text}</span>
            </label>
          );
        })}
      <input type="hidden" id={name} name={name} value={value} />
    </Component>
  );
};

export default RadioButton;
