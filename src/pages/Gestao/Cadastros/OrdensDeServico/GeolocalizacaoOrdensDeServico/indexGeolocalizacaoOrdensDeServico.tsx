import React, { lazy, Suspense } from 'react';
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
} from '../ListagemOrdensDeServico/listagemOrdensDeServicoStyle2';
import SnackbarDefault from '../../../../../components/SnackbarDefault';
import { apiGenerica } from '../../../../../services/api';
import { createSqlQuery, sqlGetAllStatus } from './apiGenericaRequest';
import { ETypePagination } from '../../../../../components/Paginacao/interfacePaginacao';
import { ExpandedDiv } from '../Atendimento/styledAtendimento';
import { useOrderServiceContext } from '../../../../../hooks/useServiceOrderContext';
import { DateTime } from 'luxon';
import { useHistory } from 'react-router-dom';

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

const GeolocalizacaoOrdensDeServico = () => {
  const history = useHistory();

  return (
    <Container>
      <SnackbarDefault />
      <CabecalhoPadrao />

      <h1 style={{ color: 'black' }}>Carregou</h1>
    </Container>
  );
};

export default GeolocalizacaoOrdensDeServico;
