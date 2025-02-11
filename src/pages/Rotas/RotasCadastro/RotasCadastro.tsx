import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';

import Spinner from '../../../components/Spinner/indexSpinner';
import { userIsLogged, validTokenAdministracao } from '../../../utils/fn';

const CadastroOrdemServico = lazy(
  () =>
    import(
      '../../Gestao/Cadastros/OrdensDeServico/CadastroOrdemServico/indexCadastroOrdemServico'
    ),
);

const RotasCadastro: React.FC<any> = ({ match }) => {
  const integracaoFACILITE = useSelector(
    (state: any) => state.global.empresaAdmin.integracaoFacilite,
  );
  const configuracoesEmpresa = useSelector(
    (state: any) => state.global.configuracoesEmpresa.configuracoes,
  );

  const validaToken_IntegracaoCadastro = (validaIntegracao: boolean = true) => {
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
        <Route
          path={`${match.path}/ordem-servico`}
          exact
          render={() =>
            validaToken_IntegracaoCadastro(false) ? (
              <CadastroOrdemServico />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      </Switch>
    </Suspense>
  );
};

export default RotasCadastro;
