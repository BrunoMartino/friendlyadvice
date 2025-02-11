import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fecharMensagem } from '../../store/modules/Components/SnackBar/action';
import CreateIcon from '../Icons/CreateIcon/create-icon-index';
import { CrossIcon } from '../Icons/Cross/cross-icon';
import { TipoMensagemSnack, TipoPosicaoSnack } from './enum';

import { ContainerSnack, Main } from './styled';

interface IDataParams {
  type?: TipoMensagemSnack;
  position?: TipoPosicaoSnack;
  timeDuration?: number;
}

const SnackbarDefault: React.ForwardRefRenderFunction<
  HTMLDivElement,
  IDataParams
> = ({ timeDuration }, ref) => {
  const isOpen = useSelector((state: any) => state.session.mensagem.open);
  const message = useSelector((state: any) => state.session.mensagem.mensagem);
  const type = useSelector((state: any) => state.session.mensagem.tipo);
  const personalTime = useSelector(
    (state: any) => state.session.mensagem.personalTime,
  );
  // const position = useSelector((state: any) => state.mensagem.posicao); não funcional ainda

  const dispatch = useDispatch();

  const elementos: NodeListOf<HTMLInputElement> =
    document.querySelectorAll('.input-time');

  const inputs: HTMLInputElement[] = Array.from(elementos);

  if (
    message ==
    'O horário final não pode ser menor ou igual que o horário inicial'
  ) {
    for (let i = 0; i < inputs.length; i += 2) {
      if (inputs[i].value >= inputs[i + 1].value && inputs[i].value != '') {
        inputs[i + 1].focus();
        break;
      }
    }
  }

  const timeExec = useCallback(() => {
    switch (type) {
      case TipoMensagemSnack.ERRO:
        return 7000;
      case TipoMensagemSnack.INFO:
        return 5000;
      case TipoMensagemSnack.SUCESSO:
        return 3000;
      default:
        return 2000;
    }
  }, [type]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        dispatch(fecharMensagem());
      }, personalTime ?? timeExec());
    }
  }, [isOpen]);

  return createPortal(
    <>
      {isOpen ? (
        <Main ref={ref}>
          <ContainerSnack
            isOpened={isOpen}
            type={type}
            time={personalTime ?? timeExec()}
          >
            <CreateIcon
              path={
                'M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'
              }
              fill="#fff"
              width="3rem"
              height="3rem"
            />
            <div className="div-snack-text">
              <p>
                {message && typeof message === 'string'
                  ? message
                  : 'Ops! Ocorreu um erro. Tente novamente mais tarde'}
              </p>
            </div>
            <div
              className="close-div"
              onClick={() => dispatch(fecharMensagem())}
            >
              <CrossIcon fill="#fff" width={'3rem'} height="3rem" />
            </div>
          </ContainerSnack>
        </Main>
      ) : null}
    </>,
    document.querySelector('#root-portal-snack')!,
  );
};

export default forwardRef(SnackbarDefault);
