import { TipoMensagem } from '../../../../../components/SnackBar/interface';
// import { TipoCadEmpresa } from '../../../../../pages/Gestao/Cadastros/Empresas/Cadastro/index-empresa-cadastros';

import api from '../../../../../services/api';
import { getTokenDashboard } from '../../../../../utils/fn';
import { removerMascara } from '../../../../../utils/mascaras';
import trataExcecao from '../../../../../utils/tratamentoExcecao';
import { carregarDadosEmpresaToken } from '../../../EmpresaAdmin/actions';
import { abrirMensagem } from '../../../Components/SnackBar/action';
import { patchConfigByCompany } from '../ConfiguracoesEmpresa/action';
import {
  CARREGAR_DADOS_EMPRESA_ALL,
  alterarLogotipoEmpresa,
  carregarDadosEmpresa,
  uploadImagemEmpresa,
} from '../../../Empresa/actions';
import { useSelector } from 'react-redux';

export const CARREGAR_EMPRESA = '[CADASTRO_EMPRESA]CARREGAR_EMPRESAS';
export const LIMPAR_DADOS_EMPRESA = '[CADASTRO_EMPRESA]LIMPAR_DADOS_EMPRESA';
export const EDITAR_DADOS_EMPRESA = '[CADASTRO_EMPRESA]SET_DADOS_EMPRESA';
export const UPDATE_DADOS_EMPRESA = '[CADASTRO_EMPRESA]UPDATE_DADOS_EMPRESA';
export const SET_CARREGA_TIPO_TELEFONE =
  '[CADASTRO_EMPRESA]CARREGA_TIPOTELEFONE';
export const SET_CARREGA_ESTADOS = '[CADASTRO_EMPRESA]CARREGA_ESTADOS';
export const SET_CARREGA_CIDADES = '[CADASTRO_EMPRESA]CARREGA_CIDADES';
export const ADD_NOVO_TIPO_TELEFONE = '[CADASTRO_EMPRESA]ADD_TIPOTELEFONE';
export const SET_LICENCA_LIBERADA = '[CADASTRO_EMPRESA]SET_LICENCA_LIBERADA';
export const LOADING_UPDATE_EMPRESA =
  '[CADASTRO_EMPRESA] LOADING_UPDATE_EMPRESA';
export const CARREGA_VISAO_FINANCEIRA = '[CADASTRO_EMPRESA]CARREGA_FINANCEIRO';

export const MENU_TABSELECT = '[CADASTRO_EMPRESA]MENU_SELECT';
export const DETALHE_TABSELECT = '[CADASTRO_EMPRESA]DETALHE_TABSELECT';

export const EMPRESA_LOADING = '[CADASTRO_EMPRESA]EMPRESA_LOADING';
export const EMPRESA_ONLOAD_SCREEN = '[CADASTRO_EMPRESA]EMPRESA_ONLOAD_SCREEN';

export const LOADING_EMPRESA_UPDATE =
  '[CADASTRO_EMPRESA] LOADING_EMPRESA_UPDATE';

export const objVisaoFinanceira: Array<Object> = [
  {
    id: 'ddec1db9-ddeb-4806-ba47-851fb6da5228',
    descricao: 'RECEBER/PAGAR',
    value: 'CONTAS_RECEBER_PAGAR',
  },
  {
    id: '6b6299ac-c999-4318-93d1-24758981b1b4',
    descricao: 'CAIXA/BANCOS',
    value: 'CAIXA_BANCOS',
  },
];
export const carregaVisaoFinanceira = () => async (dispatch: any) => {
  dispatch({
    type: CARREGA_VISAO_FINANCEIRA,
    payload: objVisaoFinanceira.map((tp: any) => ({
      id: tp.id,
      descricao: tp.descricao,
      value: tp.value,
    })),
  });
};

