import React from 'react';
import ContainerValuesSales from '../ContainerValuesSales/indexContainerValuesSales';

import { ContainerBoxValuesSales } from './stylesBoxValuesSales';

interface IBoxValuesSales {
  titleBox: string;
  animated: string;
  values: {
    valorVendido: number;
    vendasRealizadas: number;
    ticketMedio: number;
  };
  timeAnimations: number;
}

const BoxValuesSales: React.FC<IBoxValuesSales> = (props) => {
  return (
    <ContainerBoxValuesSales className={`animate__animated ${props.animated}`}>
      <h2 className="Hoje">{props.titleBox}</h2>
      <hr />
      <ContainerValuesSales
        title="Valor Vendido"
        value={props.values.valorVendido}
        duration={props.timeAnimations}
      />
      <ContainerValuesSales
        title="Vendas Realizadas"
        value={props.values.vendasRealizadas}
        duration={props.timeAnimations}
      />
      <ContainerValuesSales
        title="Ticket Médio"
        value={props.values.ticketMedio}
        duration={props.timeAnimations}
      />
    </ContainerBoxValuesSales>
  );
};

export default BoxValuesSales;
