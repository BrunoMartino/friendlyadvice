import React from 'react';

import InputFieldDefault, {
  iInputFieldDefault,
} from '../InputField-Default/index-inputfield-default';
import { formatarValor, strNumToFloat } from '../../../utils/fn';

interface iInputMoney extends Omit<iInputFieldDefault, 'icon'> {}

const InputFieldMoney: React.FC<iInputMoney> = ({
  disabled,
  onChange,
  onBlur,
  textAlign = 'right',
  ...props
}) => {
  const handleValidMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    value = value.replace(/[^,\d]/g, '');
    value = value.replace(/^(\d*\,?)|(\d*)\,?/g, '$1$2');
    value = value.replace(/(\,\d{1}?[0-9])\d+$/g, '$1');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    e.currentTarget.value = value;
    if (onChange) onChange(e);
    return e;
  };

  const handleBlurFormat = (e: React.FocusEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    if (value) e.currentTarget.value = formatarValor(strNumToFloat(value));
    if (onBlur) onBlur(e);
    if (onChange) onChange(e);
    return e;
  };

  return (
    <InputFieldDefault
      {...props}
      textAlign={textAlign}
      onChange={handleValidMoney}
      onBlur={handleBlurFormat}
      disabled={disabled}
    />
  );
};

export default InputFieldMoney;
