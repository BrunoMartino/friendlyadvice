import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownIcon } from '../../Icons/ArrowDown/arrowdown-icon';
import InputFieldDefault, {
  iInputFieldDefault,
} from '../../InputField/InputField-Default/index-inputfield-default';
import {
  ArrowIconBtn,
  Container,
  ListItem,
  SelectList,
} from './styles-selectbox-default';
import { useDispatch, useSelector } from 'react-redux';
// import { saveFilterSearch } from '../../../store/modules/Gestao/Controle/GerenciamentoVendasDiarias/FilterVendasDiarias/action';

interface iSelectBoxDefault extends Omit<iInputFieldDefault, 'onChange'> {
  data?: any[];
  keyToSelect?: string;
  handleSelect: (selected: string) => void;
  margin?: string;
}

const SelectBoxDefault: React.FC<iSelectBoxDefault> = ({
  data,
  keyToSelect,
  handleSelect,
  margin,
  ...props
}) => {
  const dispatch = useDispatch();

  const savedFilters = useSelector(
    (state: any) => state.session.filterVendasDiarias.savedSearchFilter,
  );

  const [showItems, setShowItems] = useState(false);
  const [selected, setSelected] = useState(
    savedFilters === '' && data ? data[0] : savedFilters,
  );
  // savedFilters === '' && data ? data[0] : savedFilters,

  const selectRef = useRef<any>(null);
  const selectUlRef = useRef<any>(null);

  useEffect(() => {
    function clickOutSideVerify(e: MouseEvent) {
      if (!selectRef.current.contains(e.target)) {
        setShowItems(false);
      }
      if (selectUlRef.current.contains(e.target)) {
        setShowItems(false);
      }
    }
    document.addEventListener('click', clickOutSideVerify);
    return () => {
      document.removeEventListener('click', clickOutSideVerify);
    };
  }, [selectRef]);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelected(savedFilters === '' ? data[0] : savedFilters);
      handleSelect(savedFilters === '' ? data[0] : savedFilters);
    }
  }, [data, savedFilters]);

  return (
    <div style={{ margin: margin }} ref={selectRef}>
      <Container>
        <InputFieldDefault
          {...props}
          readOnly
          defaultValue={data ? data[0] : 'Selecione uma opção'}
          value={selected}
          onClick={() => setShowItems(!showItems)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleSelect(e.currentTarget.value);
          }}
          fowardComponent={
            <ArrowIconBtn rotateArrow={showItems}>
              <ArrowDownIcon fill="#564F5280" />
            </ArrowIconBtn>
          }
        />
        <SelectList show={showItems}>
          <ul ref={selectUlRef}>
            {data &&
              data.length > 0 &&
              data.map((item: any, i: number) => {
                return (
                  <ListItem
                    key={i}
                    onClick={() => {
                      if (keyToSelect !== undefined) {
                        setSelected(item[`${keyToSelect}`]);
                        // handleSelect(item[`${keyToSelect}`]);
                        // dispatch(saveFilterSearch(item[`${keyToSelect}`]));
                      } else {
                        setSelected(item);
                        // handleSelect(item);
                        // dispatch(saveFilterSearch(item));
                      }
                    }}
                  >
                    {keyToSelect !== undefined ? item[`${keyToSelect}`] : item}
                  </ListItem>
                );
              })}
          </ul>
        </SelectList>
      </Container>
    </div>
  );
};

export default SelectBoxDefault;
