import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import {
  setDataPaginacao,
  setLimparFiltro,
  setLimparPesquisa,
  setValorPesquisado,
} from '../../store/modules/Components/Paginacao/action';
import HeaderGerenciamento from '../HeaderGerenciamento/index-header-gerenciamento';
import Localizar from '../Localizar/index-localizar';

import { Container, Modal } from './styles-modal-list';

interface ImodalList {
  width?: string | undefined;
  height?: string | undefined;
  children?: React.ReactNode;
  modal?: any;
  title?: string | undefined;
  icon?: React.ReactNode;
  handleAgree?: ({ ...args }) => void;
  handleCancel?: ({ ...args }) => void;
  handleSearch?: ({ ...args }) => void;
  newHandleSearch?: (...args: any) => void;
  origem?: string | undefined;
  url?: string | undefined;
  valueSearch?: any;
  placeholder: string;
  useSearchDebouncing?: boolean;
  breakMobile?: number;
}

const ModalList: React.FC<ImodalList> = ({ ...props }) => {
  const dispatch = useDispatch();

  const [debouncing, setDebouncing] = useState('');

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Para um scroll suave
    });
  }, []);

  useEffect(() => {
    let id: any;
    if (props.useSearchDebouncing) {
      id = setTimeout(() => {
        dispatch(setValorPesquisado(debouncing.trim()));
        props.newHandleSearch!(debouncing.trim());
      }, 700);
    }

    return () => {
      if (props.useSearchDebouncing && id) clearTimeout(id);
    };
  }, [debouncing, props.useSearchDebouncing]);

  const handleChange = useCallback(
    (valorPesquisado: any) => {
      if (valorPesquisado && valorPesquisado.length > 0) {
        dispatch(setValorPesquisado(valorPesquisado));
      } else {
        if (props.url && props.origem) {
          dispatch(setLimparFiltro());
          dispatch(setLimparPesquisa());
          setTimeout(() => {
            dispatch(setDataPaginacao(props.url, 0, props.origem));
          }, 500);
        }
      }
    },
    [props.valueSearch],
  );

  return createPortal(
    <Container>
      <Modal
        breakMobile={props.breakMobile}
        width={props.width}
        height={props.height}
      >
        <HeaderGerenciamento
          titulo={props.title}
          icone={props.icon}
          buttonActions
          handleConfirmar={props.handleAgree}
          handleCancelar={props.handleCancel}
        />
        <div className="line-separator" />
        <div className="div-search">
          <Localizar
            value={
              props.useSearchDebouncing
                ? debouncing
                : props.valueSearch
                ? props.valueSearch
                : ''
            }
            onChange={(e) => {
              const { value } = e.target;

              if (props.useSearchDebouncing) {
                setDebouncing(value);

                if (value) {
                  props.handleSearch!(value);
                }
                handleChange(value);
              } else {
                handleChange(value);
              }
            }}
            onKeyPress={(e: any) => {
              if (e.charCode === 13) {
                e.preventDefault();
                props.handleSearch!(e);
              }
            }}
            placeholder={props.placeholder}
          />
        </div>
        {props.children}
      </Modal>
    </Container>,
    document.getElementById('root-portal')!,
  );
};

export default ModalList;
