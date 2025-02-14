import React, { useState } from 'react';
import {
  AddButton,
  Cabecalhotela,
  Caminho,
  Container,
  ContainerPesquisa,
  Footer,
  Modal,
  ModalContent,
  TituloPagina,
  TotalsContainer,
} from './styleCabecalhoTelaFlutter';
import { FiFilter } from 'react-icons/fi';
import useWindowSize from '../../hooks/useWindowSize';
import { useDetectOS } from '../../hooks/use-detect-os';
import FilterSideMenu from '../FilterSideMenu';
import Filter from '../Filter';

export enum ETypeCabecalho {
  CADASTRO = 'cadastro',
  LISTAGEM = 'listagem',
}

type TProps = {
  typeCabecalho: ETypeCabecalho;
  breadcrumbs: React.ReactNode;
  areaWithoutBtns?: React.ReactNode;
  areaWithBtns?: React.ReactNode;
  handleClickPlus?: () => void;
  handleClickSearch?: () => void;
  handleClickClear?: () => void;
  handleClickVoltar?: () => void;
  handleClickSalvar?: (e: any) => void;
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
  padding?: string;
  style?: object;
  btnDisabled?: any;
  setSql?: any;
  changeSalvarText?: string;
  hasTotals?: boolean;
  checkedList?: Array<Record<string, any>>;
  isOSPage?: boolean;
};

const CabecalhoTelaFlutter = ({
  typeCabecalho,
  breadcrumbs,
  areaWithoutBtns,
  areaWithBtns,
  handleClickPlus,
  handleClickSearch,
  handleClickClear,
  handleClickVoltar,
  handleClickSalvar,
  children,
  footerContent,
  padding,
  style,
  btnDisabled,
  setSql,
  changeSalvarText,
  hasTotals,
  checkedList,
  isOSPage,
}: TProps) => {
  const system = useDetectOS();
  const size = useWindowSize();
  const mobileMode = size.width! / 16 <= 50;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTotals, setShowTotals] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleApplyFilters = (filters: any) => {
    setSql(filters);
  };

  if (typeCabecalho === ETypeCabecalho.LISTAGEM) {
    return (
      <Container system={system} style={{ backgroundColor: 'white' }}>
        <Cabecalhotela padding={padding} style={style}>
          <TituloPagina>
            <Caminho>{breadcrumbs}</Caminho>
            <AddButton onClick={handleClickPlus}>+</AddButton>
          </TituloPagina>
          {!mobileMode && (
            <>
              <ContainerPesquisa>{areaWithoutBtns}</ContainerPesquisa>
              <ContainerPesquisa>
                {areaWithBtns}
                <div className="btns-container">
                  <button onClick={handleClickSearch}>Pesquisar</button>
                  <button onClick={handleClickClear}>Limpar</button>
                </div>
              </ContainerPesquisa>
            </>
          )}
        </Cabecalhotela>
        <div className="content-children">{children}</div>
        {showTotals && checkedList && checkedList.length === 0 && (
          <TotalsContainer>{footerContent}</TotalsContainer>
        )}
        <Footer displayMobile={mobileMode}>
          {mobileMode ? (
            <>
              {checkedList && checkedList.length > 0 ? (
                <>{footerContent}</>
              ) : (
                <>
                  {hasTotals && (
                    <div
                      className={mobileMode ? 'filtro' : ''}
                      style={{
                        position: 'absolute',
                        left: '0',
                        marginLeft: '1.4rem',
                        width: '8rem',
                      }}
                      onClick={() => {
                        setShowTotals(!showTotals);
                      }}
                    >
                      <p>totais</p>
                    </div>
                  )}
                  <div
                    className={mobileMode ? 'filtro' : ''}
                    onClick={() => {
                      openModal();
                    }}
                  >
                    <p>
                      <FiFilter style={{ width: '1.7rem', height: '1.7rem' }} />
                      filtros e busca
                    </p>
                  </div>
                </>
              )}
            </>
          ) : (
            <>{footerContent}</>
          )}
        </Footer>
        {isModalOpen && (
          <Modal>
            <ModalContent>
              {isOSPage ? (
                <FilterSideMenu
                  topMobile={false}
                  backOnClick={() => closeModal()}
                  setSqlFilters={handleApplyFilters}
                  handleSetStorage={(data) => {
                    localStorage.setItem('savedFilters', JSON.stringify(data));
                  }}
                />
              ) : (
                <Filter
                  backOnClick={() => closeModal()}
                  applyFilters={() => handleClickSearch!()}
                  clearFilters={() => handleClickClear!()}
                  children={
                    <>
                      {areaWithoutBtns}
                      {areaWithBtns}
                    </>
                  }
                />
              )}
            </ModalContent>
          </Modal>
        )}
      </Container>
    );
  } else {
    return (
      <Container system={system}>
        <Cabecalhotela padding={padding}>
          <TituloPagina>
            <Caminho>{breadcrumbs}</Caminho>
          </TituloPagina>
        </Cabecalhotela>
        {children}
        <Footer typeCabecalho={'cadastro'}>
          <button onClick={handleClickVoltar} className="btn-voltar">
            voltar
          </button>
          <button
            disabled={btnDisabled}
            onClick={handleClickSalvar}
            className="btn-salvar"
          >
            {changeSalvarText ? changeSalvarText : 'salvar'}
          </button>
        </Footer>
      </Container>
    );
  }
};

export default CabecalhoTelaFlutter;
