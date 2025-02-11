import { DateTime } from 'luxon';
import { getTokenDashboard } from '../../../../../utils/fn';

export interface IServicesObject {
  state: Partial<{
    idOrdemServico: string;
    idOrdemServicoItem: string;
  }>;
}

type TServices = IServicesObject & { api: any };

export const services = async ({
  state,
  api,
}: TServices): Promise<{
  getAllOrdemServico: Promise<{ data: Record<string, unknown>[] }>;
  setAllServicoItens: Promise<{ data: Record<string, unknown>[] }>;
  setAllAtendimento: Promise<{ data: Record<string, unknown>[] }>;
}> => {
  const sqlOrdemServico = `
    SELECT os."ID_ORDEMSERVICO",os."OS_SERVICO",os."OS_NUMERO",os."OS_IDCLIENTE",os."OS_DATA",os."OS_DESCRICAO",os."OS_DEFEITO",os."OS_POSICAO",
    os."OS_SERIE",os."OS_DATAENTREGA",os."OS_HORAENTREGA",os."OS_VALOR",os."OS_SITUACAO",os."OS_IDPEDIDO",os."OS_IDTECNICOREPRESENTANTE",os."OS_TIPO",
    os."OS_IDEQUIPAMENTO",os."OS_PORDESCONTO",os."OS_VLRDESCONTO",os."OS_KMATUAL",os."OS_ACRESDESCMO",os."OS_CLIDEPENDENTE",os."OS_HORACONTATO",os."OS_DATAAGENDAMENTO",
    os."OS_PERIODOAGENDAMENTO",os."createdAt",os."updatedAt",os."deletedAt",os."OS_ORIGEM", count(*) over() as "total",
    case when convert_to_integer(os."OS_FABRICANTE") is not null then
		(select f."FOR_DESCRICAO" from principal."FORNECEDORES" f where f."FOR_NUMERO" = os."OS_FABRICANTE")
		else os."OS_FABRICANTE" end,
    oss."OSS_DESCRICAO",
    rep."REP_NOME",
    cli."CLI_RAZAO",
    cli."ID_CLIENTE",
    equi."EQI_DESCRICAO",
    cli."CLI_DOCUMENTO",
    cli."CLI_TELEFONE",
    equi."EQI_PLACA",
    equi."EQI_CHASSI",
    TO_CHAR(os."OS_DATA", 'DD/MM/YYYY HH24:MI') AS "FORMATTED_DATE"
    FROM principal."ORDEMSERVICO" os LEFT JOIN principal."REPRESENTANTES" rep
    ON os."OS_IDTECNICOREPRESENTANTE" = rep."ID_REPRESENTANTE" LEFT JOIN principal."CLIENTES" cli
    ON os."OS_IDCLIENTE" = cli."ID_CLIENTE" LEFT JOIN principal."EQUIPAMENTOS" equi
    ON os."OS_IDEQUIPAMENTO" = equi."ID_EQUIPAMENTOS" LEFT JOIN principal."ORDEMSERVICOSITUACAO" oss
    ON oss."ID_ORDEMSERVICO"::uuid = os."OS_SITUACAO"::uuid
    WHERE os."deletedAt" IS NULL
    AND cli."deletedAt" IS NULL
    AND oss."deletedAt" IS NULL
    AND equi."deletedAt" IS NULL
    AND rep."deletedAt" IS NULL
    AND os."ID_ORDEMSERVICO" = '${state.idOrdemServico}'
    ORDER BY os."OS_SERVICO" ASC`;

  const sqlOrdemServicoItens = `
    select
      p."PRO_CODIGO",
      COALESCE(p."PRO_DESCRICAO", '') as "PRO_DESCRICAO",
      COALESCE(o."OSI_DESCRICAOSERVICO", '') as "descricaoDoServicoCompleta",
      o."ID_ORDEMSERVICOITENS" as "idOrdemServicoItem",
      o."OSI_IDORDEMSERVICO" as "idOrdemServico"
    from principal."ORDEMSERVICOITENS" o
    left join principal."PRODUTOS" p
      on p."ID_PRODUTO" = o."OSI_IDPRODUTO"
    where o."OSI_IDORDEMSERVICO" = '${state.idOrdemServico}'
      and o."deletedAt" is null
      and p."PRO_TIPO" = 'S'

    `;

  const sqlAtendimento = `
      select
      p."PRO_CODIGO" as "codigo_servico"
      ,o."OSA_DATAHORAINICIAL" as "hora_inicial"
      ,o."OSA_DATAHORAFINAL" as "hora_final"
      , o."OSA_SERVICOEXECUTADO" as "descricao"
      , o."OSA_ASSINATURA" as "assinatura"
      , "ID_ORDEMSERVICOATENDIMENTOS" as "idOrdemServicoAtendimento"
      , "OSA_ORDEMSERVICOITENS" as "idOrdemServicoItem"
      from principal."ORDEMSERVICOATENDIMENTOS" o
      left join principal."ORDEMSERVICOITENS" o2 on (o2."ID_ORDEMSERVICOITENS" =  o."OSA_ORDEMSERVICOITENS")
      left join principal."PRODUTOS" p on (p."ID_PRODUTO" = o2."OSI_IDPRODUTO")
      where
      o."OSA_ORDEMSERVICO" = '${state.idOrdemServico}'
      ${
        state.idOrdemServicoItem
          ? `and o."OSA_ORDEMSERVICOITENS" = '${state.idOrdemServicoItem}'`
          : ''
      }
      and o."deletedAt" is null
      order by o."createdAt"
    `;

  api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
  const results = await Promise.allSettled([
    api.post(
      '/api/sql?hash=593CF27CF04D3B0EEAB7C9C257B1DC316838BCDA5660C0D6C764A8C6A46B8D93',
      {
        type: 'select',
        sql: sqlOrdemServico,
      },
    ),
    api.post(
      '/api/sql?hash=593CF27CF04D3B0EEAB7C9C257B1DC316838BCDA5660C0D6C764A8C6A46B8D93',
      {
        type: 'select',
        sql: sqlOrdemServicoItens,
      },
    ),
    api.post(
      '/api/sql?hash=593CF27CF04D3B0EEAB7C9C257B1DC316838BCDA5660C0D6C764A8C6A46B8D93',
      {
        type: 'select',
        sql: sqlAtendimento,
      },
    ),
  ]);

  const getAllOrdemServico =
    results[0].status === 'fulfilled'
      ? results[0].value
      : Promise.reject(results[0].reason);
  const setAllServicoItens =
    results[1].status === 'fulfilled'
      ? results[1].value
      : Promise.reject(results[1].reason);
  let setAllAtendimento =
    results[2].status === 'fulfilled'
      ? results[2].value
      : Promise.reject(results[2].reason);

  setAllAtendimento = {
    ...setAllAtendimento,
    data: {
      data: setAllAtendimento.data.data.map((item: any) => ({
        ...item,
        hora_inicial: DateTime.fromISO(item.hora_inicial).toISO(),
        hora_final: DateTime.fromISO(item.hora_final).toISO(),
      })),
    },
  };

  return {
    getAllOrdemServico,
    setAllServicoItens,
    setAllAtendimento,
  };
};
