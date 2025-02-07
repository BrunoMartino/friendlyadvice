import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import { TipoMensagem } from '../../../components/SnackBar/interface';

import Spinner from '../../../components/Spinner/indexSpinner';
// import { abrirMensagem } from '../../../store/modules/Components/SnackBar/action';
import { userIsLogged, validTokenAdministracao } from '../../../utils/fn';

const ListagemDemo = lazy(
  () => import('../../Gestao/Cadastros/Demo/ListagemDemo/indexListagemDemo'),
);

const RotasListagem: React.FC<any> = ({ match }) => {
  const validaToken_IntegracaoListagem = (validaIntegracao: boolean = true) => {
    if (
      (!userIsLogged('@INPERA:token_adm') && !userIsLogged('@INPERA:token')) ||
      validaIntegracao
    ) {
      if (localStorage.getItem('@INPERA:token_adm')) {
        validTokenAdministracao();
      }
      // dispatch(
      //   abrirMensagem({
      //     open: true,
      //     mensagem: 'Sessão Expirada, faça o login =D',
      //     tipo: TipoMensagem.ERRO,
      //   }),
      // );
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
          path={`${match.path}/demo`}
          exact
          render={
            () => <ListagemDemo />
            // validaToken_IntegracaoListagem() ? (
            //   <ListagemDemo />
            // ) : (
            //   <Redirect to="/" />
            // )
          }
        />
      </Switch>
    </Suspense>
  );
};

export default RotasListagem;
