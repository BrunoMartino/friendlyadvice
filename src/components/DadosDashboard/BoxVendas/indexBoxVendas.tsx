import React, { useEffect, useCallback, useState, useRef } from 'react';
import { FaUserTag } from 'react-icons/fa';
import moment from 'moment';
import api from '../../../services/api';
import { animeted } from '../../../utils/consts';
import { Container, ContainerBox } from './stylesBoxVendas';
import { useDate } from '../../../hooks/DateContext';
import {
  getTokenDashboard,
  tempoAnimacaoDashboard,
  userIsLogged,
} from '../../../utils/fn';
import { myCustomLocale } from '../../../utils/fn';
import { abrirMensagem } from '../../../store/modules/Components/SnackBar/action';
import trataExcecao from '../../../utils/tratamentoExcecao';
import { TipoMensagem } from '../../SnackBar/interface';
import { useDispatch, useSelector } from 'react-redux';
import HeaderCards from '../components/headerCards/indexHeaderCards';
import BoxValuesSales from './components/ContainerBoxValues/indexBoxValuesSales';
import { useHistory } from 'react-router-dom';

interface IdataProps {
  dataHoje: {
    valorVendido: number;
    vendasRealizadas: number;
    ticketMedio: number;
  };
  dataMensal: {
    valorVendido: number;
    vendasRealizadas: number;
    ticketMedio: number;
  };
  dataAnual: {
    valorVendido: number;
    vendasRealizadas: number;
    ticketMedio: number;
  };
}

const BoxVendas: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pegarData = useDate();

  const empresaAdmin = useSelector((state: any) => state.global.empresaAdmin);

  const [response, setResponse] = useState<IdataProps>({
    dataHoje: {
      valorVendido: 0,
      vendasRealizadas: 0,
      ticketMedio: 0,
    },
    dataMensal: {
      valorVendido: 0,
      vendasRealizadas: 0,
      ticketMedio: 0,
    },
    dataAnual: {
      valorVendido: 0,
      vendasRealizadas: 0,
      ticketMedio: 0,
    },
  });

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // const getData = useCallback(async (): Promise<void> => {
  //   try {
  //     if (empresaAdmin && empresaAdmin.id !== '') {
  //       api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
  //       const { data } = await api.post('api/v1/dashboard/clientes', {
  //         data: pegarData.dataInicial,
  //       });

  //       const resultado = await data.clientes;
  //       const { hoje } = resultado[0];
  //       const { mensal } = resultado[1];
  //       const { anual } = resultado[2];

  //       setResponse({
  //         dataHoje: hoje,
  //         dataMensal: mensal,
  //         dataAnual: anual,
  //       });
  //     }
  //   } catch (error) {
  //     if (empresaAdmin && empresaAdmin.id !== '') {
  //       return;
  //     } else {
  //       setResponse({
  //         dataHoje: {
  //           valorVendido: 0,
  //           vendasRealizadas: 0,
  //           ticketMedio: 0,
  //         },
  //         dataMensal: {
  //           valorVendido: 0,
  //           vendasRealizadas: 0,
  //           ticketMedio: 0,
  //         },
  //         dataAnual: {
  //           valorVendido: 0,
  //           vendasRealizadas: 0,
  //           ticketMedio: 0,
  //         },
  //       });
  //       dispatch(
  //         abrirMensagem({
  //           open: true,
  //           mensagem: trataExcecao(error),
  //           tipo: TipoMensagem.ERRO,
  //         }),
  //       );
  //     }
  //   }
  // }, [pegarData.dataInicial]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      if (empresaAdmin && empresaAdmin.id !== '') {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
        const { data } = await api.post('api/v1/dashboard/clientes', {
          data: pegarData.dataInicial,
        });

        const resultado = await data.clientes;
        const { hoje } = resultado[0];
        const { mensal } = resultado[1];
        const { anual } = resultado[2];

        if (isMounted.current) {
          setResponse({
            dataHoje: hoje,
            dataMensal: mensal,
            dataAnual: anual,
          });
        }
      }
    } catch (error) {
      if (isMounted.current) {
        if (empresaAdmin && empresaAdmin.id !== '') {
          return;
        } else {
          setResponse({
            dataHoje: {
              valorVendido: 0,
              vendasRealizadas: 0,
              ticketMedio: 0,
            },
            dataMensal: {
              valorVendido: 0,
              vendasRealizadas: 0,
              ticketMedio: 0,
            },
            dataAnual: {
              valorVendido: 0,
              vendasRealizadas: 0,
              ticketMedio: 0,
            },
          });
          dispatch(
            abrirMensagem({
              open: true,
              mensagem: trataExcecao(error),
              tipo: TipoMensagem.ERRO,
            }),
          );
        }
      }
    }
  }, [pegarData.dataInicial, empresaAdmin, dispatch]);

  const [finallyfc, setFinally] = useState<boolean>(false);

  const validaToken = (): Boolean => {
    if (userIsLogged('@INPERA:token_adm') || userIsLogged('@INPERA:token')) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setFinally(true);
  }, [pegarData]);

  useEffect(() => {
    if (validaToken()) {
      if (finallyfc) {
        getData();
        setFinally(false);
      }
    } else {
      setFinally(false);
      history.replace('/');
    }
  }, [getData, finallyfc, validaToken]);

  moment.updateLocale('pt-br', {
    /* istanbul ignore next */
    months: myCustomLocale.months,
    weekdays: [
      'Domingo',
      'Segunda-Feira',
      'Terça-Feira',
      'Quarta-Feira',
      'Quinta-Feira',
      'Sexta-Feira',
      'Sábado',
    ],
  });

  const dataDia = moment(pegarData.dataInicial).format('DD');
  const dataHoje = moment(pegarData.dataInicial).format('dddd');
  const dataMensal = moment(pegarData.dataInicial).format('MMMM');
  const dataAnual = moment(pegarData.dataInicial).format('yyyy');

  return (
    <Container>
      <HeaderCards
        icon={FaUserTag}
        titleHeaderPrimary="Vendas"
        animation={animeted}
      />

      <ContainerBox>
        <BoxValuesSales
          animated={animeted}
          timeAnimations={tempoAnimacaoDashboard}
          titleBox={`Diárias - ${dataDia} (${dataHoje})`}
          values={response.dataHoje}
        />
        <BoxValuesSales
          animated={animeted}
          timeAnimations={tempoAnimacaoDashboard}
          titleBox={`Mês - ${dataMensal}`}
          values={response.dataMensal}
        />
        <BoxValuesSales
          animated={animeted}
          timeAnimations={tempoAnimacaoDashboard}
          titleBox={`Ano - ${dataAnual}`}
          values={response.dataAnual}
        />
      </ContainerBox>
    </Container>
  );
};

export default BoxVendas;
