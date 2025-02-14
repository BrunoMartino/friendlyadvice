import React, { useState, useCallback, useEffect, useRef } from 'react';
import { LockIcon } from '../../Icons/Lock/lock-icon';
import InputFieldDefault, {
  iInputFieldDefault,
} from '../InputField-Default/index-inputfield-default';

import ShowPassBtn from './ShowPassBtn/index-showpass-btn';
import {
  handleColorMetter,
  InputPassContainer,
  PasswordStrength,
} from './styles-inputfield-password';

interface iInputPassword
  extends Omit<iInputFieldDefault, 'icon' | 'onChange' | 'onFocus'> {
  icon?: boolean;
  strengthMetter?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const InputFieldPassword: React.FC<iInputPassword> = ({
  icon,
  disabled,
  strengthMetter,
  onChange,
  onFocus,
  ...props
}) => {
  const [hidePass, setHidePass] = useState<boolean>(true);
  const [passStrength, setPassStrength] = useState<number>(0);
  const [hidePassStr, setHidePassStr] = useState<boolean>(true);

  const inptPasswordRef = useRef<any>(null);

  const handleHidePass = useCallback(() => {
    setHidePass(!hidePass);
  }, [hidePass]);

  const passStrengthMetter = useCallback(
    (senha: string) => {
      let strength = 0;

      if (senha.length > 7) {
        strength += 25;
      }
      if (senha.match(/[a-z]+/)) {
        strength += 25;
      }
      if (senha.match(/[A-Z]+/)) {
        strength += 25;
      }
      if (senha.match(/[@#$%&;*]/)) {
        strength += 25;
      }
      setPassStrength(strength);
    },
    [passStrength],
  );

  const handleClickOut = (e: any) => {
    if (
      inptPasswordRef.current &&
      !inptPasswordRef.current.contains(e.target)
    ) {
      setHidePassStr(true);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOut);
    return () => {
      window.removeEventListener('mousedown', handleClickOut);
    };
  }, []);

  return (
    <InputPassContainer>
      <div className="inpt-password" ref={inptPasswordRef}>
        <InputFieldDefault
          {...props}
          disabled={disabled}
          type={hidePass ? 'password' : 'text'}
          icon={icon ? <LockIcon /> : undefined}
          focusColor={
            strengthMetter ? handleColorMetter(passStrength) : undefined
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            passStrengthMetter(e.target.value);
            if (onChange) onChange(e);
          }}
          onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
            setHidePassStr(false);
            if (onFocus) onFocus(e);
          }}
          fowardComponent={
            <ShowPassBtn
              disabled={disabled}
              handleCLick={handleHidePass}
              hidePass={hidePass}
            />
          }
        />
      </div>
      {strengthMetter && (
        <PasswordStrength hide={hidePassStr} percentage={passStrength}>
          <div className="pass-line" />
        </PasswordStrength>
      )}
    </InputPassContainer>
  );
};

export default InputFieldPassword;
