import React, { useEffect, useState } from 'react';
import { ButtonEye, CapsLockContainer, ContainerSenha } from './styles';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Container, ContainerInput } from '../../Containers/containerInputs';

const InputSenha: React.FC<any> = (props) => {
  const EVENT_KEY_DOWN = 'keydown';
  const EVENT_KEY_UP = 'keyup';

  const [caps, setCaps] = useState<boolean>(false);
  const [mostrarSenha, setMostrarSenha] = useState('password');

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

  const cliqueMostrarSenha = () => {
    setMostrarSenha((prev) => (prev === 'password' ? 'text' : 'password'));
  };
  return (
    <>
      <Container>
        <ContainerSenha>
          <ContainerInput type={mostrarSenha} {...props} />

          <ButtonEye
            tabIndex={-1}
            type="button"
            onClick={cliqueMostrarSenha}
            data-testid="ButtonEye"
          >
            {mostrarSenha === 'password' ? <FiEye /> : <FiEyeOff />}
          </ButtonEye>
        </ContainerSenha>
      </Container>
      {caps && props.id === 'senha' && (
        <CapsLockContainer>CapsLock Ativado</CapsLockContainer>
      )}
    </>
  );
};

export default InputSenha;
