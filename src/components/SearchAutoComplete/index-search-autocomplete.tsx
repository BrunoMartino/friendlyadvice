import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import AutoCompleteDefault from '../AutoCompleteDefault/index-autocomplete';
import InputMascaras from '../InputMascaras/indexInputMascara';

import { Container, ButtonSearch } from './styles-search-autocomplete';

interface ISearchAutoComplete {
  id?: string | undefined;
  name?: string | undefined;
  placeholder?: string | undefined;
  maximumLength?: number | undefined;
  values?: string | undefined;
  handleSearch?: ({ ...args }) => void;
  onFocus?: ({ ...args }) => void;
  onBlur?: ({ ...args }) => void;
  onChange?: ({ ...args }) => void;
  tamanho?: string;
  ref?: any;
  readOnly?: boolean;
}

const SearchAutoComplete: React.FC<any> = React.forwardRef(
  (
    {
      handleSearch,
      id,
      name,
      placeholder,
      values,
      onFocus,
      onChange,
      onBlur,
      maximumLength,
      tamanho,
      disabled,
      readOnly = false,
    },
    ref,
  ) => {
    return (
      <Container style={{ opacity: disabled ? 0.5 : 1 }}>
        <InputMascaras
          id={id}
          name={name}
          placeholder={placeholder}
          tamanho={tamanho ? tamanho : '100%'}
          type="text"
          value={values}
          onFocus={onFocus}
          onChange={onChange}
          onBlur={onBlur}
          maxLength={maximumLength ? maximumLength : 100}
          ref={ref}
          disabled={disabled}
          readOnly={readOnly}
        />
        {!disabled && handleSearch && (
          <ButtonSearch className="search-icon" onClick={handleSearch}>
            <BiSearchAlt />
          </ButtonSearch>
        )}
      </Container>
    );
  },
);

export default SearchAutoComplete;
