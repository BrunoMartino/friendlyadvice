import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import {
  Footer,
  Container,
  ContainerCadastro,
  Content,
  ContainerGeral,
  BtnData,
  DatePickerFilter,
} from './styleFilterSideMenu';
import { Form, Formik } from 'formik';
import InputMascaras from '../InputMascaras/indexInputMascara';
import InputSelectCreate from '../InputSelectCreate/indexInputSelectCreate';
import MaskedInput from 'react-maskedinput';
import { ptBR } from 'date-fns/locale';
import useWindowSize from '../../hooks/useWindowSize';
import LoadingJump from '../LoadingJump/index-loading';
import { apiGenerica } from '../../services/api';
import { getTokenDashboard } from '../../utils/fn';
import { useDispatch } from 'react-redux';
import { abrirMensagem } from '../../store/modules/Components/SnackBar/action';
import { TipoMensagem } from '../SnackBar/interface';
import trataExcecao from '../../utils/tratamentoExcecao';
import moment from 'moment';
import { NoScrollRoot } from '../../styles/globalStyle';
import { createSqlQuery } from '../../pages/Gestao/Cadastros/OrdensDeServico/ListagemOrdensDeServico/apiGenericaRequest';

interface FilterSideMenuProps {
  children?: React.ReactNode;
  backOnClick: MouseEventHandler<HTMLButtonElement>;
  applyFilters?: (e: any) => void;
  setSqlFilters: (args: any) => any;
  topMobile: boolean;
  handleSetStorage: (a: any) => void;
  onSituationChange?: (descricao: string) => void;
  clearSelected?: any;
}

const clearObj = {
  numeroOS: '',
  cliente: {
    id: '',
    descricao: '',
  },
  dataInicialEntrada: '',
  dataFinalEntrada: '',
  dataEntregaInicial: '',
  dataEntregaFinal: '',
  filtros: {
    id: '',
    descricao: '',
  },
};

