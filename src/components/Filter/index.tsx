import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import {
  Footer,
  Container,
  ContainerCadastro,
  Content,
  ContainerGeral,
} from './styleFilter';
import useWindowSize from '../../hooks/useWindowSize';
import LoadingJump from '../LoadingJump/index-loading';
import { NoScrollRoot } from '../../styles/globalStyle';

interface Filter {
  children?: React.ReactNode;
  backOnClick: MouseEventHandler<HTMLButtonElement>;
  applyFilters: (e: any) => void;
  clearFilters: (e: any) => void;
}

const Filter: React.FC<Filter> = ({
  children,
  backOnClick,
  applyFilters,
  clearFilters,
}) => {
  const size = useWindowSize();
  const modalRef: any = useRef<HTMLDivElement>(null);
  const inputRef: any = useRef<any>(null);
  const muiAutoComplete = window.document.querySelector(
    '.MuiAutocomplete-popper',
  );
  let isMounted = true;

  const [loading, setLoading] = useState();

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLimparFiltros = () => {
    localStorage.removeItem('savedFilters');
    backOnClick(undefined as any);
  };

  const handleClickOutside = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !event.target.closest('.MuiAutocomplete-popper')
      ) {
        if (!muiAutoComplete) {
          backOnClick(undefined as any);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <NoScrollRoot />
      <ContainerGeral>
        <div id="overlay"></div>
        <Container ref={modalRef}>
          <ContainerCadastro>
            {loading ? <LoadingJump /> : <Content>{children}</Content>}
          </ContainerCadastro>
          <Footer>
            <button className="botao-voltar" onClick={backOnClick}>
              voltar
            </button>
            <button
              type="submit"
              onClick={(e: any) => {
                applyFilters(e);
                backOnClick(e);
              }}
              className="botao-salvar"
            >
              aplicar filtros
            </button>
            {size.width! / 16 < 50 && (
              <button
                onClick={(e: any) => {
                  clearFilters(e);
                  backOnClick(e);
                }}
              >
                limpar
              </button>
            )}
          </Footer>
        </Container>
      </ContainerGeral>
    </>
  );
};

export default Filter;
