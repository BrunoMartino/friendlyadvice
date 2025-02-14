import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  useRef,
} from 'react';
import useWindowSize from '../../../../../hooks/useWindowSize';
import { useHistory } from 'react-router-dom';
import { getTokenDashboard } from '../../../../../utils/fn';
import { apiGenerica } from '../../../../../services/api';
import SnackbarDefault from '../../../../../components/SnackbarDefault';
import CabecalhoPadrao from '../../../../../components/CabecalhoPadrao/indexCabecalhoPadrao';
import CabecalhoTelaFlutter, {
  ETypeCabecalho,
} from '../../../../../components/CabecalhoTelaFlutter/indexCabecalhoTelaFlutter';
import {
  ButtonSection,
  Container,
  ContainerContent,
  ContainerListagem,
  Content,
  InputSection,
} from './listagemOrdensDeServicoStyle2';
import moment from 'moment';
import InputMascaras from '../../../../../components/InputMascaras/indexInputMascara';
import LoadingJump from '../../../../../components/LoadingJump/index-loading';
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdCheckboxOutline,
} from 'react-icons/io';
import { mascaraTelefone } from '../../../../../utils/mascaras';
import { FaEllipsisH, FaPen } from 'react-icons/fa';
import FilterSideMenu from '../../../../../components/FilterSideMenu';
import ModalFlutter from '../../../../../components/ModalFlutter/indexModalFlutter';
import {
  IDataItem,
  SliderComponentMod2,
  TTheme,
} from '../../../../../components/SliderComponentMod/index-slider-component-mod';
import { createSqlQuery, sqlGetAllStatus } from './apiGenericaRequest';
import PaginacaoFlutter, {
  TFilter,
} from '../../../../../components/PaginacaoFlutter/paginacaoFlutter';
import { ETypePagination } from '../../../../../components/Paginacao/interfacePaginacao';
import { ExpandedDiv } from '../Atendimento/styledAtendimento';
import { useOrderServiceContext } from '../../../../../hooks/useServiceOrderContext';
import { DateTime } from 'luxon';

type resData = {
  ID_ORDEMSERVICO: string;
  OSS_DESCRICAO: string;
  OS_NUMERO: string;
  CLI_RAZAO: string;
  ID_CLIENTE: string;
  OS_IDCLIENTE: string;
  FORMATTED_DATE: string;
  OS_DEFEITO: string;
  OS_DESCRICAO: string;
  OS_POSICAO: string;
  OS_DATAAGENDAMENTO: string;
  OS_SERIE: string;
  OS_TIPO: string;
  OS_FABRICANTE: string;
  CLI_TELEFONE: string;
  EQI_DESCRICAO: string;
  OS_VALOR: string;
  REP_NOME: string;
  OS_DATAENTREGA: string;
};

type TModal = { open: boolean; idSelected: string; codigo: string };

const showDate = (valor: string) => {
  return (
    new Date(valor).setHours(0, 0, 0).valueOf() <=
    new Date(1900, 1, 1, 0, 0, 0).valueOf()
  );
};

