import { subDays, subMonths } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { dataConvert } from '../../utils/fn';
import { Select, Options } from './styles-select-data';

type SelectDataProps = {
  onSetValues: any;
  onModalPerso: any;
  objectKey: string;
  values: any;
  nullValues?: Boolean;
  disabled?: boolean;
  onChange?: any;
};

const SelectData: React.FC<SelectDataProps> = ({
  onSetValues,
  onModalPerso,
  objectKey,
  values,
  nullValues,
  disabled = false,
}) => {
  const [selected, setSelected] = useState(
    values[objectKey].tipo ? values[objectKey].tipo : '',
  );
  const [showOptions, setShowOptions] = useState(false);

  const selectRef = useRef<any>();

  const handleClickOut = (e: any) => {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      setTimeout(() => {
        setShowOptions(false);
      }, 150);
    }
  };
  useEffect(() => {
    window.addEventListener('mousedown', handleClickOut);
    return () => {
      window.removeEventListener('mousedown', handleClickOut);
    };
  }, []);

  // useEffect(() => {
  //   if ((values && values[objectKey].inicial) || values[objectKey].final) {
  //     setSelected(`Personalizado`);
  //   }
  // }, [values]);


  // useEffect(() => {
  //   if (values.fechado !== 'Sim' && values.dataFechamento) {
  //     // setSelected('')
  //     // setSelected((prev: any) => ({
  //     //   ...prev,
  //     //   dataFechamento: {
  //     //     tipo: ``,
  //     //     inicial: undefined,
  //     //     final: undefined,
  //     //   },
  //     // }));
  //   }
  // }, [values.fechado]);

  const handleSelect = (e: any) => {
    const { id } = e.target;
    setSelected(`${id}`);

    switch (id) {
      case '': {
        // let datePlaceholder = new Date();
        onSetValues((prev: any) => ({
          ...prev,
          [objectKey]: {
            tipo: ``,
            inicial: undefined,
            final: undefined,
          },
        }));
      }
      case 'Hoje': {
        let datePlaceholder = new Date();
        onSetValues((prev: any) => ({
          ...prev,
          [objectKey]: {
            tipo: `${id}`,
            inicial: new Date(
              datePlaceholder.getFullYear(),
              datePlaceholder.getMonth(),
              datePlaceholder.getDate(),
              0,
              0,
              0,
              0,
            ),
            final: new Date(
              datePlaceholder.getFullYear(),
              datePlaceholder.getMonth(),
              datePlaceholder.getDate(),
              23,
              59,
              59,
              999,
            ),
          },
        }));

        break;
      }

      case 'Ontem': {
        let datePlaceholder = new Date();
        onSetValues((prev: any) => ({
          ...prev,
          [objectKey]: {
            tipo: `${id}`,
            inicial: subDays(
              new Date(
                datePlaceholder.getFullYear(),
                datePlaceholder.getMonth(),
                datePlaceholder.getDate(),
                0,
                0,
                0,
                0,
              ),
              1,
            ),
            final: subDays(
              new Date(
                datePlaceholder.getFullYear(),
                datePlaceholder.getMonth(),
                datePlaceholder.getDate(),
                23,
                59,
                59,
                999,
              ),
              1,
            ),
          },
        }));

        break;
      }

      case 'Mês Atual': {
        let datePlaceholder = new Date();
        onSetValues((prev: any) => ({
          ...prev,
          [objectKey]: {
            tipo: `${id}`,
            inicial: new Date(
              datePlaceholder.getFullYear(),
              datePlaceholder.getMonth(),
              1,
              0,
              0,
              0,
              0,
            ),

            final: new Date(
              datePlaceholder.getFullYear(),
              datePlaceholder.getMonth() + 1,
              0,
              23,
              59,
              59,
              999,
            ),
          },
        }));

        break;
      }

      case 'Mês Anterior': {
        let datePlaceholder = new Date();
        onSetValues((prev: any) => ({
          ...prev,
          [objectKey]: {
            tipo: `${id}`,
            inicial: subMonths(
              new Date(
                datePlaceholder.getFullYear(),
                datePlaceholder.getMonth(),
                1,
                0,
                0,
                0,
                0,
              ),
              1,
            ),
            final: new Date(
              datePlaceholder.getFullYear(),
              datePlaceholder.getMonth(),
              0,
              23,
              59,
              59,
              999,
            ),
          },
        }));
        break;
      }

      default: {
        onSetValues((prev: any) => ({
          ...prev,
          [objectKey]: {
            tipo: `${id}`,
            inicial: undefined,
            final: undefined,
          },
        }));
      }
    }

    setTimeout(() => {
      setShowOptions(false);
    }, 150);
  };

  return (
    <>
      <Select
        ref={selectRef}
        disabled={disabled}
        onClick={() => {
          setShowOptions(!showOptions);
        }}
      >
        <span>{selected !== '' ? selected : 'Selecione uma Opção'}</span>
        <div className='container-select-data'>
          {values[objectKey].inicial && (
            <span className="select-data-selected">{`${dataConvert(
              values[objectKey].inicial,
            )} ${
              dataConvert(values[objectKey].final) !==
              dataConvert(values[objectKey].inicial)
                ? ` - ${dataConvert(values[objectKey].final)}`
                : ''
            }`}</span>
          )}
          <span className="select-data-arrow">
            <IoIosArrowDown />
          </span>
        </div>
      </Select>
      {showOptions && (
        <Options>
          <ul>
            {nullValues && (
              <li
                id=""
                onClick={handleSelect}
                className="select-data-opcao"
              ></li>
            )}

            <li id="Hoje" onClick={handleSelect} className="select-data-opcao">
              Hoje
            </li>
            <li id="Ontem" onClick={handleSelect} className="select-data-opcao">
              Ontem
            </li>
            <li
              id="Mês Atual"
              onClick={handleSelect}
              className="select-data-opcao"
            >
              Mês Atual
            </li>
            <li
              id="Mês Anterior"
              onClick={handleSelect}
              className="select-data-opcao"
            >
              Mês Anterior
            </li>
            <li
              id="Personalizado"
              onClick={() => {
                onModalPerso({
                  openModal: true,
                  objectKey: objectKey,
                  handleSelect: () => {
                    setSelected('Personalizado');
                  },
                });
                setShowOptions(false);
              }}
              className="select-data-opcao"
            >
              Personalizado
            </li>
          </ul>
        </Options>
      )}
    </>
  );
};

export default SelectData;