export const insertDadosEmpresa =
  (values: any, history: any) => async (dispatch: any, getState: any) => {
    try {
      // const gestor = await api.post(
      //   `${process.env.REACT_APP_API_TDP}`,
      //   {
      //     cli_razao: values.razao,
      //     cli_telefone: removerMascara(values.telefone),
      //     cli_email: values.email,
      //     cli_cnpjCpf: removerMascara(values.documento),
      //     cli_contato: '',
      //     cli_cidade: cidade ? cidade.codigoMunicipio : '3514106',
      //     cli_estado: cidade ? cidade.Estado.sigla : 'SP',
      //     cli_inpera: 'True',
      //   },
      //   {
      //     headers: {
      //       authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJyZXBfY29kaWdvIjoiMSJ9.PFGpgtsVml6ekLb9dEV5SETcABCpS2VszoseSnsgJxY`,
      //     },
      //     timeout: 13000,
      //   },
      // );

      // if (!gestor || gestor.data.success !== 'Cliente atualizado com sucesso')
      //   throw new Error('Falha ao gravar no gestor');
      const { data } = await api.post(`api/v1/empresas`, {
        razao: values.razao,
        fantasia: values.nomeFantasia,
        cnpjCpf: removerMascara(values.documento),
        ieRg: values.inscricaoEstadual || null,
        inscMunicipal: values.inscricaoMunicipal || null,
        cidade: values.cidade,
        site: values.site || undefined,
        email: values.email,
        logradouro: values.endereco,
        bairro: values.bairro,
        numero: values.numero,
        complemento: values.complemento || undefined,
        cep: removerMascara(values.cep),
        telefone: values.telefone
          ? {
              idTipoTelefone: values.tipoTelefone.id,
              numeroTelefone: removerMascara(values.telefone),
            }
          : undefined,
        habilitaShoppingVirtual: values.habilitaShopping,
        integracaoFacilite: values.integracaoFacilite,
        visaoFinanceiro: values.visaoFinanceiro && values.visaoFinanceiro.value,
        regime: Number(values.regime) || null,
        icmsSimplesNacional: values.icmsSimplesNacional || 0,
      });
      dispatch({ type: UPDATE_DADOS_EMPRESA, payload: data.empresa });

      dispatch(
        abrirMensagem({
          open: true,
          tipo: TipoMensagem.SUCESSO,
          mensagem: 'Cadastro realizado com sucesso!',
        }),
      );
      if (values.integracaoFacilite === false) {
        dispatch(patchConfigByCompany(data.empresa));
      }

      dispatch(carregarDadosEmpresaToken());
      // if (
      //   removerMascara(values.documento) !== '00254455000133' ||
      //   !values.email.includes('@tdp.com.br')
      // ) {
      //   dispatch(setLicencas());
      // }
      history.push('/listagem/empresas');
      // dispatch(menuTabSelect(TipoCadEmpresa.GERAL));
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

export const updateDadosEmpresa =
  (
    id: string,
    values: any,
    history: any,
    imagem?: any,
    changeImage?: boolean,
  ) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch(setLoadingEmpresa(true));
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
      const nome = getState().global.empresa.nomeImagemLogoEmpresa;

      const { data: empresaUpdate } = await api.put(`api/v1/empresas/${id}`, {
        razao: values.razao,
        fantasia: values.nomeFantasia,
        cnpjCpf: removerMascara(values.documento),
        ieRg: values.inscricaoEstadual || undefined,
        inscMunicipal: values.inscricaoMunicipal || undefined,
        cidade: values.cidade,
        site: values.site || undefined,
        email: values.email,
        logradouro: values.endereco,
        bairro: values.bairro,
        numero: values.numero,
        complemento: values.complemento ? values.complemento : null,
        cep: removerMascara(values.cep),
        telefone: values.telefone
          ? {
              idTipoTelefone: values.tipoTelefone.id,
              numeroTelefone: removerMascara(values.telefone),
            }
          : undefined,
        habilitaShoppingVirtual: values.habilitaShopping,
        integracaoFacilite: values.integracaoFacilite,
        visaoFinanceiro: values.visaoFinanceiro && values.visaoFinanceiro.value,
        regime: Number(values.regime) || null,
        icmsSimplesNacional: values.icmsSimplesNacional || 0,
        alteraLogotipo: changeImage,
      });

      if (changeImage) {
        const promise = () => {
          return new Promise((resolve, reject) => {
            const clear = function () {
              return dispatch(alterarLogotipoEmpresa(null));
            };
            const upload = function () {
              return dispatch(uploadImagemEmpresa(imagem, id, 'logotipo'));
            };
            const realizes = {
              clear,
              upload,
            };
            resolve(realizes);
          });
        };

        promise()
          .finally(() => {
            dispatch({
              type: UPDATE_DADOS_EMPRESA,
              payload: empresaUpdate.empresa,
            });
            if (values.integracaoFacilite === false) {
              dispatch(patchConfigByCompany(empresaUpdate.empresa));
            }
            // dispatch(carregarDadosEmpresaToken());
            // dispatch(menuTabSelect(TipoCadEmpresa.GERAL));
          })
          .then((resultado: any) => {
            resultado.clear();
            resultado.upload();
          })
          .then(() => {
            // dispatch(setOnloadScreen(true));
            dispatch(carregarDadosEmpresa());
          });
      }

      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Sucesso ao editar o registro.',
          tipo: TipoMensagem.SUCESSO,
        }),
      );
      // dispatch(setOnloadScreen(true));

      dispatch(carregarDadosEmpresa());
      history.push('/listagem/empresas');
      dispatch(setLoadingEmpresa(false));
    } catch (error) {
      dispatch(setLoadingEmpresa(false));
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(error),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const carregarDadosSemEmpresa = () => async (dispatch: any) => {
  dispatch(setCarregaEstadoByEmpresa());
  dispatch(carregaVisaoFinanceira());
  dispatch(setCarregaTipoTelefone());
};

export const carregarEmpresa =
  (id: string, idEstado: any, history: any = null, rota?: string) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoadingEmpresa(true));
      const { data } = await api.get(`api/v1/empresas/${id}`, {
        headers: {
          authorization: `Bearer ${getTokenDashboard()}`,
        },
      });
      if (!data) {
        throw new Error('Nenhum empresa foi localizada');
      }

      dispatch({ type: CARREGAR_EMPRESA, payload: data.empresa });

      dispatch(setCarregaTipoTelefone());
      dispatch(setCarregaEstadoByEmpresa());
      dispatch(carregaVisaoFinanceira());
      if ((await idEstado) && idEstado.length > 0) {
        await dispatch(setCarregaCidadeByEmpresa(idEstado));
      }
      dispatch(setLoadingEmpresa(false));
      if (history && history.location.pathname !== '' && rota && rota !== '') {
        history.push(rota);
      }
    } catch (err) {
      dispatch(setLoadingEmpresa(false));
      abrirMensagem({
        open: true,
        mensagem: trataExcecao(err),
        tipo: TipoMensagem.ERRO,
      });
    }
  };

