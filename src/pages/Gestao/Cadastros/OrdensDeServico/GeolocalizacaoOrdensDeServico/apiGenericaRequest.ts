interface ICreateSqlQuery {
  getInputSearch: Map<any, any> | string | null;
  showCount: boolean;
}

// const defaultSqlQuery = (count: boolean) => {
//   const selectCount = `SELECT COUNT(*) AS countitens`;
//   const selectDetails = `SELECT
//     os."ID_ORDEMSERVICO",os."OS_SERVICO",os."OS_NUMERO",os."OS_IDCLIENTE",os."OS_DATA",os."OS_DESCRICAO",os."OS_DEFEITO",os."OS_POSICAO",
//     os."OS_SERIE",os."OS_DATAENTREGA",os."OS_HORAENTREGA",os."OS_VALOR",os."OS_SITUACAO",os."OS_IDPEDIDO",os."OS_IDTECNICOREPRESENTANTE",os."OS_TIPO",
//     os."OS_IDEQUIPAMENTO",os."OS_PORDESCONTO",os."OS_VLRDESCONTO",os."OS_KMATUAL",os."OS_ACRESDESCMO",os."OS_CLIDEPENDENTE",os."OS_HORACONTATO",os."OS_DATAAGENDAMENTO",
//     os."OS_PERIODOAGENDAMENTO",os."createdAt",os."updatedAt",os."deletedAt",os."OS_ORIGEM", count(*) over() as "total",
//     case when convert_to_integer(os."OS_FABRICANTE") is not null then
// 		(select f."FOR_DESCRICAO" from principal."FORNECEDORES" f where f."FOR_NUMERO" = os."OS_FABRICANTE")
// 		else os."OS_FABRICANTE" end,
//     oss."OSS_DESCRICAO",
//     rep."REP_NOME",
//     cli."CLI_RAZAO",
//     cli."ID_CLIENTE",
//     equi."EQI_DESCRICAO",
//     cli."CLI_DOCUMENTO",
//     cli."CLI_TELEFONE",
//     equi."EQI_PLACA",
//     equi."EQI_CHASSI",
//     TO_CHAR(os."OS_DATA", 'DD/MM/YYYY HH24:MI') AS "FORMATTED_DATE"`;

//   const joins = `FROM principal."ORDEMSERVICO" os
//     LEFT JOIN principal."REPRESENTANTES" rep ON os."OS_IDTECNICOREPRESENTANTE" = rep."ID_REPRESENTANTE"
//     LEFT JOIN principal."CLIENTES" cli ON os."OS_IDCLIENTE" = cli."ID_CLIENTE"
//     LEFT JOIN principal."EQUIPAMENTOS" equi ON os."OS_IDEQUIPAMENTO" = equi."ID_EQUIPAMENTOS"
//     LEFT JOIN principal."ORDEMSERVICOSITUACAO" oss ON oss."ID_ORDEMSERVICO"::uuid = os."OS_SITUACAO"::uuid`;

//   return `${count ? selectCount : selectDetails} ${joins}`;
// };

// const defaultSqlQuery = (count: boolean) => {
//   const selectCount = `SELECT COUNT(*) AS countitens`;

//   const selectDetails = `SELECT
//     os."ID_ORDEM_SERVICO",
//     os."OS_SERVICO",
//     os."OS_NUMERO",
//     os."OS_DATA",
//     os."OS_DESCRICAO",
//     os."OS_DEFEITO",
//     os."OS_POSICAO",
//     os."OS_SERIE",
//     os."OS_DATA_ENTREGA",
//     os."OS_HORA_ENTREGA",
//     os."OS_VALOR",
//     os."OS_SITUACAO",
//     os."OS_IDPEDIDO",
//     os."OS_IDTECNICOREPRESENTANTE",
//     os."OS_TIPO",
//     os."OS_IDEQUIPAMENTO",
//     os."OS_POR_DESCONTO",
//     os."OS_VLR_DESCONTO",
//     os."OS_KM_ATUAL",
//     os."OS_ACRES_DESC_MO",
//     os."OS_FABRICANTE",
//     os."OS_HORACONTATO",
//     cid."CID_DESCRICAO",
//     est."EST_NOME",
//     est."EST_SIGLA",
//     e."END_LOGRADOURO",
//     e."END_BAIRRO",
//     e."END_NUMERO",
//     e."END_CEP"
//   `;

//   const joins = `FROM principal."ORDEMSERVICO" os
//     LEFT JOIN principal."REPRESENTANTES" rep ON os."OS_IDTECNICOREPRESENTANTE" = rep."ID_REPRESENTANTE"
//     LEFT JOIN principal."CLIENTES" cli ON os."OS_IDCLIENTE" = cli."ID_CLIENTE"
//     LEFT JOIN principal."CLIENTESENDERECOS" ce ON os."OS_IDCLIENTE" = ce."CE_IDCLIENTE"
//     LEFT JOIN principal."ENDERECOS" e ON ce."CE_IDENDERECO" = e."ID_ENDERECO" AND ce."ENDERECOPRINCIPAL" = true
//     LEFT JOIN principal."CIDADES" cid ON e."END_IDCIDADE" = cid."ID_CIDADE"
//     LEFT JOIN principal."ESTADOS" est ON cid."CID_IDESTADOUF" = est."ID_ESTADO"
//     LEFT JOIN principal."ORDEMSERVICOSITUACAO" oss ON oss."ID_ORDEMSERVICO"::uuid = os."OS_SITUACAO"::uuid`;

//   return `${count ? selectCount : selectDetails} ${joins}`;
// };

