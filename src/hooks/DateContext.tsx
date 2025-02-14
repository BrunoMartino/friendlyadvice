import React, { createContext, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { dataLocal } from '../utils/fn';

interface IDataInicial {
  pDataInicial: Date | string;
}

interface IDataFinal {
  pDataFinal: Date | string;
}
interface IDataRange {
  pOBJDataRange: object;
}

interface DataContextData {
  dataInicial: Date | string | object;
  dataFinal: Date | string | object;

  atualizaData(credentials: IDataRange): Promise<string>;
}

export const DateContext = createContext<DataContextData>({
  dataInicial: new Date(),
  dataFinal: new Date(),
} as DataContextData);

export const DataContextoGeral: React.FC = ({ children }) => {
  const local = useSelector((state: any) => state.global.empresaAdmin.local);

  const [stDataInicial, setStDataInicial] = useState<IDataInicial>(() => {
    return {
      pDataInicial: format(dataLocal(local), 'yyyy-MM-dd'),
    };
  });

  const [stDataFinal, setStDataFinal] = useState<IDataFinal>(() => {
    return {
      pDataFinal: format(dataLocal(local), 'yyyy-MM-dd'),
    };
  });

  const atualizaData = async (pDataRange: any) => {
    if (pDataRange) {
      const { from, to } = pDataRange.pOBJDataRange;
      let dataInicial: string;
      let dataFinal: string;

      if (from) {
        dataInicial = format(
          new Date(from.year, from.month - 1, from.day),
          'yyyy-MM-dd',
        );
      } else {
        dataInicial = format(dataLocal(local), 'yyyy-MM-dd');
      }

      if (to) {
        dataFinal = format(
          new Date(to.year, to.month - 1, to.day),
          'yyyy-MM-dd',
        );
      } else {
        dataFinal = format(dataLocal(local), 'yyyy-MM-dd');
      }

      setStDataInicial({
        pDataInicial: dataInicial,
      });

      setStDataFinal({
        pDataFinal: dataFinal,
      });
    }

    return format(dataLocal(local), 'yyyy-MM-dd');
  };

  return (
    <DateContext.Provider
      value={{
        dataInicial: stDataInicial.pDataInicial,
        dataFinal: stDataFinal.pDataFinal,
        atualizaData,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

function useDate(): DataContextData {
  const context = useContext(DateContext);

  return context;
}

export { useDate };