export const setCarregaTipoTelefone = () => async (dispatch: any) => {
  try {
    dispatch(setLoadingEmpresa(true));
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
    const { data } = await api.get(`api/v1/tipoTelefones`);

    dispatch({
      type: SET_CARREGA_TIPO_TELEFONE,
      payload: data.tipoTelefones.rows.map((tp: any) => ({
        id: tp.id,
        descricao: tp.descricao,
        value: '',
      })),
    });
    dispatch(setLoadingEmpresa(false));
  } catch (err) {
    dispatch(setLoadingEmpresa(false));
    dispatch(
      abrirMensagem({
        open: true,
        mensagem: trataExcecao(err),
        tipo: TipoMensagem.ERRO,
      }),
    );
  }
};

export const setCarregaEstadoByEmpresa = () => async (dispatch: any) => {
  try {
    dispatch(setLoadingEmpresa(true));
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
    const { data } = await api.get(`api/v1/estados`);

    const estados = data.estados.rows.map((es: any) => ({
      id: es.id,
      descricao: es.nome,
      inputValue: '',
    }));

    estados.sort((a: any, b: any) => {
      if (a.descricao > b.descricao) return 1;
      else if (a.descricao < b.descricao) return -1;
      else return 0;
    });

    dispatch({
      type: SET_CARREGA_ESTADOS,
      payload: estados,
    });
    dispatch(setLoadingEmpresa(false));
  } catch (err) {
    dispatch(setLoadingEmpresa(false));
    dispatch(
      abrirMensagem({
        open: true,
        mensagem: trataExcecao(err),
        tipo: TipoMensagem.ERRO,
      }),
    );
  }
};

export const setCarregaCidadeByEmpresa =
  (estadoId: any) => async (dispatch: any) => {
    try {
      dispatch(setLoadingEmpresa(true));
      if (estadoId) {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
        const { data } = await api.get(`api/v1/cidades`, {
          params: { uf: estadoId },
        });

        dispatch({
          type: SET_CARREGA_CIDADES,
          payload: data.cidades.rows.map((cd: any) => ({
            id: cd.id,
            descricao: cd.descricao,
            inputValue: '',
          })),
        });
      }
      dispatch(setLoadingEmpresa(false));
    } catch (err) {
      dispatch(setLoadingEmpresa(false));
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(err),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const gravaNovoTipoTelefone =
  (setFieldValue: any, values: any) => async (dispatch: any) => {
    try {
      api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

      const { data } = await api.post(`/api/v1/tipoTelefones`, {
        descricao: values.descricao,
      });
      dispatch({
        type: ADD_NOVO_TIPO_TELEFONE,
        payload: data.tipoTelefone,
      });
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: `Sucesso ao cadastrar novo tipo de telefone.`,
          tipo: TipoMensagem.SUCESSO,
        }),
      );
      setFieldValue('tipoTelefone', {
        id: data.tipoTelefone.id,
        descricao: data.tipoTelefone.descricao,
        value: '',
      });
    } catch (e) {
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: trataExcecao(e),
          tipo: TipoMensagem.ERRO,
        }),
      );
    }
  };

export const licencaLiberada = () => async (dispatch: any) => {
  try {
    // dispatch(setLoadingEmpresa(true));
    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
    const { data } = await api.get('api/v1/licencas');
    // dispatch(setLoadingEmpresa(false));
    dispatch({ type: SET_LICENCA_LIBERADA, payload: data.licencas });
  } catch (e) {
    dispatch(setLoadingEmpresa(false));
    dispatch(
      abrirMensagem({
        open: true,
        mensagem: trataExcecao(e),
        tipo: TipoMensagem.ERRO,
      }),
    );
  }
};

// export const menuTabSelect = (selected: TipoCadEmpresa) => (dispatch: any) => {
//   dispatch({ type: MENU_TABSELECT, payload: selected });
// };

export const setLoadingEmpresa = (loading: boolean) => (dispatch: any) => {
  dispatch({ type: EMPRESA_LOADING, payload: loading });
};

export const setOnloadScreen = (loading: boolean) => (dispatch: any) => {
  dispatch({ type: EMPRESA_ONLOAD_SCREEN, payload: loading });
};

export const limparDados = () => {
  return { type: LIMPAR_DADOS_EMPRESA };
};
