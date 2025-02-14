import React, { useState, useEffect, useCallback, useRef } from 'react';

import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { FaMoneyBill } from 'react-icons/fa';
import CountUp from 'react-countup';

import { useDate } from '../../../hooks/DateContext';
import {
  getTokenDashboard,
  tempoAnimacaoDashboard,
  userIsLogged,
} from '../../../utils/fn';
import { animeted } from '../../../utils/consts';

import {
  ContainerMain,
  Container,
  Box,
  NumberValue,
} from './stylesBoxFinanceiro';

import api from '../../../services/api';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { abrirMensagem } from '../../../store/modules/Components/SnackBar/action';
import { TipoMensagem } from '../../SnackBar/interface';
import {
  blueInperaDashboard,
  greenInpera,
  redInpera,
} from '../../../utils/colorsInpera';
import HeaderCards from '../components/headerCards/indexHeaderCards';
import { useHistory } from 'react-router-dom';

interface IdataProps {
  receber: number;
  saldo: number;
  pagar: number;
}

const BoxFinanceiro: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pegarData = useDate();

  const empresaAdmin = useSelector((state: any) => state.global.empresaAdmin);

  const [response, setResponse] = useState<IdataProps>({
    receber: 0,
    saldo: 0,
    pagar: 0,
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
  //       const { data } = await api.post('api/v1/dashboard/financeiro', {
  //         dataInicial: pegarData.dataInicial,
  //         dataFinal: pegarData.dataFinal,
  //       });

  //       const resultado = await data.resultado[0];

  //       const { pagar, receber, saldo } = resultado;

  //       return setResponse({
  //         receber: parseFloat(receber),
  //         saldo: parseFloat(saldo),
  //         pagar: parseFloat(pagar),
  //       });
  //     }
  //   } catch (error) {
  //     let msg = '';
  //     if (empresaAdmin && empresaAdmin.id !== '') {
  //       msg = '';
  //     } else if (axios.isAxiosError(error)) {
  //       if (error.response) msg = error.response.data.error;
  //       else if (error.request) msg = error.message;
  //       else msg = 'Erro ao acessar o servidor';
  //     } else
  //       msg =
  //         'Não foi possível carregar seus dados, atualize a página para tentar novamente.';
  //     dispatch(
  //       abrirMensagem({
  //         open: true,
  //         mensagem: msg,
  //         tipo: TipoMensagem.ERRO,
  //       }),
  //     );
  //   }
  // }, [pegarData]);

  const getData = useCallback(async (): Promise<void> => {
    try {
      if (empresaAdmin && empresaAdmin.id !== '') {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
        const { data } = await api.post('api/v1/dashboard/financeiro', {
          dataInicial: pegarData.dataInicial,
          dataFinal: pegarData.dataFinal,
        });

        const resultado = await data.resultado[0];

        const { pagar, receber, saldo } = resultado;

        if (isMounted.current) {
          setResponse({
            receber: parseFloat(receber),
            saldo: parseFloat(saldo),
            pagar: parseFloat(pagar),
          });
        }
      }
    } catch (error) {
      if (isMounted.current) {
        let msg = '';
        if (empresaAdmin && empresaAdmin.id !== '') {
          msg = '';
        } else if (axios.isAxiosError(error)) {
          if (error.response) msg = error.response.data.error;
          else if (error.request) msg = error.message;
          else msg = 'Erro ao acessar o servidor';
        } else {
          msg = 'Não foi possível carregar seus dados, atualize a página para tentar novamente.';
        }
        dispatch(
          abrirMensagem({
            open: true,
            mensagem: msg,
            tipo: TipoMensagem.ERRO,
          }),
        );
      }
    }
  }, [pegarData, empresaAdmin, dispatch]);

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
  }, [getData, finallyfc]);
  return (
    <ContainerMain>
      <HeaderCards
        icon={FaMoneyBill}
        titleHeaderPrimary="Financeiro"
        animation={animeted}
      />
      <Container className={`animate__animated `}>
        <Box
          colorBackground={blueInperaDashboard}
          className={`trap animate__animated ${animeted}`}
        >
          <header>
            <p>Entradas</p>
            <FiArrowUpCircle size={40} className="icon" />
          </header>
          <NumberValue>
            <CountUp
              className="Valor"
              end={response.receber}
              decimal=","
              decimals={2}
              separator="."
              duration={tempoAnimacaoDashboard}
              preserveValue
            />
          </NumberValue>
        </Box>

        <Box
          colorBackground={redInpera}
          className={`animate__animated ${animeted}`}
        >
          <header>
            <p>Saídas</p>
            <FiArrowDownCircle size={40} className="icon" />
          </header>
          <NumberValue>
            <CountUp
              className="Valor"
              end={response.pagar}
              decimal=","
              decimals={2}
              separator="."
              duration={tempoAnimacaoDashboard}
              preserveValue
            />
          </NumberValue>
        </Box>

        <Box
          colorBackground={greenInpera}
          className={`animate__animated ${animeted}`}
        >
          <header>
            <p>Saldo</p>
            <RiMoneyDollarCircleLine size={40} className="icon" />
          </header>
          <NumberValue>
            <CountUp
              className="Valor"
              end={response.saldo}
              decimal=","
              decimals={2}
              separator="."
              duration={tempoAnimacaoDashboard}
              preserveValue
            />
          </NumberValue>
        </Box>
      </Container>
    </ContainerMain>
  );
};

export default BoxFinanceiro;