const defaultSqlQuery = () => {
  const selectDetails = `SELECT
    os."ID_ORDEM_SERVICO",
    os."OS_SERVICO",
    os."OS_NUMERO",
    os."OS_DATA",
    os."OS_DESCRICAO",
    os."OS_DEFEITO",
    os."OS_POSICAO",
    os."OS_SERIE",
    os."OS_DATA_ENTREGA",
    os."OS_HORA_ENTREGA",
    os."OS_VALOR",
    os."OS_SITUACAO",
    os."OS_IDPEDIDO",
    os."OS_IDTECNICOREPRESENTANTE",
    os."OS_TIPO",
    os."OS_IDEQUIPAMENTO",
    os."OS_POR_DESCONTO",
    os."OS_VLR_DESCONTO",
    os."OS_KM_ATUAL",
    os."OS_ACRES_DESC_MO",
    os."OS_FABRICANTE",
    os."OS_HORACONTATO",
    cid."CID_DESCRICAO",
    est."EST_NOME",
    est."EST_SIGLA",
    e."END_LOGRADOURO",
    e."END_BAIRRO",
    e."END_NUMERO",
    e."END_CEP"
  `;

  const joins = `FROM principal."ORDEMSERVICO" os
    LEFT JOIN principal."REPRESENTANTES" rep ON os."OS_IDTECNICOREPRESENTANTE" = rep."ID_REPRESENTANTE"
    LEFT JOIN principal."CLIENTES" cli ON os."OS_IDCLIENTE" = cli."ID_CLIENTE"
    LEFT JOIN principal."CLIENTESENDERECOS" ce ON os."OS_IDCLIENTE" = ce."CE_IDCLIENTE"
    LEFT JOIN principal."ENDERECOS" e ON ce."CE_IDENDERECO" = e."ID_ENDERECO" AND ce."ENDERECOPRINCIPAL" = true
    LEFT JOIN principal."CIDADES" cid ON e."END_IDCIDADE" = cid."ID_CIDADE"
    LEFT JOIN principal."ESTADOS" est ON cid."CID_IDESTADOUF" = est."ID_ESTADO"
    LEFT JOIN principal."ORDEMSERVICOSITUACAO" oss ON oss."ID_ORDEMSERVICO"::uuid = os."OS_SITUACAO"::uuid`;

  return `${selectDetails} ${joins}`;
};

/**
 * @param getInputSearch - Objeto com campo de pesquisa Map ou string para campos and() no sql.
 * @function createSqlQuery - Função que cria a query SQL para a listagem de ordens de serviço.
 * @returns retorna a query SQL.
 */
// export function createSqlQuery({
//   getInputSearch = null,
//   showCount = false,
// }: Partial<ICreateSqlQuery>): string {
//   let sqlQuery = `${defaultSqlQuery(showCount)}`;

//   let whereClause = `
//     where os."deletedAt" is null
//     and cli."deletedAt" is null
//     and equi."deletedAt" is null
//     and rep."deletedAt" is null
//   `;

//   if (getInputSearch && typeof getInputSearch === 'object') {
//     getInputSearch.forEach((value, key) => {
//       if (value) {
//         switch (key) {
//           case 'situacao':
//             whereClause += `
//               and os."OS_SITUACAO" = '${value}'
//             `;
//             break;
//           default:
//             break;
//         }
//       }
//     });
//   }

//   if (typeof getInputSearch === 'string' && getInputSearch) {
//     whereClause += ` and (os."OS_NUMERO"::integer = convert_to_integer('${getInputSearch}')
//     	or upper(cli."CLI_RAZAO") like '%' || upper('${getInputSearch}') || '%'
//     	or upper(cli."CLI_FANTASIA") like '%' || upper('${getInputSearch}') || '%')`;
//   }

//   const orderClause = showCount ? '' : `order by os."OS_SERVICO" asc`;

//   sqlQuery += whereClause + orderClause;

//   return sqlQuery;
// }

export function createSqlQuery({
  getInputSearch = null,
  showCount = false,
}: Partial<ICreateSqlQuery>): string {
  let sqlQuery = `${defaultSqlQuery(showCount)}`;

  let whereClause = `
    WHERE os."deletedAt" IS NULL
    AND cli."deletedAt" IS NULL
    AND rep."deletedAt" IS NULL
  `;

  if (getInputSearch && typeof getInputSearch === 'object') {
    getInputSearch.forEach((value, key) => {
      if (value) {
        switch (key) {
          case 'situacao':
            whereClause += ` AND os."OS_SITUACAO" = '${value}'`;
            break;
          case 'tecnico':
            whereClause += ` AND os."OS_IDTECNICOREPRESENTANTE" = '${value}'`;
            break;
          default:
            break;
        }
      }
    });
  }

  if (typeof getInputSearch === 'string' && getInputSearch) {
    whereClause += `
      AND (os."OS_NUMERO"::integer = convert_to_integer('${getInputSearch}')
      OR upper(cli."CLI_RAZAO") LIKE '%' || upper('${getInputSearch}') || '%'
      OR upper(cli."CLI_FANTASIA") LIKE '%' || upper('${getInputSearch}') || '%')
    `;
  }

  const orderClause = showCount ? '' : ` ORDER BY os."OS_SERVICO" ASC`;

  sqlQuery += whereClause + orderClause;

  return sqlQuery;
}

export const sqlGetAllStatus = `
  SELECT
  "ID_ORDEMSERVICO" as id,
  "OSS_DESCRICAO" as descricao
  FROM principal."ORDEMSERVICOSITUACAO" os
  WHERE os."deletedAt" IS NULL
  `;

export const sqlContadorPaginas = (
  getInputSearch: string | Map<any, any> = '',
) => {
  if (typeof getInputSearch === 'string' && getInputSearch.length === 0)
    return createSqlQuery({ showCount: true });
  else return createSqlQuery({ showCount: true, getInputSearch });
};
