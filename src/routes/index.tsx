import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RotasDashboard from '../pages/Rotas/RotasDashboard/RotasDashboard';
import RotasCadastro from '../pages/Rotas/RotasCadastro/RotasCadastro';
import RotasListagem from '../pages/Rotas/RotasListagem/RotasListagem';
<<<<<<< HEAD
import RotasGeolocalizacao from '../pages/Rotas/RotasGeolocalizacao/RotasGeolocalizacao';
=======
>>>>>>> 315925569e64db1c822509353a5a351980cbeb0d

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/cadastros" component={RotasCadastro} />
      <Route path="/listagem" component={RotasListagem} />
<<<<<<< HEAD
      <Route path="/geolocalizacao" component={RotasGeolocalizacao} />
=======
>>>>>>> 315925569e64db1c822509353a5a351980cbeb0d
      <Route path="/" component={RotasDashboard} />
    </Switch>
  );
};

export default Routes;
