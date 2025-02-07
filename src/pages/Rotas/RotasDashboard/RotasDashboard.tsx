import React, { lazy, Suspense, useMemo } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  getTokenDashboard,
  userIsLogged,
  validTokenAdministracao,
} from '../../../utils/fn';
import Spinner from '../../../components/Spinner/indexSpinner';

const Login = lazy(() => import('../../Registro/Login'));

const RotasDashboard: React.FC<any> = ({ match }) => {
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
      fallback={<Spinner text={`Aguarde, estamos carregando seus dados :D`} />}
    >
      <Switch>
        <Route
          path={`${match.path}logout`}
          exact
          render={() => {
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
            return <Login />;
          }}
        />
      </Switch>
    </Suspense>
  );
};

export default RotasDashboard;
