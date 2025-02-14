import React from 'react';
import SelectBoxSearch from '../../../SelectBox/SelectBox-Search/SelectBox-Search';

interface IPadraoSelect {
  exposeSelected: (e: string) => void;
  data: { descricao: string; id: string }[];
  valoresIniciais: { descricao: string; id: string };
  idInput: string;
}

export const PadraoSelect = ({
  exposeSelected,
  data,
  idInput,
  valoresIniciais,
}: IPadraoSelect) => {
  return (
    <>
      <SelectBoxSearch
        idInput={idInput}
        autoComplete
        borderless
        dontSearch
        selectorData={data}
        selectorDataKey={['id', 'descricao']}
        onFieldSet={(e) => {
          exposeSelected(e[idInput]);
        }}
        values={{[idInput]: valoresIniciais}}
        objectKey={idInput}
      />
    </>
  );
};
