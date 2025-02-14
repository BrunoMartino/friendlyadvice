// import { useEffect, useState } from "react"
// import { apiGenerica } from "../../../../../services/api"
// import { getTokenDashboard } from "../../../../../utils/fn"

// type csosn = { PRO_CODIGO: string; PRO_DESCRICAO: string }
// type dataOsSelecionada = { lastValue: string }

// export const dataOsSelecionada = ({ lastValue }: dataOsSelecionada) => {
//     const [serviceCsosn, setServiceCsosn] = useState<any>()

//     console.log(lastValue, ' lastValue')

//     useEffect(() => {
//         const getCsosn = async () => {
//             try {
//                 apiGenerica.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`

//                 const response = await apiGenerica.post(
//                     '/api/sql?hash=593CF27CF04D3B0EEAB7C9C257B1DC316838BCDA5660C0D6C764A8C6A46B8D93',
//                     {
//                         type: 'select',
//                         sql: `select p."PRO_CODIGO", p."PRO_DESCRICAO" from principal."ORDEMSERVICOITENS" o left join principal."PRODUTOS" p on (p."ID_PRODUTO" = o."OSI_IDPRODUTO") where "OSI_IDORDEMSERVICO" = '${lastValue}' and o."deletedAt" is null and p."PRO_TIPO" ='S'`,
//                     },
//                 )
//                 const data = response.data

//                 setServiceCsosn(data.data.map((item: csosn) => ({ codigo: item.PRO_CODIGO, descricaoServico: item.PRO_DESCRICAO })))
//             } catch (err) {
//                 console.error('Erro ao buscar CSOSN:', err)
//             }
//         }

//         getCsosn()
//     }, [lastValue])

//     return serviceCsosn
// }
