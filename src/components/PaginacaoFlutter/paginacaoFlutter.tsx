import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Section } from './styled';
import { ETypePagination } from '../Paginacao/interfacePaginacao';
import {
  TOTAL_ITENS_PAGINA,
  TOTAL_ITENS_PAGINA_GERENCIAMENTO,
} from '../../utils/consts';
import { apiGenerica } from '../../services/api';
import { useDispatch } from 'react-redux';
import { abrirMensagem } from '../../store/modules/Components/SnackBar/action';
import { TipoMensagem } from '../SnackBar/interface';
import { useOrderServiceContext } from '../../hooks/useServiceOrderContext';

export type TFilter = {
  sqlToExecute: string;
  shouldLimit: boolean;
};

interface IHandleFiltrar {
  sqlToExecute: string;
  shouldLimit: boolean;
}

interface IPaginacaoFlutter {
  limit: ETypePagination;
  afterChangePage: (actualPage?: number, prevPage?: number) => void;
  startPage?: number;
  totalPages: number;
}

/**
 * @param limit - Tipo de paginação.
 * @param afterChangePage - Função de retorno chamada quando a página é alterada.
 * @param totalPages - Total de páginas.
 * @function resetPagination - Função que reseta a paginação.
 * @function handleFiltrar - Função que filtra os dados. PARA RETORNO DE COUNT, A QUERY DEVE RETORNAR UM CAMPO COM O NOME 'countitens'.
 */

const PaginacaoFlutter = forwardRef(
  (
    {
      limit,
      afterChangePage,
    }: // totalPages = 0,
    IPaginacaoFlutter,
    ref,
  ) => {
    // const [actualPage, setActualPage] = useState(startPage);
    const [totalPagesState, setTotalPagesState] = useState(0);

    const dispatch = useDispatch();
    const ctx = useOrderServiceContext();

    const limitToShow =
      limit === ETypePagination.CADASTROS
        ? TOTAL_ITENS_PAGINA
        : TOTAL_ITENS_PAGINA_GERENCIAMENTO;

    const handleFiltrar = async ({
      shouldLimit,
      sqlToExecute,
    }: IHandleFiltrar) => {
      try {
        let finalSql = sqlToExecute;

        if (shouldLimit) {
          finalSql = `${sqlToExecute} limit ${limitToShow} offset ${
            ctx.page * limitToShow
          }`;
        }

        const { data: response } = await apiGenerica.post(
          `/api/sql?hash=${process.env.REACT_APP_HASH_API_GENERICA}`,
          { type: 'select', sql: finalSql },
        );

        if (
          !shouldLimit &&
          response.data &&
          response.data[0]?.countitens !== undefined
        ) {
          setTotalPagesState(ctx.pagesTotal);
        }

        return response.data;
      } catch (err) {
        if (err instanceof Error) {
          dispatch(
            abrirMensagem({
              open: true,
              mensagem: err.message,
              tipo: TipoMensagem.ERRO,
            }),
          );
          throw new Error(err.message);
        }
      }
    };

    const handleClickNext = () => {
      if (ctx.page < ctx.pagesTotal - 1) {
        ctx.setPage(ctx.page + 1);
        afterChangePage(ctx.page, ctx.page - 1);
        ctx.createNewPage();
        // setActualPage((prevPage) => {
        //   return prevPage + 1;
        // });
        // afterChangePage(actualPage, actualPage + 1);
      }
    };

    const handleClickPrevious = () => {
      if (ctx.page > 0) {
        ctx.setPage(ctx.page - 1);
        afterChangePage(ctx.page, ctx.page - 1);
        // setActualPage((prevPage) => {
        //   ctx.setPage(prevPage - 1)
        //   return prevPage - 1
        // });
        // afterChangePage(actualPage, actualPage - 1);
      }
    };

    useImperativeHandle(ref, () => ({
      resetPagination: () => {
        // setActualPage(0);
        ctx.setPage(0);
      },
      infoActualPage: () => {
        return ctx.page;
      },
      handleFiltrar,
    }));

    return (
      <Section>
        <button onClick={handleClickPrevious} disabled={ctx.page === 0}>
          <IoIosArrowBack />
        </button>
        <span>
          Página {ctx.page + 1} de {Math.max(1, Math.ceil(ctx.pagesTotal / limitToShow))}
        </span>
        <button
          onClick={handleClickNext}
          disabled={ctx.page >= Math.ceil(ctx.pagesTotal) - 1}
        >
          <IoIosArrowForward />
        </button>
      </Section>
    );
  },
);

export default PaginacaoFlutter;
