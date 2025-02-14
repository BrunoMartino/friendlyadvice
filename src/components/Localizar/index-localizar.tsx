import React from 'react';
import { FaSearch } from 'react-icons/fa';

import { LocalizarSearch } from './styles-localizar';

type LocalizarProps = {
  value?: string | number;
  onChange?: (e: any) => void;
  onKeyPress?: (e: any) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  maxLength?: number;
  id?: string;
};

const Localizar: React.FC<LocalizarProps> = ({
  value,
  onChange,
  onKeyPress,
  placeholder,
  disabled,
  error,
  maxLength,
  id,
  ...rest
}) => {
  return (
    <LocalizarSearch
      error={error}
      style={{
        opacity: disabled ? 0.3 : 1,
      }}
    >
      <span className="localizar-icon-search">
        <FaSearch />
      </span>
      <input
        {...rest}
        id={id}
        maxLength={maxLength}
        // maxLength
        disabled={disabled}
        type="text"
        className="localizar-search-input"
        placeholder={
          placeholder ? placeholder : 'Localizar um pedido, número, cliente...'
        }
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </LocalizarSearch>
  );
};

export default Localizar;
