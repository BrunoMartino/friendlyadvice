import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RotasCadastro from '../pages/Rotas/RotasCadastro/RotasCadastro';
import RotasListagem from '../pages/Rotas/RotasListagem/RotasListagem';
import RotasDashboard from '../pages/Rotas/RotasDashboard/RotasDashboard';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/cadastros" component={RotasCadastro} />
      <Route path="/listagem" component={RotasListagem} />
      <Route path="/" component={RotasDashboard} />
    </Switch>
  );
};

export default Routes;
