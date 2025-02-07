import { useState, useCallback, useEffect } from 'react';
import React from 'react';
import { Container, ContainerInput, CapsLockContainer } from './stylesInputMascara';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const InputMascaras: React.FC<any> = React.forwardRef(
  ({ activeCaps = true, disabled, ...props }, ref) => {
    const EVENT_KEY_DOWN = 'keydown';
    const EVENT_KEY_UP = 'keyup';

    const [caps, setCaps] = useState<boolean>(false);
    const [isPassword] = useState(props.password ? true : false);

    const wasCapsLockActivated = (event: any) => {
      if (
        event.getModifierState &&
        event.getModifierState('CapsLock') &&
        caps === false
      ) {
        setCaps(true);
      }
    };

    const wasCapsLockDeactivated = (event: any) => {
      if (
        event.getModifierState &&
        !event.getModifierState('CapsLock') &&
        caps === true
      ) {
        setCaps(false);
      }
    };

    useEffect(() => {
      document.addEventListener(EVENT_KEY_DOWN, wasCapsLockActivated);
      document.addEventListener(EVENT_KEY_UP, wasCapsLockDeactivated);

      return () => {
        document.removeEventListener(EVENT_KEY_DOWN, wasCapsLockActivated);
        document.removeEventListener(EVENT_KEY_UP, wasCapsLockDeactivated);
      };
    });

    const [mostrarSenha, setMostrarSenha] = useState('password');

    const cliqueMostrarSenha = useCallback(() => {
      setMostrarSenha((prev) => (prev === 'password' ? 'text' : 'password'));
    }, []);

    return (
      <Container>
        <ContainerInput
          {...props}
          autoComplete="off"
          type={isPassword ? mostrarSenha : props.type}
          ref={ref}
          style={{
            opacity: disabled ? 0.5 : 1,
          }}
          disabled={ disabled }
        />

        {isPassword && (
          <button style={{ ...props.style }} tabIndex={-1} type="button" onClick={cliqueMostrarSenha}>
            {mostrarSenha === 'password' ? <FiEye /> : <FiEyeOff />}
          </button>
        )}

        {activeCaps && caps && isPassword && (<CapsLockContainer>CapsLock Ativado</CapsLockContainer>)}
      </Container>
    );
  },
);

export default InputMascaras;