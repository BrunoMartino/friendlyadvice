import { Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import {
  backgroundInpera,
  backgroundInpera10,
  colorText,
  greenInpera,
  redInpera,
} from '../../utils/colorsInpera';
import { Colors } from '../../utils/colorsAtualizada';

interface PropsStylesModalConfirmação {
  background?: string;
  border?: string;
}

export const MModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  z-index: 99999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(0.1rem);
  padding-top: 20rem;
  height: 100%;

  @media (max-width: 500px) {
    padding-top: calc(100vh * 0.2);
    position: fixed;
    height: 100vh;
  }
`;
export const MModal_Header = styled(Modal.Header)<PropsStylesModalConfirmação>`
  display: flex;
  align-items: flex-start;

  /* border: ${({ border }) =>
    border
      ? border
      : `0.3rem solid ${Colors.InperaColors.backgroundMainColor20}`}; */

  padding: 1rem 1rem;
  background: ${({ background }) =>
    background ? background : Colors.InperaColors.backgroundMainColor10};

  width: inherit;
  /* display: flex;
  align-items: flex-start;

  border-top: ${({ border }) =>
    border ? border : `0.3rem solid ${backgroundInpera}`};
  border-left: ${({ border }) =>
    border ? border : `0.3rem solid ${backgroundInpera}`};
  border-right: ${({ border }) =>
    border ? border : `0.3rem solid ${backgroundInpera}`};
    padding: 1rem 1rem;
    background: ${({ background }) =>
    background ? background : backgroundInpera10};

    width: inherit; */
  border-bottom: 0;
`;

export const MModal_Title = styled(Modal.Title)`
  display: flex;
  align-self: center;
  flex-direction: column;
  padding: 1rem 1rem;
  font-weight: 600;

  .mensagem {
    color: ${colorText};
    font-size: 2rem;
    text-align: center;
    font-family: 'Source Sans Pro', sans-serif;
  }

  .mensagemAviso {
    color: ${colorText};
    font-size: 1.5rem;
    text-align: center;
    font-weight: 400;
    margin-top: 1rem;
    margin-left: 1rem;
    font-family: 'Source Sans Pro', sans-serif;
  }
`;

export const MModal_Footer = styled(Modal.Footer)<PropsStylesModalConfirmação>`
  background: ${({ background }) =>
    background ? background : Colors.InperaColors.backgroundMainColor10};
  border-top: 0;
  /* border-bottom: ${({ border }) =>
    border ? border : `0.3rem solid ${backgroundInpera}`};
  border-left: ${({ border }) =>
    border ? border : `0.3rem solid ${backgroundInpera}`};
  border-right: ${({ border }) =>
    border ? border : `0.3rem solid ${backgroundInpera}`}; */
  width: inherit;
`;

export const MModal_Button = styled(Button)<PropsStylesModalConfirmação>`
  font-size: 1.7rem;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  height: 3.5rem;
  width: 10rem;
  border-radius: 0;
  .modalBtnCancel {
    background-color: ${redInpera};
  }

  .modalBtnSucess {
    background-color: ${greenInpera};
  }
`;
