import React, {
  ElementType,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { setTimeout } from 'timers';
import {
  DropDownContainer,
  DropDownHeader,
  DropDownList,
  DropDownListContainer,
  ListItem,
} from './styled-selectbox-search';

// type IitensData = {
//   id: string;
//   description: string;
// };

interface ISelect {
  selectorData: any; // espera um []objeto que tenha description e um id. ex: [{description, id}, . . .]
  selectorDataKey: string[];
  onSetValues?: React.Dispatch<React.SetStateAction<any>>; //setState
  values: any; //state
  styleMethod?: string; // tema do select
  objectKey: string; // nome do state: {'empresa': {description, id}}
  getIndex?: (args: number) => void; // pega o index do item clicado
  placeholder?: string; // placeholder
  autoComplete?: boolean; // se for true ele faz o search sem apertar 'Enter'
  // arrayDataGet?: any;
  reset?: boolean; // reseta o input após um tempo.
  dontSearch?: boolean; // impede de pesquisar
  disabled?: boolean; // deixa desativado o select
  padding?: string; //padding do li
  onFieldSet?: (args: any) => void;
  idInput?: string;
  Icon?: ElementType;
  onFocus?: any;
  onBlur?: any;
  width?: any;
  fontFamily?: any;
  resetForm?: boolean;
}

const SelectBoxSearch: React.FC<ISelect> = ({
  selectorData,
  onSetValues,
  values,
  objectKey,
  styleMethod,
  getIndex,
  placeholder,
  dontSearch,
  padding,
  onFieldSet,
  onFocus,
  onBlur,
  idInput,
  selectorDataKey,
  autoComplete = false,
  disabled = false,
  reset = false,
  resetForm = false,
  Icon,
}) => {
  const validateObjects = useCallback(() => {
    let addObj = () => {
      const arrayLength = selectorDataKey.length;
      const result = [];

      for (let i = 0; i < arrayLength; i++) {
        result.push(values[objectKey]?.[selectorDataKey[i]]);
      }

      return result;
    };

    if (selectorDataKey.length <= 2) {
      return values[objectKey]?.[selectorDataKey[0]] &&
        values[objectKey]?.[selectorDataKey[1]]
        ? [
            values[objectKey]?.[selectorDataKey[0]],
            values[objectKey]?.[selectorDataKey[1]],
          ]
        : '';
    } else {
      return values[objectKey]?.[selectorDataKey[0]] &&
        values[objectKey]?.[selectorDataKey[1]]
        ? addObj()
        : '';
    }
  }, [objectKey]);

  const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState(
  //   values[objectKey]?.[selectorDataKey[0]] &&
  //     values[objectKey]?.[selectorDataKey[1]]
  //     ? [
  //         values[objectKey]?.[selectorDataKey[0]],
  //         values[objectKey]?.[selectorDataKey[1]],
  //       ]
  //     : '',
  // );

  const [selectedOption, setSelectedOption] = useState(validateObjects());

  // const [selectedOption, setSelectedOption] = useState(
  //   validateObjects() || (values && values?.[selectorDataKey[0]])
  //     ? [values?.[selectorDataKey[0]], values?.[selectorDataKey[1]]]
  //     : '',
  // );

  const [searchActive, setSearchActive] = useState(false);

  const [value, setValue] = useState(
    selectedOption[1],
    // selectedOption[1] || (placeholder ?? 'Selecione uma opção'),
  );
  const [newData, setNewData] = useState<Array<any>>([]);

  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(selectedOption[1]);
    // setValue(selectedOption[1] || (placeholder ?? 'Selecione uma opção'));
  }, [selectedOption]);

  const toggling = (e: any) => {
    if (!disabled) {
      setIsOpen(e.target.id === 'divSearch' ? true : !isOpen);
      setSearchActive(searchActive ? false : true);
    }
  };
  const onOptionClicked = (value: any, item: any, index: number) => () => {
    if (getIndex) {
      getIndex(index);
    }

    setSelectedOption(value);
    setIsOpen(false);

    if (onFieldSet) {
      let array = selectorDataKey;
      const result: { [key: string]: any } = {};

      for (let i = 0; i < array.length; i++) {
        result[selectorDataKey[i]] = value[i];
      }

      onFieldSet({
        [objectKey]: result,
      });
      //   onFieldSet({
      //     [objectKey]: {
      //       [selectorDataKey[0]]: value[0],
      //       [selectorDataKey[1]]: value[1],
      //     },
      //   });
    }
    if (onSetValues) {
      let array = selectorDataKey;
      const result: { [key: string]: any } = {};

      for (let i = 0; i < array.length; i++) {
        result[selectorDataKey[i]] = value[i];
      }
      onSetValues((prev: any) => ({
        ...prev,
        [objectKey]: {
          [selectorDataKey[0]]: value[0],
          [selectorDataKey[1]]: value[1],
        },
      }));
    }

    if (reset) {
      const time = setTimeout(() => {
        // setValue(placeholder ?? 'Selecione uma opção');
        // if (refInput.current && refInput.current.placeholder) {
        //   refInput.current.placeholder = `${placeholder ?? 'Escolha uma opção'}`
        // }
        setValue('');
      }, 1000);

      return () => clearTimeout(time);
    }
  };

  useEffect(() => {
    if (reset && resetForm) {
      setValue('');
      setSelectedOption([]);
      setNewData([]);
      setTimeout(() => {
      }, 100);
    }
  }, [reset]);


  const handleSubmit = () => {
    const valorPesquisado = value;
    if (valorPesquisado) {
      const filtered = selectorData.filter(
        (item: any) =>
          String(item[selectorDataKey[1]])
            .trim()
            .toLowerCase()
            .indexOf(valorPesquisado) !== -1,
      );
      if (filtered.length === 0) {
        return setNewData(() => [...selectorData]);
      }
      return setNewData(filtered);
    } else if (searchActive) {
      return setNewData(() => [...selectorData]);
    }
    return newData;
  };

  useEffect(() => {
    if (selectorData && selectorData.length > 0) {
      setNewData(() => [...selectorData]);
    }
  }, [selectorData]);

  useEffect(() => {
    if (null !== refInput.current && searchActive) {
      refInput.current.focus();
    }
  }, [isOpen, searchActive]);

  const selectRef = useRef<any>(null);

  useEffect(() => {
    function clickOutSideVerify(e: MouseEvent) {
      if (!selectRef.current.contains(e.target)) {
        setSearchActive(false);
        setIsOpen(false);
      }
    }
    document.addEventListener('click', clickOutSideVerify);
    return () => {
      document.removeEventListener('click', clickOutSideVerify);
    };
  }, [selectRef]);

  const handleAutoComplete = (value: string) => {
    const filtered = selectorData.filter(
      (item: any) =>
        String(item[selectorDataKey[1]]).trim().toLowerCase().indexOf(value) !==
        -1,
    );
    if (filtered.length === 0) {
      return setNewData(() => [...selectorData]);
    }
    return setNewData(filtered);
  };

  return (
    <>
      {Icon && (
        <div
          className="icon-left"
          style={{
            width: '2rem',
            position: 'relative',
            top: '3rem',
            left: '1.5rem',
            zIndex: '1',
          }}
        >
          <Icon />
        </div>
      )}
      <DropDownContainer
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        ref={selectRef}
        styleMethod={styleMethod}
      >
        <DropDownHeader
          dontSearch
          searchActive
          onClick={toggling}
          styleMethod={styleMethod}
        >
          <div id="divSearch">
            <input
              id={idInput}
              type="search"
              // style={{width: `${width}`, fontFamily: `${fontFamily}`}}
              data-testid="searchInput"
              readOnly={dontSearch}
              placeholder={placeholder ?? 'Escolha uma opção'}
              disabled={disabled}
              ref={refInput}
              onChange={(e) => {
                if (e.target.value) {
                  setValue(e.target.value);
                  if (autoComplete) {
                    handleAutoComplete(e.target.value);
                  }
                } else {
                  setValue('');
                  setNewData(() => [...selectorData]);
                }
              }}
              value={value || ''}
              onKeyPress={(e: any) => {
                if (e.charCode === 13) {
                  handleSubmit();
                  setSearchActive(false);
                }
              }}
            />
          </div>
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer styleMethod={styleMethod}>
            <DropDownList styleMethod={styleMethod}>
              {newData &&
                newData.length > 0 &&
                newData.map((item, i) => (
                  <ListItem
                    styleMethod={styleMethod}
                    padding={padding}
                    disabled={disabled}
                    id={item.id}
                    onClick={onOptionClicked(
                      [
                        item[selectorDataKey[0]],
                        item[selectorDataKey[1]],
                        item[selectorDataKey[2]],
                      ],
                      item,
                      i,
                    )}
                    key={i}
                  >
                    {item[selectorDataKey[1]]}
                  </ListItem>
                ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </>
  );
};
export default SelectBoxSearch;
