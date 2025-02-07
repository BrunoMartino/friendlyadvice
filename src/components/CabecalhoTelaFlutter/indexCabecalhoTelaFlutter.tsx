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
} from './styleCabecalhoTelaFlutter';
import { FiFilter } from 'react-icons/fi';
import useWindowSize from '../../hooks/useWindowSize';
import { FaArrowLeft } from 'react-icons/fa';
import { useDetectOS } from '../../hooks/use-detect-os';

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
  button?: React.ReactNode;
  height?: string;
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
  button,
  height,
}: TProps) => {
  const system = useDetectOS();
  const size = useWindowSize();
  const mobileMode = size.width! / 16 <= 50;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (typeCabecalho === ETypeCabecalho.LISTAGEM) {
    return (
      <Container system={system} height={height}>
        <Cabecalhotela padding={padding}>
          <TituloPagina>
            <Caminho>{breadcrumbs}</Caminho>
            <AddButton onClick={handleClickPlus}>
              <span>+</span>
            </AddButton>
          </TituloPagina>
        </Cabecalhotela>
        {children}
        <Footer displayMobile={mobileMode}>
          {mobileMode ? (
            <>
              <div></div>
              <div className={mobileMode ? 'filtro' : ''} onClick={openModal}>
                <p>
                  <FiFilter style={{ width: '1.7rem', height: '1.7rem' }} />
                  filtros e busca
                </p>
              </div>
              <div></div>
            </>
          ) : (
            <>{footerContent}</>
          )}
        </Footer>
        {isModalOpen && (
          <Modal>
            <ModalContent>
              <ContainerPesquisa modal={isModalOpen}>
                {areaWithoutBtns}
                {areaWithBtns}
              </ContainerPesquisa>
              <div className="btns-container">
                <button onClick={closeModal}>
                  <span>
                    <FaArrowLeft /> voltar
                  </span>
                </button>
                <button className="btnFilter" onClick={handleClickSearch}>
                  <span>
                    <FiFilter style={{ width: '1.4rem', height: '1.4rem' }} />{' '}
                    aplicar filtros
                  </span>
                </button>
                <button onClick={handleClickClear}>
                  <span>limpar</span>
                </button>
              </div>
            </ModalContent>
          </Modal>
        )}
      </Container>
    );
  } else {
    return (
      <Container system={system} height={height}>
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
          <button onClick={handleClickSalvar} className="btn-salvar">
            salvar
          </button>
        </Footer>
      </Container>
    );
  }
};

export default CabecalhoTelaFlutter;
