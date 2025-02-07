import React, { useRef, useEffect } from 'react';
import { Main } from './styles-checkbox-componente';

interface IProps {
  cod: number;
  size?: number;
  data: string | number;
  label?: string;
  name?: string;
  checked?: boolean;
  getData: React.Dispatch<React.SetStateAction<string | number | {}[]>>;
  inForm?: boolean;
}

export const CheckBox: React.FC<IProps> = ({
  cod,
  label,
  checked,
  getData,
  name,
  data,
  size = 2.5,
  inForm,
}) => {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checked) {
      getData(data);
    }
    if (checked && inForm) {
      getData(
        input.current?.checked
          ? [{ name: input.current?.name, data: data, cod: cod }]
          : [],
      );
    }
  }, [checked]);



  return (
    <Main size={size} cod={cod}>
      <input
        checked={checked}
        ref={input}
        key={cod}
        value={data}
        onChange={() => {
          if (inForm) {
            let check = input.current;
            if (check) {
              getData(
                input.current?.checked
                  ? [{ name: input.current?.name, data: data, cod: cod }]
                  : [],
              );
            }
          } else {
            if (input?.current?.checked) {
              getData(data);
            } else if (checked) {
              getData(data);
            } else {
              getData([]);
            }
          }
        }}
        type="checkbox"
        name={name}
        id={`input-checkbox-${cod}`}
        className="check-input"
      />
      <label htmlFor={`input-checkbox-${cod}`} className="checkbox">
        <svg viewBox="0 0 30 30" fill="none">
          <path d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z" />
        </svg>
      </label>
      <label className="check-label" htmlFor="input-checkbox">
        {label}
      </label>
    </Main>
  );
};
