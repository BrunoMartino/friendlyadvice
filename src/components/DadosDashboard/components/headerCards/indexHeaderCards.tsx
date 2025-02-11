import React from 'react';
import { ContainerHeader } from './stylesHeaderCards';

interface iHeadersCards {
  icon: any;
  titleHeaderPrimary: string;
  titleHeaderSecundary?: string;
  animation?: any;
}

const HeaderCards: React.FC<iHeadersCards> = (props) => {
  return (
    <ContainerHeader>
      <props.icon
        className={`iconFinanceiro animate__animated ${
          props.animation ? props.animation : null
        }`}
      />
      <h1
        className={` animate__animated ${
          props.animation ? props.animation : null
        }`}
      >
        {props.titleHeaderPrimary}
        {props.titleHeaderSecundary && (
          <span className="styleTitleSecundary">
            {props.titleHeaderSecundary}
          </span>
        )}
      </h1>
    </ContainerHeader>
  );
};

export default HeaderCards;
