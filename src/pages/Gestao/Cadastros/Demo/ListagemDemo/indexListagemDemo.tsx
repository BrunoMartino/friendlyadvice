import React, { useState } from 'react';
import {
  Container,
  ContainerContent,
  ContainerListagem,
  Content,
  ContextExpanded,
} from './listagemDemoStyle';
import CabecalhoTelaFlutter, {
  ETypeCabecalho,
} from '../../../../../components/CabecalhoTelaFlutter/indexCabecalhoTelaFlutter';
import {
  FaCheck,
  FaEllipsisH,
  FaPen,
  FaPrint,
  FaRegTrashAlt,
  FaSearch,
  FaWhatsapp,
} from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { AiOutlineMail } from 'react-icons/ai';
import useWindowSize from '../../../../../hooks/useWindowSize';
import ModalFlutter from '../../../../../components/ModalFlutter/indexModalFlutter';
import { useHistory } from 'react-router-dom';

const ListagemNotasFiscais: React.FC = () => {
  const history = useHistory();

  const [checked, setChecked] = useState<Array<string>>([]);
  const [showInfo, setShowInfo] = useState<Array<string>>([]);
  const [modalVisible, setModalVisible] = useState<string | null>(null);
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [currentnfId, setCurrentnfId] = useState<string | null>(null);

  const toggleInfo = (id: string) => {
    setShowInfo((prevShowInfo) =>
      prevShowInfo.includes(id)
        ? prevShowInfo.filter((itemId) => itemId !== id)
        : [...prevShowInfo, id],
    );
  };

  const toggleChecked = (id: string) => {
    setChecked((prevChecked) =>
      prevChecked.includes(id)
        ? prevChecked.filter((itemId) => itemId !== id)
        : [...prevChecked, id],
    );
  };

  const handleModalFlutterOpen = (
    event: React.MouseEvent<HTMLDivElement>,
    nfId: string,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setModalVisible(nfId);
    setCurrentnfId(nfId);
  };

  const closeModal = () => {
    setModalVisible(null);
  };

  const notasFiscaisData = [
    {
      id: '669eb8d4-4a68-44b6-ab15-b4bc39b1b1ab',
      notaFiscal: 'Código',
      dataEmissao: 'Data',
      cliente: 'Cliente',
      uf: 'UF',
      valor: 'Valor',
      status: 'Status',
    },
    {
      id: 'f18305d6-f8b3-44cb-8088-ff592c238155',
      notaFiscal: '000.000.3212',
      dataEmissao: '22/05/2024',
      cliente: 'José Mário da Cruz',
      uf: 'SP',
      valor: 200,
      status: 'Status',
    },
  ];

  const size = useWindowSize();
  const mobileMode = size.width! / 16 <= 50;
  const secondMobileMode = size.width! / 16 <= 28.75;

  if (size.width === undefined) {
    return <></>;
  }

  return (
    <Container>
      <CabecalhoTelaFlutter
        typeCabecalho={ETypeCabecalho.LISTAGEM}
        handleClickPlus={() => history.push('/cadastros/demo/')}
        handleClickSearch={() => alert('search')}
        handleClickClear={() => alert('clear')}
        breadcrumbs={
          <>
            <p>Início</p>
            <p>☰ Aplicativos</p>
            <p style={{ color: '#D0944B' }}>Demo</p>
          </>
        }
        areaWithBtns={
          <>
            <input
              type="text"
              name="input"
              id="input"
              placeholder="Nº Nota Fiscal, Cliente, Status"
              style={{ width: '100%' }}
            />
          </>
        }
        footerContent={
          <>
            <div>
              <p>02</p>
              <p style={{ color: '#c0c0c0' }}>registro(s)</p>
            </div>
            <div>
              <p>02</p>
              <p style={{ color: '#c0c0c0' }}>registro(s)</p>
            </div>
          </>
        }
      >
        <ContainerListagem>
          <ContainerContent>
            <Content typeContent={'header'}>
              <div style={{ display: 'flex' }}>
                <div className="checkboxContainer">
                  <input
                    type="checkbox"
                    name="check"
                    id="check"
                    onClick={() => {
                      notasFiscaisData.forEach((nf) => {
                        toggleChecked(nf.id);
                      });
                    }}
                  />
                </div>
                <div className="menuModalContainer">
                  <div></div>
                </div>
              </div>
              <div>
                <p>Código</p>
              </div>
              {!secondMobileMode && (
                <div className="centralizado">
                  <p>Data</p>
                </div>
              )}
              {!mobileMode && (
                <>
                  <div className="centralizado">
                    <p>UF</p>
                  </div>
                  <div>
                    <p>Cliente</p>
                  </div>
                </>
              )}
              <div className="direita">
                <p>Valor</p>
              </div>
              {!mobileMode && (
                <div>
                  <p>Status</p>
                </div>
              )}
              <div className="arrowContainer">
                <div></div>
              </div>
            </Content>
          </ContainerContent>

          {notasFiscaisData &&
            notasFiscaisData.map((nf: any) => (
              <React.Fragment key={nf.id}>
                <ContainerContent checked={checked.includes(nf.id)}>
                  <Content>
                    <div style={{ display: 'flex' }}>
                      <div className="checkboxContainer">
                        <input
                          type="checkbox"
                          name="check"
                          id="check"
                          onClick={() => toggleChecked(nf.id)}
                          checked={checked.includes(nf.id)}
                        />
                      </div>
                      <div
                        className="menuModalContainer"
                        onClick={(e) =>
                          handleModalFlutterOpen(e, nf.notaFiscal)
                        }
                      >
                        <div>
                          <FaEllipsisH
                            className="menuModal"
                            style={{ position: 'relative' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <p>{nf.notaFiscal}</p>
                    </div>
                    {!secondMobileMode && (
                      <div className="centralizado">
                        <p>{nf.dataEmissao}</p>
                      </div>
                    )}
                    {!mobileMode && (
                      <>
                        <div className="centralizado">
                          <p>{nf.uf}</p>
                        </div>
                        <div>
                          <p>{nf.cliente}</p>
                        </div>
                      </>
                    )}
                    <div className="direita">
                      <p>{nf.valor}</p>
                    </div>
                    {!mobileMode && (
                      <div>
                        <p>{nf.status}</p>
                      </div>
                    )}
                    <div className="arrowContainer">
                      <div onClick={() => toggleInfo(nf.id)}>
                        {showInfo.includes(nf.id) ? (
                          <IoIosArrowUp className="arrow" />
                        ) : (
                          <IoIosArrowDown className="arrow" />
                        )}
                      </div>
                    </div>
                  </Content>
                </ContainerContent>
                {showInfo.includes(nf.id) && mobileMode && (
                  <ContextExpanded>
                    <p>Cliente: {nf.cliente}</p>
                    <p>UF: {nf.uf}</p>
                    <p>Status: {nf.status}</p>
                  </ContextExpanded>
                )}
              </React.Fragment>
            ))}
        </ContainerListagem>
      </CabecalhoTelaFlutter>
      <ModalFlutter
        visible={modalVisible !== null}
        position={modalPosition}
        titleModal={currentnfId}
        onClose={closeModal}
        optionsMenuModal={
          <>
            <button>
              <FaRegTrashAlt style={{ width: '1.5rem', height: '1.5rem' }} />
              Excluir nota fiscal
            </button>
            <button>
              <FaPen style={{ width: '1.5rem', height: '1.5rem' }} />
              Editar nota fiscal
            </button>
            <button>
              <FaCheck style={{ width: '1.5rem', height: '1.5rem' }} />
              Autorizar no SEFAZ
            </button>
            <button>
              <FaPrint style={{ width: '1.5rem', height: '1.5rem' }} />
              Imprimir DANFE
            </button>
            <button>
              <FaSearch style={{ width: '1.5rem', height: '1.5rem' }} />
              Consultar NF-e no SEFAZ
            </button>
            <button>
              <FaWhatsapp style={{ width: '1.5rem', height: '1.5rem' }} />
              Enviar por WhatsApp
            </button>
            <button>
              <AiOutlineMail style={{ width: '1.5rem', height: '1.5rem' }} />
              Enviar por e-mail
            </button>
          </>
        }
      />
    </Container>
  );
};

export default ListagemNotasFiscais;
