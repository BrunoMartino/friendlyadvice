import React, { lazy, Suspense, useMemo } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userIsLogged, validTokenAdministracao } from '../../../utils/fn';
import Spinner from '../../../components/Spinner/indexSpinner';
import AtendimentoOrdensDeServico from '../../Gestao/Cadastros/OrdensDeServico/Atendimento/indexAtendimento';

const Login = lazy(() => import('../../Registro/Login'));

const RotasDashboard: React.FC<any> = ({ match }) => {
  const dispatch: any = useDispatch();

  const loadingEmpresaLicenca = useSelector(
    (state: any) => state.global.empresaLicencas.loadingLicenca,
  );

  const licenseSet = useSelector(
    (state: any) => state.global.empresaLicencas.setLicenseSeted,
  );

  const validaToken_IntegracaoDashboard = () => {
    if (userIsLogged('@INPERA:token_adm') || userIsLogged('@INPERA:token')) {
      if (localStorage.getItem('@INPERA:token_adm')) {
        validTokenAdministracao();
      }
      return true;
    } else {
      return false;
    }
  };

  let search = useLocation().search;
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const verifyRouteVendasWeb = (): Boolean => {
    if (
      query.get('menuaplicativo') === 'true' &&
      query.get('rota') === 'vendasweb'
    ) {
      return true;
    }

    return false;
  };

  const verifyRouteGerenciamentoDelivery = (): Boolean => {
    if (
      query.get('menuaplicativo') === 'true' &&
      query.get('rota') === 'gerenciamentodelivery'
    ) {
      return true;
    }
    return false;
  };

  return (
    <Suspense
      fallback={
        <Spinner
          text={
            verifyRouteVendasWeb() || verifyRouteGerenciamentoDelivery()
              ? 'Redirecionando para página...'
              : loadingEmpresaLicenca && licenseSet
              ? `Aguarde, estamos atualizando as licenças :D`
              : loadingEmpresaLicenca
              ? `Aguarde, estamos verificando a licença :D`
              : `Aguarde, estamos carregando seus dados :D`
          }
        />
      }
    >
      <Switch>
        <Route
          path={`${match.path}ordemDeServico/atendimento/:id`}
          exact
          component={AtendimentoOrdensDeServico}
        />
        <Route
          path={`${match.path}logout`}
          exact
          render={() => {
            dispatch({ type: 'RESET_REDUX' });
            const tokenADM = localStorage.getItem('@INPERA:token_adm');
            localStorage.removeItem('@INPERA:token_adm');
            localStorage.removeItem('@INPERA:token');

            if (tokenADM) {
              window.location.href = `${process.env.REACT_APP_API_FRONT_ADM}/dashboard`;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />

        <Route
          path={`${match.path}`}
          exact
          render={() => {
            if (
              !loadingEmpresaLicenca &&
              validaToken_IntegracaoDashboard() &&
              verifyRouteVendasWeb()
            ) {
              return (
                <Redirect to="/dashboard?menuaplicativo=true&rota=vendasweb" />
              );
            } else if (
              !loadingEmpresaLicenca &&
              validaToken_IntegracaoDashboard() &&
              verifyRouteGerenciamentoDelivery()
            ) {
              return (
                <Redirect to="/dashboard?menuaplicativo=true&rota=gerenciamentodelivery" />
              );
            } else if (
              loadingEmpresaLicenca &&
              licenseSet &&
              validaToken_IntegracaoDashboard()
            ) {
              return <Redirect to="/listagem/OrdensDeServico" />;
            } else if (
              !loadingEmpresaLicenca &&
              validaToken_IntegracaoDashboard()
            ) {
              return <Redirect to="/listagem/OrdensDeServico" />;
            } else {
              return <Login />;
            }
          }}
        />
      </Switch>
    </Suspense>
  );
};

export default RotasDashboard;
