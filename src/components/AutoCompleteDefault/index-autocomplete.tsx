import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

import { Content, Options, InputSearch } from './styles-autocomplete';

interface iAutocompleteDefault {
  itens?: any;
  objectKey?: any;
  secondKey?: any;
  onSetValues: any;
  filter: any;
  value: any;
  id: string;
  messageInformativa?: string;
  placeholder?: string;
}

const AutoCompleteDefault: React.FC<iAutocompleteDefault> = ({
  itens,
  objectKey,
  secondKey,
  onSetValues,
  value,
  filter,
  id,
  messageInformativa,
  placeholder,
}) => {
  const [search, setSearch] = useState<any>(
    filter && filter[objectKey] ? filter[objectKey] : '',
  );

  const [sugestoes, setSugestoes] = useState<any>([{}]);
  const [openSugestoes, setOpenSugestoes] = useState(false);

  const autocompleteRef = useRef<any>();

  const suggestions = useCallback(() => {
    if (search === '') {
      setSugestoes(itens);
    } else {
      if (itens) {
        setSugestoes(
          itens
            .sort((a: any, b: any) => (a[secondKey] > b[secondKey] ? 1 : -1))
            .filter((item: any) => {
              if (item && item[secondKey]) {
                return (
                  String(item[objectKey].trim())
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .indexOf(
                      String(search.trim())
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, ''),
                    ) >= 0 || item[secondKey].indexOf(search) >= 0
                );
              } else {
                return (
                  String(item && item[objectKey].trim())
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .indexOf(
                      String(search.trim())
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, ''),
                    ) >= 0
                );
              }
            }),
        );
      }
    }
  }, [search, itens]);

  const handleClickOut = (e: any) => {
    if (
      autocompleteRef.current &&
      !autocompleteRef.current.contains(e.target)
    ) {
      setTimeout(() => {
        setOpenSugestoes(false);
      }, 100);
    }
  };

  useEffect(() => {
    suggestions();
  }, [search]);

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOut);

    return () => {
      window.removeEventListener('mousedown', handleClickOut);
    };
  }, []);

  return (
    <Content ref={autocompleteRef}>
      <InputSearch>
        <input
          placeholder={placeholder ?? 'Selecione um item'}
          value={search}
          onClick={() => {
            suggestions();
            setOpenSugestoes(true);
            onSetValues((prev: any) => ({
              ...prev,
              [id]: { id: '', [objectKey]: '', [secondKey]: '' },
            }));
          }}
          onChange={(e: any) => {
            const { value } = e.target;
            setSearch(value);
          }}
        />
        <span className="autocomplete-document">{value?.doc}</span>

        <div
          style={{
            opacity: value.id ? '1' : '0',
            transition: 'all 200ms ease-in-out',
          }}
          className="autocomplete-nobody"
        >
          <span
            style={{
              transform: value.id ? 'translateY(0)' : 'translateY(-0.5rem)',
              transition: 'all 200ms ease-in-out',
            }}
          >
            <FaCheck />
          </span>
        </div>
      </InputSearch>
      {openSugestoes && (
        <Options>
          <ul>
            {sugestoes && sugestoes.length > 0 ? (
              sugestoes.map((item: any, i: number) => {
                return (
                  <li
                    key={i}
                    onClick={() => {
                      onSetValues((prev: any) => ({
                        ...prev,
                        [id]: {
                          id: item.id,
                          [objectKey]: item[objectKey],
                          [secondKey]: item[secondKey],
                        },
                      }));
                      setSearch(item[objectKey]);
                      setOpenSugestoes(false);
                    }}
                    className="autocomplete-opcao"
                  >
                    {item[objectKey]}
                    <span className="autocomplete-opcao-secondkey">
                      {item[secondKey] ? ` - ${item[secondKey]}` : ''}
                    </span>
                  </li>
                );
              })
            ) : (
              <li className="autocomplete-opcao">
                <span>{messageInformativa}</span>
              </li>
            )}
          </ul>
        </Options>
      )}
    </Content>
  );
};

export default AutoCompleteDefault;
