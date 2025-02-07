import React, { useCallback, useEffect, useRef, useState } from 'react';
import jwt from 'jsonwebtoken';
import Button from '../../components/Button/button-componente';
import api from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
// import { abrirMensagem } from '../../store/modules/Components/SnackBar/action';
import trataExcecao from '../../utils/tratamentoExcecao';
// import { TipoMensagem } from '../../components/SnackBar/interface';
// import ContainerSnackBar from '../../components/ContainerSnackBar';
// import CabecalhoPadrao from '../../components/CabecalhoPadrao/indexCabecalhoPadrao';
import classes from './stylesTokenIntegracao.module.css';
import { FcOk } from 'react-icons/fc';
// import {
//   dadosModalConfirmacao,
//   fecharModalConfirmacao,
// } from '../../store/modules/Components/ModalConfirmacao/action';
import ModalConfirmacao from '../../components/ModalConfirmacao/indexModalConfirmacao';
import { getTokenDashboard, validTokenAdministracao } from '../../utils/fn';
// import SnackbarDefault from '../../components/SnackbarDefault';

const TokenIntegracao: React.FC = () => {
  const dispatch = useDispatch();
  const [tokenInteg, setTokenInteg] = useState('');
  const [tokenIntegRecuperado, settokenIntegRecuperado] = useState('');
  const [labelTextoToken, setLabelTextoToken] = useState(
    'Clique em recuperar pra buscar um token',
  );

  const idCompany = useSelector((state: any) => state.global.empresaAdmin?.id);

  const token = localStorage.getItem('@INPERA:token');

  const tokenAdm = validTokenAdministracao();

  const inputToken = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  useEffect(() => {
    if (!tokenAdm) {
      if (tokenInteg === '') {
        setLabelTextoToken('Clique em recuperar pra buscar um token');
      } else {
        setLabelTextoToken('Token recuperado com sucesso!!');
      }
    }
  }, [tokenInteg, tokenAdm]);

  const copiarTexto = () => {
    if (tokenInteg || tokenIntegRecuperado) {
      inputToken.current.select();
      document.execCommand('copy');

      // dispatch(
      //   abrirMensagem({
      //     open: true,
      //     mensagem: 'Token copiado com sucesso para a área de transferência',
      //     tipo: TipoMensagem.SUCESSO,
      //   }),
      // );
    }
  };

  const handleRecuperar = useCallback(async (): Promise<void> => {
    let idEmpresa;

    if (token) {
      const decoded = jwt.decode(token, { json: true });
      idEmpresa = decoded!.empresaId;
    }

    api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;

    try {
      const tokenIntegracaoPostgres = await api.get(`/api/v1/tokenEmpresa`);
      if (tokenIntegracaoPostgres) {
        /* istanbul ignore next */
        setTokenInteg(tokenIntegracaoPostgres.data.tokenEmpresa);
      } else {
        /* istanbul ignore next */
        setTokenInteg('');
      }
    } catch (error) {
      // dispatch(
      //   abrirMensagem({
      //     open: true,
      //     mensagem: trataExcecao(error),
      //     tipo: TipoMensagem.ERRO,
      //   }),
      // );
    }
  }, [token]);

  const handleModalRecuperar = useCallback(() => {
    // dispatch(
    //   dadosModalConfirmacao(
    //     'Deseja gerar um novo token de integração?',
    //     'Ao alterar o token, as integrações serão pausadas até inserir o novo token no monitor. Deseja realmente alterar?',
    //     true,
    //     () => {
    //       handleRecuperar();
    //       dispatch(fecharModalConfirmacao());
    //     },
    //   ),
    // );
  }, [handleRecuperar]);

  const getToRecoverTokenIntegracao = async () => {
    try {
      if (tokenAdm) {
        api.defaults.headers.authorization = `Bearer ${getTokenDashboard()}`;
        const { data } = await api.get(`/api/v1/tokenEmpresa/${idCompany}`);
        settokenIntegRecuperado(data.tokenEmpresa);
      } else {
        settokenIntegRecuperado('');
      }
    } catch (error) {
      // dispatch(
      //   abrirMensagem({
      //     open: true,
      //     mensagem: trataExcecao(error),
      //     tipo: TipoMensagem.ERRO,
      //   }),
      // );
    }
  };

  useEffect(() => {
    if (tokenAdm) {
      getToRecoverTokenIntegracao();
    }
  }, [tokenAdm]);

  return (
    <div className={classes.container}>
      <div className={classes.cabecalho}>
        {/* <CabecalhoPadrao /> */}
      </div>

      {/* <ContainerSnackBar /> */}
      {/* <SnackbarDefault /> */}
      <div className={classes.body}>
        <div className={classes.texto1}>
          <p>Integração com o INPERA</p>
        </div>
        <div className={classes.textoInformacao}>
          <p>
            Para utilizar o serviço de integração com o Sistema de SOFTWARE, é
            necessário que utilize esse token de segurança para garantir a
            integridade dos dados.
          </p>
        </div>
        <div className={classes.dadosToken}>
          <div className={classes.textoDados}>
            <div className={classes.icone}>
              <FcOk />
              <p>{labelTextoToken}</p>
            </div>
            <textarea
              ref={inputToken}
              readOnly
              value={tokenInteg || tokenIntegRecuperado}
            >
              {tokenAdm && tokenIntegRecuperado
                ? tokenIntegRecuperado
                : tokenInteg}
            </textarea>
            <p
              className={classes.copiarToken}
              onClick={copiarTexto}
              style={{
                opacity: tokenInteg || tokenIntegRecuperado ? 1 : 0.3,
                cursor:
                  tokenInteg || tokenIntegRecuperado ? 'pointer' : 'default',
              }}
            >
              [Copiar Token]
            </p>
          </div>
          <div className={classes.botao}>
            <Button
              disabled={tokenAdm}
              onClick={handleModalRecuperar}
              opacity={tokenAdm ? 0.4 : 1}
            >
              Recuperar token
            </Button>
          </div>
        </div>
      </div>
      <ModalConfirmacao />
    </div>
  );
};

export default TokenIntegracao;
