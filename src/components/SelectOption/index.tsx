import React, { useState, useEffect } from 'react';
import { Select } from './styled';

interface IitensData {
  id: string;
  description: string;
}

interface ISelectDefault {
  funcOnClick: (el: IitensData, i: number) => void;
  id?: string;
  name?: string;
  placeholder?: string;
  data: Array<IitensData>;
  theme?: any;
}

const SelectOption: React.FC<ISelectDefault> = ({
  funcOnClick,
  id,
  name,
  placeholder,
  data,
  theme,
}) => {
  const [value, setValue] = useState('');

  let selectedIndex: number;
  let selectedItem: IitensData;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectedIndex = e.target.selectedIndex;
    selectedItem = data[selectedIndex];

    setValue(e.target.value);
    funcOnClick(selectedItem, selectedIndex);
  };

  useEffect(() => {
    funcOnClick(data[0], 0);
  }, []);

  return (
    <>
      <Select
        theme={theme}
        onChange={handleChange} // Chama a função handleChange quando a opção selecionada muda
        id={id}
        name={name}
        placeholder={placeholder ? placeholder : 'Selecione a opção'}
        value={value}
      >
        {data &&
          data.length > 0 &&
          data.map((el: IitensData) => (
            <option itemID={el.id} itemProp={el.description} key={el.id}>
              {el.description}
            </option>
          ))}
      </Select>
    </>
  );
};

export default SelectOption;
