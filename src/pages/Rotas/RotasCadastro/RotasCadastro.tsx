import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router';

import Spinner from '../../../components/Spinner/indexSpinner';
import { userIsLogged, validTokenAdministracao } from '../../../utils/fn';

const CadastroDemo = lazy(
  () => import('../../Gestao/Cadastros/Demo/CadastroDemo/indexCadastroDemo'),
);
const CadastroOrdemServico = lazy(
  () => import('../../Gestao/Cadastros/OrdemServico/CadastroOrdemServico/indexCadastroOrdemServico'),
)

const RotasCadastro: React.FC<any> = ({ match }) => {
  const validaToken_IntegracaoCadastro = (validaIntegracao: boolean = true) => {
    if (
      (!userIsLogged('@INPERA:token_adm') && !userIsLogged('@INPERA:token')) ||
      validaIntegracao
    ) {
      if (localStorage.getItem('@INPERA:token_adm')) {
        validTokenAdministracao();
      }
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
      fallback={<Spinner text="Aguarde, estamos carregando os dados :D" />}
    >
      <Switch>
        {/* Rotas Cadastros */}
        <Route
          path={`${match.path}/demo`}
          exact
          render={
            () => <CadastroDemo />
            // validaToken_IntegracaoCadastro() ? (
            //   <CadastroDemo />
            // ) : (
            //   <Redirect to="/" />
            // )
          }
        />
        <Route
          path={`${match.path}/ordem-servico`}
          exact
          render={
            () => <CadastroOrdemServico />
          }
        />
      </Switch>
    </Suspense>
  );
};

export default RotasCadastro;
