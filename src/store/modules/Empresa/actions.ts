import { TipoMensagem } from '../../../components/SnackBar/interface';
import api from '../../../services/api';
import { getTokenDashboard } from '../../../utils/fn';
import trataExcecao from '../../../utils/tratamentoExcecao';
import { setLoadingDashboard } from '../Gestao/Dashboard/action';
import { abrirMensagem } from '../Components/SnackBar/action';
import axios from 'axios';
import { setLoadingEmpresa } from '../Gestao/Cadastros/Empresas/action';

export const CARREGAR_DADOS_EMPRESA = '[EMPRESA_GERAL]CARREGAR_DADOS_EMPRESA';
export const TROCAR_EMPRESA_STATUS = '[EMPRESA_GERAL]TROCAR_EMPRESA_STATUS';
export const CHANGE_MODO_CARDAPIO = '[EMPRESA_GERAL]CHANGE_MODO_CARDAPIO';
export const SET_LOADING_TELA_INICIAL =
  '[EMPRESA_GERAL]SET_LOADING_TELA_INICIAL';
export const SET_TEMPO_ENTREGA = '[EMPRESA_GERAL]SET_TEMPO_ENTREGA';
export const RESET_EMPRESA = '[EMPRESA_GERAL]RESET_EMPRESA';
export const UPDATE_DADOS_EMPRESA = '[EMPRESA_GERAL]UPDATE_DADOS_EMPRESA';
export const CARREGAR_DADOS_EMPRESA_ALL =
  '[EMPRESA_GERAL]CARREGAR_DADOS_EMPRESA_ALL';
export const LOADING_EMPRESA_UPDATE = '[EMPRESA_GERAL] LOADING_EMPRESA_UPDATE';
export const SET_TEMPO_RETIRADA = '[EMPRESA_GERAL] SET_TEMPO_RETIRADA';
export const SAVE_IMAGE_NAME_EMPRESA =
  '[EMPRESA_GERAL] SAVE_IMAGE_NAME_EMPRESA';
export const ALTERAR_IMAGEMS_LOGOTIPO =
  '[EMPRESA_GERAL] ALTERAR_IMAGEMS_LOGOTIPO';

const getDataLicenca = (idLicenca: number, licencas: any) => {
  const licenca = licencas.find(
    (licenca: any) => licenca.codigoLiberado === idLicenca,
  );

  const { ultimaLiberacao } = licenca;

  return Date.parse(ultimaLiberacao);
};

const verificaLicenca = (idLicenca: number, licencas: any) => {
  return licencas.some((licenca: any) => licenca.codigoLiberado === idLicenca);
};

export const resetEmpresa = () => {
  return { type: RESET_EMPRESA };
};

export const setLoadingTelaInicial = (value: boolean) => {
  return { type: SET_LOADING_TELA_INICIAL, payload: value };
};

export const changeModoCardapio = (value: boolean) => {
  return { type: CHANGE_MODO_CARDAPIO, payload: value };
};

export const saveEmpresaImageName = (nome: string | null) => {
  return { type: SAVE_IMAGE_NAME_EMPRESA, payload: nome };
};

export const alterarLogotipoEmpresa = (logotipo: any) => (dispatch: any) => {
  dispatch({
    type: ALTERAR_IMAGEMS_LOGOTIPO,
    payload: logotipo,
  });
};

export const uploadImagemEmpresa =
  (imagem: any, id: string, tipoImagem: string) =>
  async (dispatch: any, getState: any) => {
    let result = null;
    dispatch(setLoadingEmpresa(true));
    try {
      if (imagem) {
        const { data } = await api.get(`api/v1/empresas/upload/${id}`, {
          headers: {
            authorization: `bearer ${getTokenDashboard()}`,
          },
          params: {
            extensao: imagem.type,
            size: imagem.size,
            tipoImagem,
          },
        });

        if (data && data.upload) {
          const { url, nomeImagem } = data.upload;

          await axios.put(url, imagem, {
            headers: {
              'Content-Type': imagem.type,
            },
          });

          const { data: patchData } = await api.patch(`api/v1/empresas/${id}`, {
            logoTipoImagem: nomeImagem,
          });

          result = nomeImagem;
          await dispatch(alterarLogotipoEmpresa(patchData.empresa.imagem));
        }
      } else {
        await api.patch(`api/v1/empresas/${id}`, {
          logoTipoImagem: null,
        });

        result = null;
      }
      dispatch(setLoadingEmpresa(false));
      return result;
    } catch (e) {
      dispatch(setLoadingEmpresa(false));
    }
  };

export const carregarDadosEmpresa =
  () => async (dispatch: any, getState?: any) => {
    const empresaAll = getState().global.empresa.empresaAll;
    if (empresaAll.length > 0) {
      return;
    }

    let arrayCompanys = [];
    dispatch(setLoadingDashboard(true));
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
    const { data } = await api.get(`api/v1/empresas/all`);
    if (data && data.empresas && data.empresas.rows[0]) {
      arrayCompanys = data.empresas.rows[0];
    }

    await dispatch({
      type: CARREGAR_DADOS_EMPRESA_ALL,
      payload: arrayCompanys,
    });
    dispatch(setLoadingDashboard(false));
  };

export const trocarEmpresaStatus = (status: boolean) => {
  return { type: TROCAR_EMPRESA_STATUS, payload: status };
};

export const setTempoEntrega = (tempoEntrega: number) => {
  return { type: SET_TEMPO_ENTREGA, payload: tempoEntrega };
};

export const setTempoDeRetirada = (tempoDeRetirada: number) => {
  return { type: SET_TEMPO_RETIRADA, payload: tempoDeRetirada };
};

export const updateDataEmpresa = () => async (dispatch: any, getState: any) => {
  try {
    const { data } = await api.get(`api/front/v1/pedidos/tempoEntrega`, {
      withCredentials: true,
    });

    dispatch(setTempoEntrega(parseInt(data.tempoEntrega)));
  } catch (err) {
    dispatch(
      abrirMensagem({
        open: true,
        mensagem: trataExcecao(err),
        tipo: TipoMensagem.ERRO,
      }),
    );
  }
};
