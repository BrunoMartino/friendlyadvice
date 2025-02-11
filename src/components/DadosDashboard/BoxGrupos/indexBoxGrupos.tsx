import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { FaLayerGroup, FaSquare } from 'react-icons/fa';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import moment from 'moment';

import { animeted } from '../../../utils/consts';

import api from '../../../services/api';
import { useDate } from '../../../hooks/DateContext';
import {
  formatarValor,
  getTokenDashboard,
  randomColors,
  tempoAnimacaoDashboard,
  userIsLogged,
} from '../../../utils/fn';

import { Container, ContainerConteudo } from './stylesBoxGrupos';
import HeaderCards from '../components/headerCards/indexHeaderCards';
import { useHistory } from 'react-router-dom';
import { redInpera } from '../../../utils/colorsInpera';
import { useSelector } from 'react-redux';

type ItooltipData = {
  active: boolean | undefined;
  payload: any | undefined;
};

const BoxGrupos: React.FC = () => {
  const pegarData = useDate();
  const history = useHistory();
  const [totalGrupos, settotalGrupos] = useState<number>(0);
  const [colorsGraphic, setColorsGraphic] = useState<string[]>([]);

  const empresaAdmin = useSelector((state: any) => state.global.empresaAdmin);

  const [response, setResponse] = useState([
    { name: 'Não Há Dados', value: 0.0001 },
  ]);

  const isMounted = useRef(true);

  useEffect(() => {
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
  //         const data = await api.post('api/v1/dashboard/grupos', {
  //           dataInicial: pegarData.dataInicial,
  //           dataFinal: pegarData.dataFinal,
  //         });

  //         const resultado = await data.data.grupos;

  //         let _totalGrupos = 0;
  //         await resultado.forEach((element: any) => {
  //           _totalGrupos = _totalGrupos + Number(element.value);
  //         });

  //         settotalGrupos(_totalGrupos);

  //         setResponse(resultado);
  //       }
  //     }
  //   } catch (error) {
  //     setResponse([{ name: 'Não Há Dados', value: 0.0001 }]);
  //     settotalGrupos(0);
  //   }
  // }, [pegarData]);

  const getData = useCallback(async (): Promise<void> => {
    const dataFinalMaior = pegarData.dataInicial <= pegarData.dataFinal;
    try {
      if (empresaAdmin && empresaAdmin.id !== '') {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

        if (dataFinalMaior) {
          const data = await api.post('api/v1/dashboard/grupos', {
            dataInicial: pegarData.dataInicial,
            dataFinal: pegarData.dataFinal,
          });

          const resultado = await data.data.grupos;

          let _totalGrupos = 0;
          await resultado.forEach((element: any) => {
            _totalGrupos = _totalGrupos + Number(element.value);
          });

          if (isMounted.current) {
            settotalGrupos(_totalGrupos);
            setResponse(resultado);
          }
        }
      }
    } catch (error) {
      if (isMounted.current) {
        setResponse([{ name: 'Não Há Dados', value: 0.0001 }]);
        settotalGrupos(0);
      }
    }
  }, [pegarData, empresaAdmin]);

  const haDados = (): boolean => {
    if (response[0].name === 'Não Há Dados' && response[0].value === 0.0001) {
      return false;
    }

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
  /* istanbul ignore next */
  const CustomTooltip = ({ active, payload }: ItooltipData): ReactElement => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <div className="label">
            <h3 style={{ fontWeight: 'bold' }}>{payload[0].name}</h3>
            <h3 style={{ fontWeight: 500 }}>
              {totalGrupos === 0
                ? `R$ 0,00 (0,00%)`
                : `R$: ${formatarValor(payload[0].value)} (${formatarValor(
                    (payload[0].value / totalGrupos) * 100,
                  )}%)`}
            </h3>
          </div>
        </div>
      );
    }

    return <></>;
  };

  useEffect(() => {
    randomColors(setColorsGraphic);
  }, [response.length]);

  return (
    <Container className={`animate__animated ${animeted}`}>
      <HeaderCards
        icon={FaLayerGroup}
        titleHeaderPrimary={`Grupos - `}
        titleHeaderSecundary={`R$ ${formatarValor(totalGrupos)}`}
        animation={animeted}
      />

      <ContainerConteudo>
        {haDados() === true ? (
          <div className="legenda">
            {response.map((entry, index) => {
              return (
                <div key={index} className="itemLegenda">
                  <FaSquare style={{ color: `${colorsGraphic[index]}` }} />
                  {totalGrupos === 0
                    ? `R$ 0,00 (0,00%)`
                    : `${entry.name} - R$: ${formatarValor(
                        entry.value,
                      )} (${formatarValor(
                        (entry.value / totalGrupos) * 100,
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
                display=""
                data={response}
                dataKey="value"
                outerRadius={120}
                labelLine={false}
                animationDuration={tempoAnimacaoDashboard * 1000}
                stroke="none"
              >
                {response.map((entry, index) => (
                  <Cell key="index" fill={colorsGraphic[index]} />
                ))}
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

export default BoxGrupos;
