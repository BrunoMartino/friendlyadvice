import React from 'react';
import CountUp from 'react-countup';
import { ContainerSales } from './stylesContainerValuesSales';

interface ISalesRealized {
  title: string;
  value: number;
  duration: number;
}

const ContainerValuesSales: React.FC<ISalesRealized> = (props) => {
  return (
    <ContainerSales>
      <p className="title">{props.title}</p>

      <p>
        <CountUp
          className="Valores"
          end={Number(props.value)}
          decimal=","
          decimals={2}
          separator="."
          duration={props.duration}
          preserveValue
        />
      </p>
    </ContainerSales>
  );
};

export default ContainerValuesSales;
