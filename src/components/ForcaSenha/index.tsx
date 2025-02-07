import { SetStateAction, useCallback, useEffect, useState } from 'react';
import React from 'react';
import { Container } from './styles';

interface Props {
  password: string;
  isValidPassword: React.Dispatch<SetStateAction<boolean>>;
}

export const PasswordStrengthMeter: React.FC<Props | any> = (props) => {
  const [forca, setForca] = useState(0);

  const forcaSenha = (senha: string) => {
    let _forca = 0;

    if (/[a-zA-Z0-9][!@#$%&;*]/.test(senha) && senha.length < 7) {
      _forca = 25;
    }
    if (senha.match(/[0-9]/)) {
      _forca += 25;
    }
    if (senha.match(/[a-z]+/)) {
      _forca += 25;
    }
    if (senha.match(/[A-Z]+/)) {
      _forca += 25;
    }
    if (senha.match(/[!@#$%&;*]/)) {
      _forca += 25;
    }

    // if (senha.length >= 4 && senha.length <= 7) {
    //   _forca += 10;
    // } else if (senha.length > 7) {
    //   _forca += 25;
    // }

    // if (senha.length >= 5 && senha.match(/[a-z]+/)) {
    //   _forca += 10;
    // }

    // if (senha.length >= 6 && senha.match(/[A-Z]+/)) {
    //   _forca += 20;
    // }

    // if (senha.length >= 7 && senha.match(/[@#$%&;*]/)) {
    //   _forca += 25;
    // }

    // if (senha.match(/([1-9]+)\1{1,}/)) {
    //   _forca += -25;
    // }

    setForca(_forca);
  };

  // const metricaSenha = useCallback(() => {
  //   if (forca < 30) {
  //     return 'Fraca';
  //   } else if (forca >= 30 && forca <= 50) {
  //     return 'Media';
  //   } else if (forca >= 50 && forca <= 70) {
  //     return 'Boa';
  //   } else if (forca >= 70 && forca <= 100) {
  //     return 'Excelente';
  //   }
  // }, [props.password]);

  useEffect(() => {
    forcaSenha(props.password);
  }, [props.password]);

  useEffect(() => {
    if (forca === 100) {
      props.isValidPassword(true);
    } else {
      props.isValidPassword(false);
    }
  }, [forca]);

  return (
    <Container {...props}>
      <div className="password-strength-meter">
        <progress
          className={`password-strength-meter-progress strength-${forca}`}
          value={forca}
        />
      </div>
    </Container>
  );
};

export default PasswordStrengthMeter;
