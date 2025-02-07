import React, { useState, useEffect, useCallback } from 'react';
import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';

import { Container } from './style';
import { Props } from './interfaces';

const REGEX_I = /^[1-9]{1}[0-9]*$/;
const REGEX_F = /^\d{0,3},?\d{0,3}?$/;

const formatter = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 3,
  minimumFractionDigits: 3,
});

const InputQuantidade = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      config,
      buttonSize,
      fontSize,
      inputWidth,
      habilitar,
      maxLength,
      eventOnBlur,
    },
    ref,
  ) => {
    const [qtdLocal, setQtdLocal] = useState<any>(
      config.fracionado
        ? formatter.format(config.quantidade)
        : config.quantidade,
    );

    const handleChange = useCallback(
      async (e: any, cb: any) => {
        e.preventDefault();
        const { value } = e.target;

        const regx = config.fracionado ? REGEX_F : REGEX_I;

        if (value === '' || regx.test(value)) {
          setQtdLocal(value);
          formatAndSend(value, cb);
        }
      },
      [config],
    );

    useEffect(() => {
      if (habilitar) {
        setQtdLocal(1);
      }
    }, [habilitar]);

    const formatAndSend = useCallback((value: string, cb: any) => {
      const newValue = value.replace(',', '.');
      const result = parseFloat(newValue) || 0;
      cb(result);
    }, []);

    const handleUpdateQtd = useCallback(
      (cb: any, fator = 1) => {
        let newValue: string = '';

        if (config.fracionado) {
          const result = parseFloat(qtdLocal.replace(',', '.')) + fator * 0.1;
          if (result && result >= 999.999) {
            newValue = formatter.format(999.999);
          } else if (result <= 0.1) {
            newValue = formatter.format(0.1);
          } else {
            newValue = formatter.format(result);
          }
        } else {
          if (qtdLocal === '') {
            newValue = '1';
          } else {
            const result = parseInt(qtdLocal) + fator * 1;
            if (result && result >= 999) {
              newValue = '999';
            } else if (result <= 0) {
              newValue = '1';
            } else {
              newValue = result.toString();
            }
          }
        }

        setQtdLocal(newValue);
        formatAndSend(newValue, cb);
      },
      [config],
    );

    return (
      <Container fontSize={fontSize} inputWidth={inputWidth}>
        <button disabled={habilitar}>
          <MdRemoveCircleOutline
            onClick={(e: any) => {
              if (!habilitar) {
                e.preventDefault();
                handleUpdateQtd(config.onHandleChange, -1);
              }
            }}
            size={buttonSize}
          />
        </button>
        <input
          ref={ref}
          type="text"
          disabled={habilitar}
          value={qtdLocal}
          onBlur={(e: any) => {
            // if (eventOnBlur) {
            //   if (qtdLocal === '') {
            //     handleUpdateQtd(config.onHandleChange);
            //   }
            //   // handleUpdateQtd(config.onHandleChange);
            // }
          }}
          maxLength={config.fracionado ? 7 : 3}
          onChange={(e) => handleChange(e, config.onHandleChange)}
        />
        <button>
          <MdAddCircleOutline
            onClick={(e: any) => {
              if (!habilitar) {
                e.stopPropagation();
                handleUpdateQtd(config.onHandleChange);
              }
            }}
            size={buttonSize}
          />
        </button>
      </Container>
    );
  },
);

export default InputQuantidade;
