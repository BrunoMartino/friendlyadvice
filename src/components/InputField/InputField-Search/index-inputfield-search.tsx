import React, { useState, useCallback, useEffect } from 'react';
import { CrossIcon } from '../../Icons/Cross/cross-icon';
import { LoadingIcon } from '../../Icons/Loading/lading-icon';
import { SearchIcon } from '../../Icons/Search/search-icon';
import InputFieldDefault, {
  iInputFieldDefault,
} from '../InputField-Default/index-inputfield-default';
import { ResetSearchBtn } from './styles-inputfield-search';

interface iInputSearch extends Omit<iInputFieldDefault, 'icon'> {
  searchedValue?: string;
  handleSearch?: (search: string) => void;
  handleReset?: (...props: any) => void;
  loading?: boolean;
}

const InputFieldSearch: React.FC<iInputSearch> = ({
  searchedValue,
  handleSearch,
  handleReset,
  loading,
  ...props
}) => {
  const [value, setValue] = useState<string | undefined>(searchedValue);

  const handleChange = useCallback(
    (value: string | undefined) => {
      setValue(value);
      if (handleReset && !value) handleReset();
    },
    [value],
  );

  useEffect(() => {
    handleChange(searchedValue);
  }, [searchedValue]);

  return (
    <InputFieldDefault
      {...props}
      icon={loading ? <LoadingIcon fill={'#564f5280'} /> : <SearchIcon />}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleChange(e.target.value)
      }
      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (handleSearch && e.key === 'Enter') {
          handleSearch(e.currentTarget.value);
        }
      }}
      fowardComponent={
        handleReset ? (
          <ResetSearchBtn onClick={handleReset} hide={!searchedValue}>
            <CrossIcon fill="#564F52" />
          </ResetSearchBtn>
        ) : undefined
      }
    />
  );
};

export default InputFieldSearch;
