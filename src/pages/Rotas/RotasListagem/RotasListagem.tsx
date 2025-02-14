import React, { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { TipoMensagem } from '../../../components/SnackBar/interface';

import Spinner from '../../../components/Spinner/indexSpinner';
import { abrirMensagem } from '../../../store/modules/Components/SnackBar/action';
import { userIsLogged, validTokenAdministracao } from '../../../utils/fn';
import OrderServiceContextProvevider from '../../../hooks/useServiceOrderContext';

const ListagemOrdensDeServico = lazy(
  () =>
    import(
      '../../Gestao/Cadastros/OrdensDeServico/ListagemOrdensDeServico/indexListagemOrdensDeServico2'
    ),
);

const RotasListagem: React.FC<any> = ({ match }) => {
  const dispatch = useDispatch();
  const integracaoFACILITE = useSelector(
    (state: any) => state.global.empresaAdmin.integracaoFacilite,
  );

  const configuracoesEmpresa = useSelector(
    (state: any) => state.global.configuracoesEmpresa.configuracoes,
  );

  const validaToken_IntegracaoListagem = (validaIntegracao: boolean = true) => {
    if (
      (!userIsLogged('@INPERA:token_adm') && !userIsLogged('@INPERA:token')) ||
      (validaIntegracao &&
        integracaoFACILITE &&
        configuracoesEmpresa &&
        configuracoesEmpresa.precoDiferenciado === false)
    ) {
      if (localStorage.getItem('@INPERA:token_adm')) {
        validTokenAdministracao();
      }
      dispatch(
        abrirMensagem({
          open: true,
          mensagem: 'Sessão Expirada, faça o login =D',
          tipo: TipoMensagem.ERRO,
        }),
      );
      return false;
    } else if (
      userIsLogged('@INPERA:token_adm') ||
      userIsLogged('@INPERA:token')
    ) {
      if (localStorage.getItem('@INPERA:token_adm')) {
        validTokenAdministracao();
      }
      return true;
    } else {
      return false;
    }
  };

  return (
    <Suspense
      fallback={
        <Spinner text="Aguarde, estamos carregando seus dados cadastrados :D" />
      }
    >
      <Switch>
        <Route
          path={`${match.path}/OrdensDeServico`}
          exact
          render={() =>
            validaToken_IntegracaoListagem(false) ? (
              <OrderServiceContextProvevider>
                <ListagemOrdensDeServico />
              </OrderServiceContextProvevider>
            ) : (
              <Redirect to="/" />
            )
          }
        />
      </Switch>
    </Suspense>
  );
};

export default RotasListagem;
