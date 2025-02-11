import { ETypePagination } from '../../../../../components/Paginacao/interfacePaginacao';
import { TipoMensagem } from '../../../../../components/SnackBar/interface';
import api from '../../../../../services/api';
import { TOTAL_ITENS_PAGINA } from '../../../../../utils/consts';
import { getTokenDashboard } from '../../../../../utils/fn';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import {
  DELETE_DATA,
  setDataPaginacao,
  setLoading,
} from '../../../Components/Paginacao/action';
import { abrirMensagem } from '../../../Components/SnackBar/action';
import tratarExcessao from '../../../../../utils/tratamentoExcecao';
import { origemConfFaciliteSmart } from '../Clientes/action';
export const urlConfigFaciliteSmart = 'api/v1/conffacilitesmart';

interface DadosCadastro {
  serieEquipamento: string;
  numeroPdv: number | null;
  cliente: {
    id: string;
    descricao: string;
  };
  representante: {
    id: string;
    descricao: string;
  };
  equipamentos: {
    id: string;
    descricao: string;
  };
  descricaoTipo1: {
    descricao: string;
    numero: number | null;
  };
  descricaoTipo2: {
    descricao: string;
    numero: number | null;
  };
  taxaServico: number | null;
  imprimirRelatorios: boolean;
  modeloImpressao: string;
  emitirNfce: boolean;
  ambienteComunicacao: string;
  tipoAndroid: string;
}

export const SET_DATAPAGINACAO = '[Paginação] SET_DATAPAGINACAO';
export const EDICAO_CONFIGS = '[CONFFACSMART]EDICAO';
export const LIMPA_CONF = '[CONFFACSMART]LIMPAR';
export const SET_CONFFACILITE = '[CONF_FACILITE_SMART] SET_CONFFACILITE';
export const LOADING_CONFIG_FACILITE_SMART =
  '[CONF_FACILITE_SMART] LOADING_CONF_FACILITE_SMART';
export const SET_PAGINA_ATUAL_CONFFACILITESMART =
  '[CONF_FACILITE_SMART]SET_PAGINA_ATUAL';
export const SET_DATA_CONFFACILITESMART = '[CONF_FACILITE_SMART]SET_DATA';
export const CARREGA_DADOS_CONFFACILITESMART =
  '[CONF_FACILITE_S]CARREGA_DADOS_CONF_FAC_SMART';
export const NEW_CONFFACSMART = '[CADASTRO_CONFFACSMART]GRAVAR_CONFFACSMART';
export const SHOW_CONF_SELECTED = '[CADASTRO_CLIENTE]CLIENT_SELECTED';
export const SET_REMOVE_CONF = '[CONFFACSMART]CONF_FAC_DELETE';
export const TOGGLE_IMPRIMIR_RELATORIOS = '[CONF_FACILITE_SMART]TOGGLE_IMPRIMIR_RELATORIOS';

export const setLoadingConfiguracoesConfFaciliteSmart =
  (loading: boolean) => (dispatch: any) => {
    dispatch({ type: LOADING_CONFIG_FACILITE_SMART, payload: loading });
  };

export const setPaginaAtualConfFaciliteSmart = (pagina: number) => ({
  type: SET_PAGINA_ATUAL_CONFFACILITESMART,
  payload: pagina,
});


export const alteraValorDoInputImprimirRelatorios =
  (id: string, sinc: boolean): any =>
    async (dispatch: any, getState: any) => {
      try {
        dispatch(setLoading(true));
        const response = await api.patch(
          `api/v1/conffacilitesmart/${id}`,
          { imprimirRelatorios: !sinc },
          {
            headers: {
              authorization: `Bearer ${getTokenDashboard()}`,
            },
          },
        );
        const paginaAtual = getState().session.paginacao.paginaAtual;

        if (response.status === 200) {
          dispatch(
            setDataPaginacao(
              'api/v1/conffacilitesmart',
              paginaAtual - 1,
              origemConfFaciliteSmart,
              undefined,
              undefined,
              ETypePagination.CADASTROS,
              false,
            ),
          );
        }
        dispatch(setLoading(false));
      } catch(err) {
        dispatch(
          abrirMensagem({
            open: true,
            tipo: TipoMensagem.ERRO,
            mensagem: trataExcecao(err),
          }),
        );
      }
    };

    export const alteraValorDoInputEmitirNfce =
  (id: string, sincro: boolean):any =>
    async (dispatch: any, getState: any) => {
      try {
        dispatch(setLoading(true));
        const response = await api.patch(
          `api/v1/conffacilitesmart/${id}`,
          { emitirNfce: !sincro },
          {
            headers: {
              authorization: `Bearer ${getTokenDashboard()}`,
            },
          },
        );

        const paginaAtual = getState().session.paginacao;
        if (response.status === 200) {
          await dispatch(
          setDataPaginacao(
              'api/v1/conffacilitesmart',
              paginaAtual,
              origemConfFaciliteSmart,
              undefined,
              undefined,
              ETypePagination.CADASTROS,
              false,
            ),
          );
        }
        dispatch(setLoading(false));
      } catch(err) {
        dispatch(
          abrirMensagem({
            open: true,
            tipo: TipoMensagem.ERRO,
            mensagem: trataExcecao(err),
          }),
        );
      }
    };

export const limpaConf = () => (dispatch: any) => {
  dispatch({ type: LIMPA_CONF });
}

