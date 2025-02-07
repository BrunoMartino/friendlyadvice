import React from 'react';
import {
  Container,
  Option,
  SubOptionsFirst,
  SubOptionsSecond,
  SubOptionsThird,
} from './styled-burguer';
import { RiEditLine } from 'react-icons/ri';
import {
  administracaoRoutes,
  aplciativoRoutes,
  cadastroRoutes,
} from './routesMenu/routes';

export const BurguerMenu = () => {
  return (
    <Container>
      <Option>
        <SubOptionsFirst>
          {cadastroRoutes &&
            cadastroRoutes.map((cad) => (
              <div className="sub-div-itens">
                <RiEditLine />
                <p>teste</p>
              </div>
            ))}
        </SubOptionsFirst>
        <SubOptionsSecond>
          {aplciativoRoutes &&
            aplciativoRoutes.map((app) => (
              <div className="sub-div-itens">
                <RiEditLine />
                <p>teste</p>
              </div>
            ))}
        </SubOptionsSecond>
        <SubOptionsThird>
          {administracaoRoutes &&
            administracaoRoutes.map((adm) => (
              <div className="sub-div-itens">
                <RiEditLine />
                <p>teste</p>
              </div>
            ))}
        </SubOptionsThird>
      </Option>
    </Container>
  );
};