const FilterSideMenu: React.FC<FilterSideMenuProps> = ({
  children,
  backOnClick,
  applyFilters,
  setSqlFilters,
  topMobile,
  handleSetStorage,
  onSituationChange,
  clearSelected,
}) => {
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  let defaultSqlSearch = `SELECT os."ID_ORDEMSERVICO",os."OS_SERVICO",os."OS_NUMERO",os."OS_IDCLIENTE",os."OS_DATA",os."OS_DESCRICAO",os."OS_DEFEITO",os."OS_POSICAO",
    os."OS_SERIE",os."OS_DATAENTREGA",os."OS_HORAENTREGA",os."OS_VALOR",os."OS_SITUACAO",os."OS_IDPEDIDO",os."OS_IDTECNICOREPRESENTANTE",os."OS_TIPO",
    os."OS_IDEQUIPAMENTO",os."OS_PORDESCONTO",os."OS_VLRDESCONTO",os."OS_KMATUAL",os."OS_ACRESDESCMO",os."OS_CLIDEPENDENTE",os."OS_HORACONTATO",os."OS_DATAAGENDAMENTO",
    os."OS_PERIODOAGENDAMENTO",os."createdAt",os."updatedAt",os."deletedAt",os."OS_ORIGEM", count(*) over() as "total",
    case when convert_to_integer(os."OS_FABRICANTE") is not null then
		(select f."FOR_DESCRICAO" from principal."FORNECEDORES" f where f."FOR_NUMERO" = os."OS_FABRICANTE")
		else os."OS_FABRICANTE" end,
   oss."OSS_DESCRICAO", rep."REP_NOME", cli."CLI_RAZAO", equi."EQI_DESCRICAO", cli."CLI_DOCUMENTO",
  cli."CLI_TELEFONE", equi."EQI_PLACA", equi."EQI_DESCRICAO", equi."EQI_CHASSI", TO_CHAR(os."OS_DATA", 'DD/MM/YYYY HH24:MI') AS "FORMATTED_DATE",
  TO_CHAR(os."OS_DATAENTREGA", 'DD/MM/YYYY HH24:MI') AS "FORMATTED_OS_DATAENTREGA"
  FROM principal."ORDEMSERVICO" os
  LEFT JOIN principal."REPRESENTANTES" rep ON os."OS_IDTECNICOREPRESENTANTE" = rep."ID_REPRESENTANTE"
  LEFT JOIN principal."CLIENTES" cli ON os."OS_IDCLIENTE" = cli."ID_CLIENTE"
  LEFT JOIN principal."EQUIPAMENTOS" equi ON os."OS_IDEQUIPAMENTO" = equi."ID_EQUIPAMENTOS"
  LEFT JOIN principal."ORDEMSERVICOSITUACAO" oss ON (oss."ID_ORDEMSERVICO"::uuid = os."OS_SITUACAO"::uuid)
  WHERE os."deletedAt" IS NULL AND cli."deletedAt" IS NULL AND equi."deletedAt" IS NULL AND rep."deletedAt" IS NULL`;
  const sqlGetAllStatus = `
    SELECT
      "ID_ORDEMSERVICO" as id,
      "OSS_DESCRICAO" as descricao
    FROM principal."ORDEMSERVICOSITUACAO" oss
    WHERE oss."deletedAt" IS NULL
  `;

  const sqlGetAllClients = `
    SELECT
      "ID_CLIENTE" as id,
      "CLI_RAZAO" as descricao
    FROM principal."CLIENTES" c
    WHERE c."deletedAt" IS NULL
  `;

  const [initialValues, setInitialValues] = useState<any>({
    numeroOS: '',
    cliente: {
      id: '',
      descricao: '',
    },
    dataInicialEntrada: '',
    dataFinalEntrada: '',
    dataEntregaInicial: '',
    dataEntregaFinal: '',
    filtros: {
      id: '',
      descricao: '',
    },
  });

  useEffect(() => {
    const savedFilters = localStorage.getItem('savedFilters');

    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);
      if (
        parsedFilters.dataInicialEntrada.length > 0 &&
        parsedFilters.dataFinalEntrada.length > 0
      ) {
        setDataInicialEntrada(new Date(parsedFilters.dataInicialEntrada));
        setDataFinalEntrada(new Date(parsedFilters.dataFinalEntrada));
      }

      if (
        parsedFilters.dataEntregaInicial.length > 0 &&
        parsedFilters.dataEntregaFinal.length > 0
      ) {
        setDataInicialEntrega(new Date(parsedFilters.dataEntregaInicial));
        setDataFinalEntrega(new Date(parsedFilters.dataEntregaFinal));
      }
      setInitialValues(parsedFilters);
    } else {
      setInitialValues({
        numeroOS: '',
        cliente: {
          id: '',
          descricao: '',
        },
        dataInicialEntrada: '',
        dataFinalEntrada: '',
        dataEntregaInicial: '',
        dataEntregaFinal: '',
        filtros: {
          id: '',
          descricao: '',
        },
      });
    }

    const saveFiltersOnClose = () => {
      handleSetStorage(initialValues);
    };

    window.addEventListener('DOMContentLoaded', saveFiltersOnClose);
  }, []);

  const handleDateChange = (setDateFunction: any, date: any) => {
    setDateFunction(date);
  };

  const [openClientes, setOpenClientes] = useState(false);

  const [openFinalidade, setOpenFinalidade] = useState(false);

  const [dataInicialEntrada, setDataInicialEntrada] = useState<any>();

  const [dataFinalEntrada, setDataFinalEntrada] = useState<any>();

  const [dataInicialEntrega, setDataInicialEntrega] = useState<any>();

  const [dataFinalEntrega, setDataFinalEntrega] = useState<any>();

  const [loading, setLoading] = useState();

  const [allClientes, setAllClientes]: any = useState([]);

  const [allSituations, setAllSituations]: any = useState([]);

  const size = useWindowSize();

  const dispatch = useDispatch();

  const modalRef: any = useRef<HTMLDivElement>(null);
  const inputRef: any = useRef<any>(null);
  const muiAutoComplete = window.document.querySelector(
    '.MuiAutocomplete-popper',
  );

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

  const submitFilter = async (values: any) => {
    if (dataInicialEntrada && dataFinalEntrada) {
      if (dataFinalEntrada < dataInicialEntrada) {
        dispatch(
          abrirMensagem({
            tipo: TipoMensagem.ERRO,
            open: true,
            mensagem:
              'A data final de entrada não pode ser menor que a data inicial',
          }),
        );
        return;
      }
    }

    if (dataInicialEntrega && dataFinalEntrega) {
      if (dataFinalEntrega < dataInicialEntrega) {
        dispatch(
          abrirMensagem({
            tipo: TipoMensagem.ERRO,
            open: true,
            mensagem:
              'A data final de entrega não pode ser menor que a data inicial.',
          }),
        );
        return;
      }
    }

    try {
      const updatedValues = {
        ...values,
        dataInicialEntrada: dataInicialEntrada
          ? moment(dataInicialEntrada).format('YYYY-MM-DDTHH:mm:ss')
          : '',
        dataFinalEntrada: dataFinalEntrada
          ? moment(dataFinalEntrada).format('YYYY-MM-DDTHH:mm:ss')
          : '',
        dataEntregaInicial: dataInicialEntrega
          ? moment(dataInicialEntrega).format('YYYY-MM-DDTHH:mm:ss')
          : '',
        dataEntregaFinal: dataFinalEntrega
          ? moment(dataFinalEntrega).format('YYYY-MM-DDTHH:mm:ss')
          : '',
      };

      if (updatedValues.filtros && updatedValues.filtros.descricao) {
        onSituationChange && onSituationChange(updatedValues.filtros.descricao);
      }

      if (updatedValues.numeroOS) {
        defaultSqlSearch += ` AND os."OS_NUMERO"::integer = convert_to_integer('${updatedValues.numeroOS}')`;
      }

      if (updatedValues.cliente && updatedValues.cliente.id) {
        defaultSqlSearch += ` AND os."OS_IDCLIENTE" = '${updatedValues.cliente.id}'`;
      }

      if (updatedValues.filtros && updatedValues.filtros.id) {
        defaultSqlSearch += ` AND os."OS_SITUACAO" = '${updatedValues.filtros.id}'`;
      }

      if (updatedValues.dataInicialEntrada && updatedValues.dataFinalEntrada) {
        defaultSqlSearch += ` AND os."OS_DATA"::date BETWEEN '${updatedValues.dataInicialEntrada}' AND '${updatedValues.dataFinalEntrada}'`;
      }

      if (updatedValues.dataEntregaInicial && updatedValues.dataEntregaFinal) {
        defaultSqlSearch += ` AND os."OS_DATAENTREGA"::date BETWEEN '${updatedValues.dataEntregaInicial}' AND '${updatedValues.dataEntregaFinal}'`;
      }

      handleSetStorage(updatedValues);

      setSqlFilters(defaultSqlSearch);
      setInitialValues(updatedValues);

      if (backOnClick) {
        backOnClick(undefined as any);
      }
    } catch (error) {
      dispatch(
        abrirMensagem({
          tipo: TipoMensagem.ERRO,
          open: true,
          mensagem: 'Erro ao aplicar filtros, tente novamente.',
        }),
      );
    }
  };

  const handleLimparFiltros = () => {
    // setInitialValues({
    //   numeroOS: '',
    //   cliente: null,
    //   dataInicialEntrada: '',
    //   dataFinalEntrada: '',
    //   dataEntregaInicial: '',
    //   dataEntregaFinal: '',
    //   filtros: null,
    // });
    setInitialValues({ ...clearObj });

    // setSqlFilters(defaultSqlSearch);
    setSqlFilters(createSqlQuery({ getInputSearch: '' }));
    localStorage.removeItem('savedFilters');
    backOnClick(undefined as any);
  };

  useEffect(() => {
    let isMounted = true;
    apiGenerica.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

    const getSituations = async () => {
      try {
        const responseSituations = await apiGenerica.post(
          `
          /api/sql?hash=${process.env.REACT_APP_HASH_API_GENERICA}
        `,
          {
            type: 'select',
            sql: sqlGetAllStatus,
          },
        );

        if (isMounted) {
          setAllSituations([
            { id: '', descricao: '' },
            ...responseSituations.data.data,
          ]);
        }
      } catch (e) {
        if (isMounted) {
          dispatch(
            abrirMensagem({
              tipo: TipoMensagem.ERRO,
              open: true,
              mensagem: trataExcecao(e),
            }),
          );
        }
      }
    };

    const getAllClients = async () => {
      try {
        apiGenerica.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
        const responseClients = await apiGenerica.post(
          `
          /api/sql?hash=${process.env.REACT_APP_HASH_API_GENERICA}
        `,
          {
            type: 'select',
            sql: sqlGetAllClients,
          },
        );

        if (isMounted) {
          setAllClientes([
            { id: '', descricao: '' },
            ...responseClients.data.data,
          ]);
        }
      } catch (e) {
        if (isMounted) {
          dispatch(
            abrirMensagem({
              tipo: TipoMensagem.ERRO,
              open: true,
              mensagem: trataExcecao(e),
            }),
          );
        }
      }
    };

    getAllClients();
    getSituations();

    return () => {
      isMounted = false;
    };
  }, []);

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
        <Container ref={modalRef} topMobile={topMobile}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values: any) => {
              submitFilter(values);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              setFieldValue,
              handleSubmit,
            }) => (
              <Form
                onSubmit={handleSubmit}
                id="form"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                }}
              >
                <ContainerCadastro>
                  {loading ? (
                    <LoadingJump />
                  ) : (
                    <Content>
                      <h3 className="title">Filtros Avançados</h3>
                      <div className="content-div" id="content-div-top">
                        <div className="item">
                          <InputMascaras
                            id="numeroOS"
                            name="numeroOS"
                            placeholder="Nº da O.S"
                            type="text"
                            maxLength="150"
                            value={values.numeroOS}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            backgroundColor="white"
                          />
                          <label className="label">Nº da O.S</label>
                        </div>
                        <div className="item">
                          <InputSelectCreate
                            id="cliente"
                            placeholder="Cliente"
                            dados={allClientes.map((cl: any) => ({
                              id: cl.id,
                              descricao: cl.descricao,
                            }))}
                            open={openClientes}
                            setOpen={setOpenClientes}
                            notUseNewCadastro={true}
                            maxLength="150"
                            value={values.cliente}
                            setFieldValue={setFieldValue}
                            onBlur={handleBlur}
                            financasTheme
                            refcampo={inputRef}
                          />
                          <label className="label">Cliente</label>
                        </div>
                      </div>
                      <div className="content-div">
                        <div className="item" id="item">
                          <InputSelectCreate
                            id="filtros"
                            placeholder="Situação da O.S"
                            dados={allSituations.map((cl: any) => ({
                              id: cl.id,
                              descricao: cl.descricao,
                            }))}
                            open={openFinalidade}
                            setOpen={setOpenFinalidade}
                            notUseNewCadastro={true}
                            setFieldValue={setFieldValue}
                            value={values.filtros}
                            onBlur={handleBlur}
                            financasTheme
                            refcampo={modalRef}
                          />
                          <label className="label">Situação da O.S</label>
                        </div>
                      </div>
                      <div className="content-div">
                        <div className="item data-picker">
                          <DatePickerFilter
                            selected={dataInicialEntrada}
                            customInput={
                              size.width! / 16 > 56.25 && (
                                <MaskedInput
                                  mask="11/11/1111"
                                  disabled={true}
                                  onChange={(event: any) =>
                                    event.preventDefault()
                                  }
                                />
                              )
                            }
                            // closeOnScroll
                            onChange={(date) =>
                              handleDateChange(setDataInicialEntrada, date)
                            }
                            value={
                              dataInicialEntrada &&
                              moment(dataInicialEntrada).isValid()
                                ? dataInicialEntrada
                                : null
                            }
                            strictParsing={true}
                            selectsStart
                            locale={ptBR}
                            autoComplete="off"
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Data Inicial de Abertura"
                            className={`dataEmissao`}
                            // required={dataFinalEntrada !== null || dataFinalEntrada !== undefined || dataFinalEntrada !== ''}
                            required={
                              dataFinalEntrada &&
                              moment(dataFinalEntrada).isValid()
                            }
                          />
                          <label className="label">
                            Data Inicial de Abertura
                          </label>
                        </div>
                        <div className="item data-picker">
                          <DatePickerFilter
                            customInput={
                              size.width! / 16 < 56.25 && (
                                <MaskedInput
                                  mask="11/11/1111"
                                  disabled={true}
                                  onChange={(event: any) =>
                                    event.preventDefault()
                                  }
                                />
                              )
                            }
                            // closeOnScroll
                            selected={dataFinalEntrada}
                            onChange={(date) =>
                              handleDateChange(setDataFinalEntrada, date)
                            }
                            value={
                              dataFinalEntrada &&
                              moment(dataFinalEntrada).isValid()
                                ? dataFinalEntrada
                                : null
                            }
                            strictParsing={true}
                            selectsStart
                            locale={ptBR}
                            autoComplete="off"
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Data Final de Abertura"
                            className="dataEmissao"
                            // required={moment(dataInicialEntrada).isValid()}
                            required={
                              dataInicialEntrada &&
                              moment(dataInicialEntrada).isValid()
                            }
                          ></DatePickerFilter>
                          <label className="label">
                            Data Final de Abertura
                          </label>
                        </div>
                      </div>
                      <div className="content-div">
                        <div className="item data-picker">
                          <DatePickerFilter
                            selected={dataInicialEntrega}
                            customInput={
                              size.width! / 16 < 56.25 && (
                                <MaskedInput
                                  mask="11/11/1111"
                                  disabled={true}
                                  onChange={(event: any) =>
                                    event.preventDefault()
                                  }
                                />
                              )
                            }
                            // closeOnScroll
                            onChange={(date) => setDataInicialEntrega(date)}
                            value={dataInicialEntrega}
                            strictParsing={true}
                            selectsStart
                            locale={ptBR}
                            autoComplete="off"
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Data Inicial da Entrega"
                            className="dataEmissao"
                            calendarClassName="react-datepiker"
                            // required={moment(dataFinalEntrega).isValid()}
                            required={
                              dataFinalEntrega &&
                              moment(dataFinalEntrega).isValid()
                            }
                          ></DatePickerFilter>
                          <label className="label">
                            Data Inicial da Entrega
                          </label>
                        </div>
                        <div className="item data-picker">
                          <DatePickerFilter
                            selected={dataFinalEntrega}
                            customInput={
                              size.width! / 16 < 56.25 && (
                                <MaskedInput
                                  mask="11/11/1111"
                                  disabled={true}
                                  onChange={(event: any) =>
                                    event.preventDefault()
                                  }
                                />
                              )
                            }
                            // closeOnScroll
                            onChange={(date) => setDataFinalEntrega(date)}
                            value={dataFinalEntrega}
                            strictParsing={true}
                            selectsStart
                            locale={ptBR}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Data Final da Entrega"
                            className="dataEmissao"
                            // required={moment(dataFinalEntrega).isValid()}
                            required={
                              dataInicialEntrega &&
                              moment(dataInicialEntrega).isValid()
                            }
                          ></DatePickerFilter>
                          <label className="label">Data Final da Entrega</label>
                        </div>
                      </div>
                    </Content>
                  )}
                </ContainerCadastro>
                <Footer>
                  <button className="botao-voltar" onClick={backOnClick}>
                    voltar
                  </button>
                  <button type="submit" className="botao-salvar">
                    aplicar filtros
                  </button>
                  {size.width! / 16 < 50 && (
                    <button onClick={handleLimparFiltros}>limpar</button>
                  )}
                </Footer>
              </Form>
            )}
          </Formik>
        </Container>
      </ContainerGeral>
    </>
  );
};

export default FilterSideMenu;