export const carregaDadosConfigFaciliteSmart =
  (pagina: any) => (dispatch: any, getState: any) => {
    const dados = getState().session.paginacao.data;

    // const exibeDados = dados.slice(
    //   (pagina - 1) * TOTAL_ITENS_PAGINA,
    //   (pagina - 1) * TOTAL_ITENS_PAGINA + TOTAL_ITENS_PAGINA,
    // );

    dispatch(setPaginaAtualConfFaciliteSmart(pagina));
    dispatch({ type: SET_DATA_CONFFACILITESMART, payload: dados });
  };

// export const carregaDadosConfigFaciliteSmart =
//   (pagina?: number) => async (dispatch: any, getState: any) => {
//     try {
//       api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
//       const { data } = await api.get(`api/v1/conffacilitesmart`);
//       dispatch({
//         type: CARREGA_DADOS_CONFFACILITESMART,
//         payload: data.confFaciliteSmart.rows,
//       });

//       dispatch(setDataConfigFaciliteSmart(pagina ? pagina : 1));
//       // }
//     } catch (err) {
//       dispatch(
//         abrirMensagem({
//           open: true,
//           mensagem: trataExcecao(err),
//           tipo: TipoMensagem.ERRO,
//         }),
//       );
//     }
//   };

export const exibirConfFacilite =
  (paginaAtual: any) => async (dispatch: any, getState: any) => {
    // dispatch(setLoading(true));
    try {
      const paginaAtual = getState().session.paginacao.paginaAtual;
      // const valorPesquisado = getState().session.paginacao.valorPesquisado;
      dispatch(
        setDataPaginacao(
          '/api/v1/conffacilitesmart',
          paginaAtual - 1,
          'confFaciliteSmart',
          // valorPesquisado,
          // undefined,
          // ETypePagination.CADASTROS,
        ),
      );
    } catch (err) {
      dispatch(
        abrirMensagem({
          open: true,
          tipo: TipoMensagem.ERRO,
          mensagem: trataExcecao(err),
        }),
      );
    }
  };


export const confSelected = (obj: any) => (dispatch: any) => {
  dispatch({ type: SHOW_CONF_SELECTED, payload: obj });
};

export const saveNewConfFacSmart =
  (
    values: DadosCadastro,
    actions: any,
    setInitialValues: any,
    setAguarde: any,
    setState: any
  ): any =>
  async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      // console.log(values.numeroPdv!.toString().length)
      // console.log(values.numeroPdv)
      // console.log(values.numeroPdv!.toString().length > 100)

      const { data } = await api.post(`${urlConfigFaciliteSmart}`, {
        serieEquipamento: values.serieEquipamento,
        idCliente: values.cliente.id,
        idRepresentante: values.representante.id,
        equipamentos: values.equipamentos,
        descricao1Tipo: values.descricaoTipo1.descricao,
        numero1Tipo: values.descricaoTipo1.numero,
        descricao2Tipo: values.descricaoTipo2.descricao,
        numero2Tipo: values.descricaoTipo2.numero,
        numeroPdv: values.numeroPdv,
        taxaServico: values.taxaServico,
        imprimirRelatorios: values.imprimirRelatorios,
        modeloImpressao: values.modeloImpressao,
        emitirNfce: values.emitirNfce,
        ambienteComunicacao: values.ambienteComunicacao,
        tipoAndroid: values.tipoAndroid,
      });


      dispatch({ type: NEW_CONFFACSMART, payload: data.configFaciliteSmart });
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Configuração cadastrada com sucesso!',
          tipo: TipoMensagem.SUCESSO,
        }),
      );
      actions.resetForm({
        serieEquipamento: '',
        idCliente: '',
        idRepresentante: '',
        equipamentos: '',
        descricao1Tipo: '',
        numero1Tipo: null,
        descricao2Tipo: '',
        numero2Tipo: null,
        numeroPdv: null,
        taxaServico: null,
        imprimirRelatorios: false,
        modeloImpressao: '',
        emitirNfce: false,
        ambienteComunicacao: '',
        tipoAndroid: '',
      });
      return data.configFaciliteSmart
      setState(false)
    } catch (e) {
      actions.setSubmitting(false);
      // if (values.numeroPdv >)
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
      setState(false)

    }
  };

export const setConf =
  (id: string, history: any = null) =>
  async (dispatch: any) => {
    try {
      const { data } = await api.get(`/api/v1/conffacilitesmart/${id}`, {
        headers: {
          authorization: `Bearer ${getTokenDashboard()}`,
        },
      });

      const info = {
        id: data.id,
        serieEquipamento: data.serieEquipamento,
        idCliente: data.idCliente,
        idRepresentante: data.idRepresentante,
        equipamentos: data.equipamentos,
        descricao1Tipo: data.descricao1Tipo,
        numero1Tipo: data.numero2Tipo,
        descricao2Tipo: data.descricao2Tipo,
        numero2Tipo: data.numero2Tipo,
        numeroPdv: data.numeroPdv,
        taxaServico: data.taxaServico,
        imprimirRelatorios: data.imprimirRelatorios,
        modeloImpressao: data.modeloImpressao,
        emitirNfce: data.emitirNfce,
        ambienteComunicacao: data.ambienteComunicacao,
        tipoAndroid: data.tipoAndroid,
        Cliente: data.Cliente,
        Representante: data.Representante,
      };

      dispatch({ type: SET_CONFFACILITE, payload: info });
    } catch (e) {
      dispatch(
        abrirMensagem({
          open: true,
          tipo: TipoMensagem.ERRO,
          mensagem: tratarExcessao(e),
        }),
      );
    }
  };


  export const configSmartSelecionadaEdicao = (obj: any) => (dispatch: any) => {
    dispatch({ type: EDICAO_CONFIGS, payload: obj });
  }
