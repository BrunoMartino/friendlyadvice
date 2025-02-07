import { useState, useEffect } from 'react';
import { formatarValor } from '../utils/fn';
import { useDebounce } from './use-debounce';

export const useFormatValue = (
  value: number,
  setValue: any,
  styleFormat: {
    format: string;
    noDebounce?: false | true;
    fraction?: { min: number; max: number };
  },
) => {
  // const [valor, setValor] = useState(value);
  const debouncedValue = useDebounce(value, 700);
  let numericValue;

  let intl = new Intl.NumberFormat('pt-br', {
    minimumFractionDigits: styleFormat?.fraction?.min || 2,
    maximumFractionDigits: styleFormat?.fraction?.max || 2,
    currency: styleFormat.format,
  }).format(debouncedValue);

  let patternNumber = intl;

  useEffect(() => {
    if (value || /^[0-9]/g.test(value.toString())) {
      if (styleFormat.noDebounce) {
        // const regex = value
        //   .toString()
        //   .replace(/\B(?=([1-9]\d{0,2})+(?:\,\d{3})*|0)/g, "$1.");

        setValue(patternNumber);
      }
      if (styleFormat.noDebounce && intl.length >= 8) {
        let splited = intl.split(',')[0].replace('.', '');
        numericValue = +splited;
      }
    } else {
      return;
    }
  }, [intl, value]);

  return { patternNumber, numericValue };
};
