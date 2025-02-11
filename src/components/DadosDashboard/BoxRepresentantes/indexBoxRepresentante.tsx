import React, { useEffect, useCallback, useState, useRef } from 'react';
import { FaUserTie } from 'react-icons/fa';
import CountUp from 'react-countup';
import api from '../../../services/api';
import { animeted } from '../../../utils/consts';

import { Container, BoxValue, ContainerBox } from './stylesBoxRepresentante';
import { useDate } from '../../../hooks/DateContext';
import {
  getTokenDashboard,
  tempoAnimacaoDashboard,
  userIsLogged,
} from '../../../utils/fn';
import { abrirMensagem } from '../../../store/modules/Components/SnackBar/action';
import trataExcecao from '../../../utils/tratamentoExcecao';
import { TipoMensagem } from '../../SnackBar/interface';
import { useDispatch, useSelector } from 'react-redux';
import HeaderCards from '../components/headerCards/indexHeaderCards';
import { useHistory } from 'react-router-dom';

interface IdataProps {
  faturamentoTotal: number;
  qtdeRepresentantes: number;
  mediaPorRepresenante: number;
}

const BoxRepresentantes: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pegarData = useDate();

  const [response, setResponse] = useState<IdataProps>({
    faturamentoTotal: 0,
    qtdeRepresentantes: 0,
    mediaPorRepresenante: 0,
  });

  const empresaAdmin = useSelector((state: any) => state.global.empresaAdmin);

  // const getData = useCallback(async (): Promise<void> => {
  //   const dataFinalMaior = pegarData.dataInicial <= pegarData.dataFinal;

  //   try {
  //     if (empresaAdmin && empresaAdmin.id !== '') {
  //       api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
  //       if (dataFinalMaior) {
  //         const data = await api.post('api/v1/dashboard/representantes', {
  //           dataInicial: pegarData.dataInicial,
  //           dataFinal: pegarData.dataFinal,
  //         });

  //         const resultado = await data.data.representantes;

  //         const { faturamentoTotal, qtdeRepresentantes, mediaPorRepresenante } =
  //           resultado;

  //         setResponse({
  //           faturamentoTotal,
  //           qtdeRepresentantes,
  //           mediaPorRepresenante,
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     if (empresaAdmin && empresaAdmin.id !== '') {
  //       setResponse({
  //         faturamentoTotal: 0,
  //         qtdeRepresentantes: 0,
  //         mediaPorRepresenante: 0,
  //       });
  //     } else {
  //       dispatch(
  //         abrirMensagem({
  //           open: true,
  //           mensagem: trataExcecao(error),
  //           tipo: TipoMensagem.ERRO,
  //         }),
  //       );

  //       setResponse({
  //         faturamentoTotal: 0,
  //         qtdeRepresentantes: 0,
  //         mediaPorRepresenante: 0,
  //       });
  //     }
  //   }
  // }, [pegarData]);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const getData = useCallback(async (): Promise<void> => {
    const dataFinalMaior = pegarData.dataInicial <= pegarData.dataFinal;

    try {
      if (empresaAdmin && empresaAdmin.id !== '') {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
        if (dataFinalMaior) {
          const data = await api.post('api/v1/dashboard/representantes', {
            dataInicial: pegarData.dataInicial,
            dataFinal: pegarData.dataFinal,
          });

          const resultado = await data.data.representantes;

          const { faturamentoTotal, qtdeRepresentantes, mediaPorRepresenante } = resultado;

          if (isMounted.current) {
            setResponse({
              faturamentoTotal,
              qtdeRepresentantes,
              mediaPorRepresenante,
            });
          }
        }
      }
    } catch(e) {
      if (isMounted.current) {
        if (empresaAdmin && empresaAdmin.id !== '') {
          setResponse({
            faturamentoTotal: 0,
            qtdeRepresentantes: 0,
            mediaPorRepresenante: 0,
          });
        } else {
          dispatch(
            abrirMensagem({
              open: true,
              mensagem: trataExcecao(e),
              tipo: TipoMensagem.ERRO,
            }),
          );

          setResponse({
            faturamentoTotal: 0,
            qtdeRepresentantes: 0,
            mediaPorRepresenante: 0,
          });
        }
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
    <Container className={`animate__animated ${animeted}`}>
      <HeaderCards
        icon={FaUserTie}
        titleHeaderPrimary="Representantes"
        animation={animeted}
      />

      <ContainerBox>
        <BoxValue>
          <h2 className="Hoje">Faturamento Total</h2>
          <hr />
          <div>
            <h1>
              <CountUp
                end={response.faturamentoTotal}
                decimal=","
                decimals={2}
                separator="."
                duration={tempoAnimacaoDashboard}
                preserveValue
              />
            </h1>
          </div>
        </BoxValue>

        <BoxValue>
          <h2>Vendedores</h2>
          <hr />

          <div>
            <h1>
              <CountUp
                end={response.qtdeRepresentantes}
                duration={tempoAnimacaoDashboard}
                preserveValue
              />
            </h1>
          </div>
        </BoxValue>

        <BoxValue>
          <h2>Média Representante</h2>
          <hr />

          <div>
            <h1>
              <CountUp
                end={response.mediaPorRepresenante}
                decimal=","
                decimals={2}
                separator="."
                duration={tempoAnimacaoDashboard}
                preserveValue
              />
            </h1>
          </div>
        </BoxValue>
      </ContainerBox>
    </Container>
  );
};

export default BoxRepresentantes;
