import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import {
  setDataPaginacao,
  setLimparData,
  setLimparFiltro,
  setLimparPesquisa,
  setNavigationPages,
  setOrigem,
  setPaginaAtual,
} from '../../store/modules/Components/Paginacao/action';
import { PaginacaoProps } from './interfacePaginacao';
import { Container } from './stylesPaginacao';
import useWindowSize from '../../hooks/useWindowSize';

const Paginacao: React.FC<PaginacaoProps> = ({
  atualiza = false,
  ...props
}) => {
  const dispatch = useDispatch();
  const paginaAtual = useSelector((state: any) => state.session.paginacao.paginaAtual);
  const totalPagina = useSelector((state: any) => state.session.paginacao.totalPaginas);
  const valorPesquisado = useSelector(
    (state: any) => state.session.paginacao.valorPesquisado,
  );
  const origem = useSelector((state: RootStateOrAny) => state.session.paginacao.origem);
  const filtroSelecionado = useSelector(
    (state: any) => state.session.paginacao.filtroSelecionado,
  );

  const loading: Boolean = useSelector(
    (state: RootStateOrAny) => state.session.paginacao.isLoading,
  );

  useEffect(() => {
    if (atualiza) {
      //  dispatch(setLimparDados());
      dispatch(setLimparData());
      dispatch(setLimparPesquisa());
      dispatch(setOrigem(props.origem));
      dispatch(setLimparFiltro());
    } else {
      // dispatch(setLimparDados());
      dispatch(setLimparData());
      dispatch(setLimparPesquisa());
      const timeout = setTimeout(() => {
        dispatch(
          setDataPaginacao(
            props.url,
            paginaAtual - 1,
            props.origem,
            props.origem === origem ? valorPesquisado : props.valorPesquisado,
            props.order,
            props.typePagination,
          ),
        );
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [props.order, props.url, atualiza, dispatch]);

  useEffect(() => {
    if (origem !== filtroSelecionado?.filtro?.origem) {
      dispatch(setLimparFiltro());
    }
  }, [origem]);

  const size = useWindowSize();

  return (
    <Container style={{ display: loading ? 'none' : 'flex' }}>
      <Pagination
        page={paginaAtual}
        count={totalPagina || 1}
        variant="outlined"
        shape="rounded"
        boundaryCount={1}
        // siblingCount={size.width! / 16 <= 28.125 ? 0 : 1}
        siblingCount={size.width! / 16 <= 50 ? 0 : 1}
        defaultValue={5}
        // showFirstButton={size.width! / 16 <= 28.125 ? false : true}
        showFirstButton={size.width! / 16 <= 50 ? false : true}
        // showLastButton={size.width! / 16 <= 28.125 ? false : true}
        showLastButton={size.width! / 16 <= 50 ? false : true}
        disabled={totalPagina <= 1}
        onChange={(event: React.ChangeEvent<unknown>, value: number) => {
          if (props.clearCheckedItemList) {
            props.clearCheckedItemList();
          }
          dispatch(
            setDataPaginacao(
              props.url,
              value - 1,
              props.origem,
              valorPesquisado ? valorPesquisado : props.valorPesquisado,
              props.order || null,
              props.typePagination,
            ),
          );

          dispatch(setPaginaAtual(value));

          dispatch(setNavigationPages(props.origem, value));
        }}
      />
    </Container>
  );
};

export default Paginacao;
