import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { MdWork } from 'react-icons/md';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { animeted } from '../../../utils/consts';
import api from '../../../services/api';
import { useDate } from '../../../hooks/DateContext';
import {
  formatarValorSem,
  getTokenDashboard,
  randomColors,
  tempoAnimacaoDashboard,
  userIsLogged,
} from '../../../utils/fn';
import { Container, ContainerConteudo } from './stylesBoxCobrancas';
import { FaSquare } from 'react-icons/fa';
import HeaderCards from '../components/headerCards/indexHeaderCards';
import { useHistory } from 'react-router-dom';
import { redInpera } from '../../../utils/colorsInpera';
import { useSelector } from 'react-redux';

interface ItooltipData {
  active: any;
  payload: any;
}

const BoxCobranca: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<any>({ activeIndex: 0 });
  const [totalCobranca, setTotalCobranca] = useState<number>(0);
  const [colorsGraphic, setColorsGraphic] = useState<string[]>([]);

  const empresaAdmin = useSelector((state: any) => state.global.empresaAdmin);

  const history = useHistory();

  const pegarData = useDate();
  const CustomTooltip = ({ active, payload }: ItooltipData): ReactElement => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <div className="label">
            <h3 style={{ fontWeight: 'bold' }}>{payload[0].name}</h3>
            <h3 style={{ fontWeight: 500 }}>
              {totalCobranca === 0
                ? `R$ 0,00 (0,00%)`
                : `R$: ${formatarValorSem(
                    payload[0].value,
                  )} (${formatarValorSem(
                    (payload[0].value / totalCobranca) * 100,
                  )}%)`}
            </h3>
          </div>
        </div>
      );
    }

    return <></>;
  };

  const [response, setResponse] = useState([
    { name: 'Não Há Dados', value: 0.0001 },
  ]);

  const handleActive = useCallback((data: any, index: any) => {
    setActiveIndex({ activeIndex: index });
  }, []);

  const isMounted = useRef<boolean | null>(null);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    }
  }, []);

  // const getData = useCallback(async (): Promise<void> => {
  //   const dataFinalMaior = pegarData.dataInicial <= pegarData.dataFinal;
  //   try {
  //     if (empresaAdmin && empresaAdmin.id !== '') {
  //       api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

  //       if (dataFinalMaior) {
  //         const data = await api.post('api/v1/dashboard/cobrancas', {
  //           dataInicial: pegarData.dataInicial,
  //           dataFinal: pegarData.dataFinal,
  //         });

  //         const resultado = await data.data.cobrancas;

  //         let _totalCobranca = 0;
  //         await resultado.forEach((element: any) => {
  //           _totalCobranca = _totalCobranca + Number(element.value);
  //         });

  //         setTotalCobranca(_totalCobranca);
  //         setResponse(resultado);
  //       }
  //     }
  //   } catch (error) {
  //     setResponse([{ name: 'Não Há Dados', value: 0.0001 }]);
  //     setTotalCobranca(0);
  //   }
  // }, [pegarData]);

  const getData = useCallback(async (): Promise<void> => {
    const dataFinalMaior = pegarData.dataInicial <= pegarData.dataFinal;
    try {
      if (empresaAdmin && empresaAdmin.id !== '') {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

        if (dataFinalMaior) {
          const data = await api.post('api/v1/dashboard/cobrancas', {
            dataInicial: pegarData.dataInicial,
            dataFinal: pegarData.dataFinal,
          });

          const resultado = await data.data.cobrancas;

          let _totalCobranca = 0;
          resultado.forEach((element: any) => {
            _totalCobranca = _totalCobranca + Number(element.value);
          });

          if (isMounted.current) {
            setTotalCobranca(_totalCobranca);
            setResponse(resultado);
          }
        }
      }
    } catch (error) {
      if (isMounted.current) {
        setResponse([{ name: 'Não Há Dados', value: 0.0001 }]);
        setTotalCobranca(0);
      }
    }
  }, [pegarData, empresaAdmin]);

  const haDados = (): boolean => {
    if (response[0].name === 'Não Há Dados' && response[0].value === 0.0001)
      return false;

    return true;
  };

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

  const dataFormatadaInicial = moment(pegarData.dataInicial).format(
    'DD/MM/YYYY',
  );
  const dataFormatadaFinal = moment(pegarData.dataFinal).format('DD/MM/YYYY');

  useEffect(() => {
    randomColors(setColorsGraphic);
  }, [response.length]);

  return (
    <Container className={`animate__animated ${animeted}`}>
      <HeaderCards
        icon={MdWork}
        titleHeaderPrimary={`Cobranças - `}
        titleHeaderSecundary={`R$ ${formatarValorSem(totalCobranca)}`}
        animation={animeted}
      />

      <ContainerConteudo>
        {haDados() === true ? (
          <div className="legenda">
            {response.map((entry, index) => {
              return (
                <div key={index} className="itemLegenda">
                  <FaSquare style={{ color: `${colorsGraphic[index]}` }} />
                  {totalCobranca === 0
                    ? `R$ 0,00 (0,00%)`
                    : `${entry.name} - R$: ${formatarValorSem(
                        entry.value,
                      )} (${formatarValorSem(
                        (entry.value / totalCobranca) * 100,
                      )}%)`}
                </div>
              );
            })}
          </div>
        ) : null}

        <div className="grafico">
          <ResponsiveContainer width="99%">
            <PieChart>
              <Pie
                activeIndex={activeIndex.activeIndex}
                data={response}
                animationDuration={tempoAnimacaoDashboard * 2000}
                innerRadius={70}
                outerRadius={120}
                dataKey="value"
                onMouseEnter={handleActive}
              >
                {response.map((entry, index) => {
                  return <Cell key="index" fill={colorsGraphic[index]} />;
                })}
              </Pie>

              <Tooltip content={CustomTooltip} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ContainerConteudo>
      {haDados() === false ? (
        <p style={{ color: redInpera }}>
          Não há Dados entre {dataFormatadaInicial} e {dataFormatadaFinal}
        </p>
      ) : null}
    </Container>
  );
};

export default BoxCobranca;
