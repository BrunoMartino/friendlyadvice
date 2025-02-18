import React from 'react';
import { GiExitDoor } from 'react-icons/gi';
import { IoIosGlobe, IoIosPaper } from 'react-icons/io';
import _remove from 'lodash/remove';

export const menuItensAplicativos = () => {
  let result: any = [];

  {
    process.env.REACT_APP_ENV === 'DEV' &&
      result.push(
        {
          nome: 'Ordens de Serviço',
          icone: <IoIosPaper />,
          url: '/listagem/OrdensDeServico',
        },
        {
          nome: 'Geolocalização OS',
          icone: <IoIosGlobe />,
          url: '/geolocalizacao/OrdensDeServico',
        },
      );
  }

  return result;
};

export const menuUsuario = (userIn?: any) => {
  let result: any = [];
  if (userIn) {
    const { usuarioEmail, usuarioNome } = userIn;
    result.push({ userName: usuarioNome });
    result.push({ userEmail: usuarioEmail });
  }

  result.push({
    nome: 'Sair',
    url: '/logout',
    icone: <GiExitDoor />,
  });

  return result;
};
