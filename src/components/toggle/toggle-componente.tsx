import React, { useEffect, useRef } from 'react';
import { Container } from './styles-toggle-componente';

interface IProps {
  widthComponent?: number;
  heigthComponent?: number;
  cod: number;
  name: string;
  label: string;
  data: any;
  checked: boolean;
  setChecked?: React.Dispatch<React.SetStateAction<true | false>>;
  setFieldValue?: any;
  getData: React.Dispatch<React.SetStateAction<any>>;
  intoArray?: boolean;
}

const Toggle: React.FC<IProps> = ({
  widthComponent = 6,
  heigthComponent = 3.4,
  checked,
  getData,
  data,
  setChecked,
  setFieldValue,
  name,
  label,
  cod,
  intoArray,
}) => {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checked === true) {
      getData(data);
    } else {
      getData([]);
    }
    if (checked && intoArray) {
      getData(
        input.current?.checked
          ? [{ name: input.current?.name, data: data, cod: cod }]
          : [],
      );
    }
  }, [checked]);

  return (
    <Container
      widthComponent={widthComponent}
      heigthComponent={heigthComponent}
      cod={cod}
      checked={checked}
    >
      <label className={`switch-${cod}`} htmlFor={`checkbox-${cod}`}>
        <input
          className={`switch-input-${cod}`}
          key={cod}
          ref={input}
          type="checkbox"
          checked={checked}
          id={`checkbox-${cod}`}
          name={name}
          onChange={() => {
            if (setFieldValue) {
              setFieldValue(name, !checked);
            }
            if (setChecked) {
              setChecked(!checked);
            }
          }}
        />
        <div className={`slider-${cod} round-${cod}`}></div>
      </label>
      <label className={`switch-label-${cod}`}>{label}</label>
    </Container>
  );
};

export default Toggle;