const ListagemOrdensDeServico = () => {
  const history = useHistory();
  const size = useWindowSize();
  const ctx = useOrderServiceContext();
  const mobileMode = size.width! / 16 <= 50;
  const secondMobileMode = size.width! <= 700;

  const [loading, setLoading] = useState(false);
  const [responseOs, setResponseOs] = useState<{
    os: IDataItem[];
    situacoes: IDataItem[];
    count: number;
  }>({
    count: 0,
    situacoes: [],
    os: [],
  });
  const [sqlQuery, setSqlQuery] = useState<string>(createSqlQuery({}));
  const [openFilter, setOpenFilter] = useState(false);
  const [modalFlutterVisible, setModalFlutterVisible] = useState<
    Partial<TModal>
  >({
    idSelected: '',
    open: false,
    codigo: '',
  });
  const [openInfosCard, setOpenInfosCard] = useState<Set<string>>(
    new Set<string>(),
  );
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    descricao: string;
  } | null>(null);

  const [getInputSearch, setInputSearch] = useState('');
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const handleSetSelectedValue = (
    value: { id: string; descricao: string } | null,
  ) => {
    const mapper = new Map();
    mapper.set('situacao', value?.id);
    setSqlQuery(createSqlQuery({ getInputSearch: mapper }));
    setSelectedItem(value);
  };

  const uniqueStatus = new Set();

  const paginacaoRef = useRef<{
    resetPagination: () => void;
    infoActualPage: () => number;
    handleFiltrar: ({ shouldLimit, sqlToExecute }: TFilter) => Promise<any>;
  }>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleResetPagination = () => {
    if (paginacaoRef.current) {
      paginacaoRef.current.resetPagination();
    }
  };

  const toggleInfo = (id: string) => {
    setOpenInfosCard((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getInfos = useCallback(async () => {
    apiGenerica.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
    try {
      setLoading(true);
      const responseSituacoes = await paginacaoRef.current?.handleFiltrar({
        sqlToExecute: sqlGetAllStatus,
        shouldLimit: false,
      });

      const responseOs = await paginacaoRef.current?.handleFiltrar({
        sqlToExecute: sqlQuery,
        shouldLimit: true,
      });

      ctx.setPagesTotal(responseOs[0]?.total || 1);

      setResponseOs({
        count: responseOs.length === 0 ? 1 : responseOs[0]?.total || 1,
        situacoes: responseSituacoes,
        os: responseOs.map((res: resData) => ({
          id: res.ID_ORDEMSERVICO,
          status: res.OSS_DESCRICAO,
          codigo: res.OS_NUMERO,
          cliente: res.CLI_RAZAO,
          clienteId: res.ID_CLIENTE,
          data: res.FORMATTED_DATE,
          problema: res.OS_DEFEITO,
          descricao: res.OS_DESCRICAO,
          posicao: res.OS_POSICAO,
          dataEntrega: res.OS_DATAENTREGA,
          dataAgendamento: res.OS_DATAAGENDAMENTO,
          serie: res.OS_SERIE,
          tipo: res.OS_TIPO,
          fabricante: res.OS_FABRICANTE,
          numero: res.CLI_TELEFONE,
          equipamento: res.EQI_DESCRICAO,
          valorOrcado: res.OS_VALOR,
          tecnico: res.REP_NOME,
        })),
      });
    } catch (e) {
      console.error('Error fetching data:', e);
    } finally {
      setLoading(false);
    }
  }, [sqlQuery]);

  responseOs.os.forEach((item) => {
    const { status, id } = item;

    if (!uniqueStatus.has({ id, descricao: status })) {
      uniqueStatus.add({ id, descricao: status });
    }
  });

  const handleOnClickSearch = () => {
    const inputRef = window.document.getElementById('fieldSearch');
    handleResetPagination();
    setSqlQuery(
      createSqlQuery({
        getInputSearch: inputRef?.getAttribute('value'),
      }),
    );
  };

  const handleOnClickClear = async () => {
    handleSetSelectedValue(null);
    setInputSearch('');
    handleResetPagination();
    setSqlQuery(createSqlQuery({ getInputSearch: '' }));
    await getInfos();
    ctx.resetState();
    localStorage.removeItem('savedFilters');
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem('savedFilters');
    };
  }, []);

  useEffect(() => {
    getInfos();
  }, [sqlQuery]);

  return (
    <Container>
      <SnackbarDefault />
      <CabecalhoPadrao />
      <CabecalhoTelaFlutter
        typeCabecalho={ETypeCabecalho.LISTAGEM}
        handleClickPlus={() => history.push('/cadastros/ordem-servico/')}
        handleClickSearch={() => handleOnClickSearch()}
        handleClickClear={() => handleOnClickClear()}
        setSql={setSqlQuery}
        breadcrumbs={
          <>
            <p>Inicio {'|'}</p>
            <p>☰ Aplicativos {'|'}</p>
            <p style={{ color: '#D0944B' }}>Ordens de Serviço</p>
          </>
        }
        areaWithBtns={
          <>
            <div className="btns-container" style={{ flex: 1 }}>
              <InputSection>
                <InputMascaras
                  styleInput={{
                    flex: '1',
                    marginTop: '0',
                    backgroundColor: 'white',
                  }}
                  type="text"
                  name="fieldSearch"
                  id="fieldSearch"
                  ref={inputRef}
                  value={getInputSearch}
                  placeholder="Buscar Ordem de Serviço por Numero ou por Nome do Cliente"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setInputSearch(event.target.value)
                  }
                />
              </InputSection>
              <ButtonSection className="b-div">
                <button onClick={() => setOpenFilter(true)}>Filtros</button>
              </ButtonSection>
            </div>
          </>
        }
        footerContent={
          <>
            <div>
              <p>{responseOs.os.length}</p>
              <p style={{ color: '#c0c0c0' }}>registro(s)</p>
            </div>
          </>
        }
        isOSPage
      >
        <div className="carousel-div-style">
          <SliderComponentMod2
            theme={TTheme.Flutter}
            setInitialValue={handleSetSelectedValue}
            data={responseOs.situacoes}
            item={selectedItem}
            resetFilterFn={handleOnClickClear}
          />
        </div>
        <ContainerContent>
          <Content>
            <div
              className="header"
              style={{ display: 'flex', gridArea: 'checkbox' }}
            >
              <div className="checkboxContainer">
                <input
                  type="checkbox"
                  name="check"
                  id="check"
                  checked={ctx.globalCheck[ctx.page] || false}
                  onChange={() => {
                    ctx.toggleAllItems(
                      !ctx.globalCheck[ctx.page],
                      responseOs.os?.map((item: any) => item.id),
                    );
                  }}
                />
              </div>
            </div>
            <div className="header" style={{ gridArea: 'numeroOs' }}>
              <p>Nº OS</p>
            </div>
            {!secondMobileMode && (
              <div className="header" style={{ gridArea: 'cliente' }}>
                <p className="cliente-row">Cliente</p>
              </div>
            )}
            {!mobileMode && (
              <>
                <div className="header" style={{ gridArea: 'telefone' }}>
                  <p>Tel. Cliente</p>
                </div>
                <div className="header" style={{ gridArea: 'equipamento' }}>
                  <p>Equipamento</p>
                </div>
              </>
            )}
            <div className="direita header" style={{ gridArea: 'valorOrcado' }}>
              <p>Valor Orçado</p>
            </div>
            {!mobileMode && (
              <div className="header" style={{ gridArea: 'tecnico' }}>
                <p>Técnico</p>
              </div>
            )}
          </Content>
        </ContainerContent>
        <ContainerListagem>
          {loading ? (
            <LoadingJump />
          ) : (
            <>
              {responseOs.os ? (
                responseOs.os.map((os) => {
                  return (
                    <React.Fragment key={os.id}>
                      <ContainerContent
                        checked={ctx.selectedItems.includes(os.id)}
                      >
                        <Content className="body-list">
                          <div style={{ display: 'flex' }}>
                            <div className="checkboxContainer">
                              <input
                                type="checkbox"
                                name="check"
                                id="check"
                                checked={ctx.selectedItems.includes(os.id)}
                                onChange={() => {
                                  if (ctx.selectedItems.includes(os.id))
                                    ctx.removeSelectedItem(os.id);
                                  else ctx.addSelectedItem(os.id);
                                }}
                              />
                            </div>
                            <div
                              className="menuModalContainer"
                              onClick={(e) => {
                                const rect =
                                  e.currentTarget.getBoundingClientRect();
                                setModalPosition({
                                  top: rect.top + window.scrollY,
                                  left: rect.left + window.scrollX,
                                });
                                setModalFlutterVisible({
                                  open: true,
                                  idSelected: os.id,
                                  codigo: os.codigo,
                                });
                              }}
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
                            <p>{os.codigo}</p>
                          </div>
                          {!secondMobileMode && (
                            <div>
                              <p className="cliente-row">{os.cliente}</p>
                            </div>
                          )}
                          {!mobileMode && (
                            <>
                              <div>
                                <p>{mascaraTelefone(os.numero)}</p>
                              </div>
                              <div>
                                <p>{os.equipamento}</p>
                              </div>
                            </>
                          )}
                          <div className="direita">
                            <p>
                              {Number(os.valorOrcado).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </p>
                          </div>
                          {!mobileMode && (
                            <div>
                              <p>{os.tecnico}</p>
                            </div>
                          )}
                          <div className="arrowContainer">
                            <div
                              onClick={() => {
                                toggleInfo(os.id);
                              }}
                            >
                              {openInfosCard.has(os.id) ? (
                                <IoIosArrowUp className="arrow" />
                              ) : (
                                <IoIosArrowDown className="arrow" />
                              )}
                            </div>
                          </div>
                        </Content>
                      </ContainerContent>
                      {openInfosCard.has(os.id) && (
                        <ExpandedDiv>
                          <p>
                            Data Inicial:{' '}
                            <span>{os.data === null ? '---' : os.data}</span>
                          </p>
                          <p>
                            Problema/Defeito:{' '}
                            <span>
                              {os.problema === null ? '---' : os.problema}
                            </span>
                          </p>

                          <p>
                            Descrição:{' '}
                            <span>
                              {os.descricao === null ? '---' : os.descricao}
                            </span>
                          </p>

                          <p>
                            Posição Atual:{' '}
                            <span>
                              {os.posicao === null ? '---' : os.posicao}
                            </span>
                          </p>

                          <p>
                            Data Agendamento:{' '}
                            <span>
                              {os.dataAgendamento === null
                                ? '---'
                                : moment(os.dataAgendamento).format(
                                    'DD/MM/YYYY',
                                  )}
                            </span>
                          </p>

                          <p>
                            Data Entrega:{' '}
                            <span>
                              {os.dataEntrega === null ||
                              showDate(os.dataEntrega)
                                ? '---'
                                : DateTime.fromJSDate(
                                    new Date(os.dataEntrega),
                                  ).toFormat('dd/MM/yyyy')}
                            </span>
                          </p>

                          <p>
                            Série:{' '}
                            <span>{os.serie === null ? '---' : os.serie}</span>
                          </p>

                          <p>
                            Tipo:{' '}
                            <span>{os.tipo === null ? '---' : os.tipo}</span>
                          </p>

                          <p>
                            Fabricante:{' '}
                            <span>
                              {os.fabricante === null ? '---' : os.fabricante}
                            </span>
                          </p>

                          {secondMobileMode && (
                            <p>
                              Cliente: <span> {os.cliente}</span>
                            </p>
                          )}
                          {mobileMode && (
                            <>
                              <p>
                                Tel. Cliente:{' '}
                                <span>
                                  {os.numero === null
                                    ? '---'
                                    : mascaraTelefone(os.numero)}
                                </span>
                              </p>

                              <p>
                                Equipamentos:{' '}
                                <span>
                                  {os.equipamento === null
                                    ? '---'
                                    : os.equipamento}
                                </span>
                              </p>

                              <p>
                                Técnico:{' '}
                                <span>
                                  {os.tecnico === null ? '---' : os.tecnico}
                                </span>
                              </p>
                            </>
                          )}
                        </ExpandedDiv>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <div
                  style={{
                    color: '#555555',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column',
                    marginTop: mobileMode ? '7rem' : '4rem',
                    columnGap: '10px',
                  }}
                >
                  <img
                    src="
                        https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F717b9c7a41a65c0b418b832cbc5eebfb.cdn.bubble.io%2Ff1650469453825x602418806590040700%2F2945609%255B1%255D.png?w=192&amp;h=192&amp;auto=compress&amp;dpr=1&amp;fit=max
                      "
                    style={{ width: '150px' }}
                  />
                  <h1 style={{ fontSize: '20px' }}>Sem Resultado</h1>
                  <p style={{ fontSize: '16px' }}>Tente Ajustar Seus Filtros</p>
                </div>
              )}
            </>
          )}
        </ContainerListagem>
        <PaginacaoFlutter
          limit={ETypePagination.CADASTROS}
          ref={paginacaoRef}
          afterChangePage={() => getInfos()}
          totalPages={responseOs.count}
        />
      </CabecalhoTelaFlutter>
      {openFilter && (
        <>
          <FilterSideMenu
            topMobile
            backOnClick={() => setOpenFilter(false)}
            setSqlFilters={setSqlQuery}
            handleSetStorage={(data) =>
              localStorage.setItem('savedFilters', JSON.stringify(data))
            }
            clearSelected={setSelectedItem}
          />
        </>
      )}
      <ModalFlutter
        visible={modalFlutterVisible.open!}
        position={modalPosition}
        titleModal={`O.S. Número - ${modalFlutterVisible.codigo}`}
        onClose={() => setModalFlutterVisible({ open: false })}
        optionsMenuModal={
          <>
            <button>
              <FaPen style={{ width: '1.5rem', height: '1.5rem' }} />
              Editar Ordem de Serviço
            </button>
            <button
              onClick={() =>
                history.push(
                  `/ordemDeServico/atendimento/${modalFlutterVisible.idSelected}`,
                )
              }
            >
              <IoMdCheckboxOutline
                style={{ width: '1.5rem', height: '1.5rem' }}
              />
              Atendimento de Ordem de Serviço
            </button>
          </>
        }
      />
    </Container>
  );
};

export default ListagemOrdensDeServico;
