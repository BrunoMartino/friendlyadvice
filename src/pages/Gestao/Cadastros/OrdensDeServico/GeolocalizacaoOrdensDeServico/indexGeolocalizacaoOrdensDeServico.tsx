import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  Container,
  ContainerContent,
  Content,
} from '../ListagemOrdensDeServico/listagemOrdensDeServicoStyle2';
import { IDataItem } from '../../../../../components/SliderComponentMod/index-slider-component-mod';
import { createSqlQuery, sqlGetAllStatus } from './apiGenericaRequest';
import PaginacaoFlutter, {
  TFilter,
} from '../../../../../components/PaginacaoFlutter/paginacaoFlutter';
import { ETypePagination } from '../../../../../components/Paginacao/interfacePaginacao';
import { useOrderServiceContext } from '../../../../../hooks/useServiceOrderContext';

// type resData = {
//   ID_ORDEMSERVICO: string;
//   OSS_DESCRICAO: string;
//   OS_NUMERO: string;
//   CLI_RAZAO: string;
//   ID_CLIENTE: string;
//   OS_IDCLIENTE: string;
//   FORMATTED_DATE: string;
//   OS_DEFEITO: string;
//   OS_DESCRICAO: string;
//   OS_POSICAO: string;
//   OS_DATAAGENDAMENTO: string;
//   OS_SERIE: string;
//   OS_TIPO: string;
//   OS_FABRICANTE: string;
//   CLI_TELEFONE: string;
//   EQI_DESCRICAO: string;
//   OS_VALOR: string;
//   REP_NOME: string;
//   OS_DATAENTREGA: string;
// };

type resData = {
  ID_ORDEMSERVICO: string;
  OS_SERVICO: string;
  OS_NUMERO: string;
  OS_DATA: string;
  OS_DESCRICAO: string;
  OS_DEFEITO: string;
  OS_POSICAO: string;
  OS_SERIE: string;
  OS_DATA_ENTREGA: string;
  OS_HORA_ENTREGA: string;
  OS_VALOR: string;
  OS_SITUACAO: string;
  OS_IDPEDIDO: string;
  OS_IDTECNICOREPRESENTANTE: string;
  OS_TIPO: string;
  OS_IDEQUIPAMENTO: string;
  OS_POR_DESCONTO: string;
  OS_VLR_DESCONTO: string;
  OS_KM_ATUAL: string;
  OS_ACRES_DESC_MO: string;
  OS_FABRICANTE: string;
  OS_HORACONTATO: string;
  CID_DESCRICAO: string;
  EST_NOME: string;
  EST_SIGLA: string;
  END_LOGRADOURO: string;
  END_BAIRRO: string;
  END_NUMERO: string;
  END_CEP: string;
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
      console.log(getTokenDashboard());
      setLoading(true);
      const responseSituacoes = await paginacaoRef.current?.handleFiltrar({
        sqlToExecute: sqlGetAllStatus,
        shouldLimit: true,
      });

      const responseOs = await paginacaoRef.current?.handleFiltrar({
        sqlToExecute: sqlQuery,
        shouldLimit: false,
      });

      ctx.setPagesTotal(responseOs[0]?.total || 1);

      setResponseOs({
        count: responseOs.length === 0 ? 1 : responseOs[0]?.total || 1,
        situacoes: responseSituacoes,
        os: responseOs.map((res: resData) => ({
          id: res.ID_ORDEMSERVICO,
          servico: res.OS_SERVICO,
          numero: res.OS_NUMERO,
          data: res.OS_DATA,
          descricao: res.OS_DESCRICAO,
          defeito: res.OS_DEFEITO,
          posicao: res.OS_POSICAO,
          serie: res.OS_SERIE,
          dataEntrega: res.OS_DATA_ENTREGA,
          horaEntrega: res.OS_HORA_ENTREGA,
          valorOrcado: res.OS_VALOR,
          situacao: res.OS_SITUACAO,
          pedidoId: res.OS_IDPEDIDO,
          tecnicoId: res.OS_IDTECNICOREPRESENTANTE,
          tipo: res.OS_TIPO,
          equipamentoId: res.OS_IDEQUIPAMENTO,
          descontoPorcentagem: res.OS_POR_DESCONTO,
          valorDesconto: res.OS_VLR_DESCONTO,
          kmAtual: res.OS_KM_ATUAL,
          acrescimo: res.OS_ACRES_DESC_MO,
          fabricante: res.OS_FABRICANTE,
          horaContato: res.OS_HORACONTATO,
          cidDescricao: res.CID_DESCRICAO,
          estadoNome: res.EST_NOME,
          estadoSigla: res.EST_SIGLA,
          logradouro: res.END_LOGRADOURO,
          bairro: res.END_BAIRRO,
          numeroEndereco: res.END_NUMERO,
          cep: res.END_CEP,
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
      <CabecalhoPadrao />
      <CabecalhoTelaFlutter
        typeCabecalho={ETypeCabecalho.LISTAGEM}
        handleClickPlus={() => history.push('/cadastros/ordem-servico/')}
        handleClickSearch={() => handleOnClickSearch()}
        handleClickClear={() => handleOnClickClear()}
        setSql={setSqlQuery}
        breadcrumbs={<></>}
        areaWithBtns={<></>}
        footerContent={<></>}
        isOSPage
      >
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
        <ul>
          <li>
            <h1 className="cliente-row" style={{ color: 'black' }}>
              {responseOs.os.map((os) => os.id)}
            </h1>
          </li>
        </ul>
        <PaginacaoFlutter
          limit={ETypePagination.CADASTROS}
          ref={paginacaoRef}
          afterChangePage={() => getInfos()}
          totalPages={responseOs.count}
        />
      </CabecalhoTelaFlutter>
    </Container>
  );
};

export default ListagemOrdensDeServico;
