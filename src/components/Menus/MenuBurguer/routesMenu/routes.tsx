import React from 'react';
import { AiFillClockCircle, AiOutlineClockCircle } from 'react-icons/ai';
import { BsGear, BsPersonBoundingBox } from 'react-icons/bs';
import {
  FaCashRegister,
  FaDollarSign,
  FaLocationArrow,
  FaMapMarkerAlt,
  FaRegObjectGroup,
  FaRegObjectUngroup,
  FaSearchLocation,
  FaUserTie,
} from 'react-icons/fa';
import { GiExitDoor, GiFullMotorcycleHelmet } from 'react-icons/gi';
import { GoDashboard } from 'react-icons/go';
import { GrDropbox } from 'react-icons/gr';
import { HiOutlineDocumentReport, HiViewGridAdd } from 'react-icons/hi';
import { IoMdCash } from 'react-icons/io';
import {
  MdAccountBalance,
  MdAddBox,
  MdCardMembership,
  MdContactPhone,
  MdZoomOutMap,
} from 'react-icons/md';
import { RiLinksFill, RiSuitcaseLine, RiWallet2Fill } from 'react-icons/ri';
import { SiJsonwebtokens } from 'react-icons/si';
import { TiThListOutline } from 'react-icons/ti';

const typesAdress = (type: string) => {
  let result = {};
  switch (/*empresaAdmin.formaTaxaEntrega*/ type) {
    case 'CEP':
      result = {
        nome: 'Cadastro de CEP',
        url: `/listagem/CEP`,
        icone: <FaMapMarkerAlt />,
        disable: false,
      };
      break;

    case 'BAIRROS':
      result = {
        nome: 'Cadastro de Bairros',
        url: `/listagem/Bairros`,
        icone: <MdZoomOutMap />,
        disable: false,
      };
      break;
    case 'DISTÂNCIA':
      result = {
        nome: 'Cadastro de Distâncias',
        url: `/listagem/distancia`,
        icone: <FaLocationArrow />,
        disable: false,
      };
      break;

    default:
      result = {
        nome: 'Cadastro de CEP',
        url: `/listagem/CEP`,
        icone: <FaMapMarkerAlt />,
        disable: false,
      };
      break;
  }
  return result;
};

export const cadastroRoutes = [
  {
    nome: 'Cliente',
    url: '/listagem/clientes',
    icone: <BsPersonBoundingBox />,
    disable: false,
  },
  {
    nome: 'Produto',
    url: '/listagem/produtos',
    icone: <GrDropbox />,
    disable: false,
  },
  {
    nome: 'Grupo',
    url: '/listagem/grupos',
    icone: <FaRegObjectGroup />,
    disable: false,
  },
  {
    nome: 'Subgrupo',
    url: '/listagem/subgrupos',
    icone: <FaRegObjectUngroup />,
    disable: false,
  },
  {
    nome: 'Complemento',
    url: '/listagem/complementos',
    icone: <HiViewGridAdd />,
    disable: false,
  },
  {
    nome: 'Ingrediente',
    url: '/listagem/ingredientes',
    icone: <TiThListOutline />,
    disable: false,
  },
  {
    nome: 'Condicional',
    url: '/listagem/condicionais',
    icone: <MdAddBox />,
    disable: false,
  },
  {
    nome: 'Cobrança',
    url: '/listagem/cobrancas',
    icone: <RiWallet2Fill />,
    disable: false,
  },
  {
    nome: 'Localização',
    url: '/listagem/localizacao',
    icone: <FaSearchLocation />,
    disable: false,
  },
  {
    nome: 'Representantes',
    url: '/listagem/representantes',
    icone: <FaUserTie />,
    disable: false,
  },
  {
    nome: 'Plano de Contas',
    url: '/listagem/planocontas',
    icone: <MdAccountBalance />,
    disable: false,
  },
  {
    nome: 'Fornecedores',
    url: '/listagem/fornecedores',
    icone: <FaDollarSign />,
    disable: false,
  },
];

export const administracaoRoutes = [
  {
    nome: 'Dashboard',
    url: '/dashboard',
    icone: <GoDashboard />,
    disable: false,
  },
  {
    nome: 'Delivery',
    url: '/admin/gerenciar-pedidos',
    icone: <GiFullMotorcycleHelmet />,
    disable: false,
  },
  {
    nome: 'PDV',
    icone: <FaCashRegister />,
    disable: false,
    handleClick: () => {
      // dispatch(setClearDataSource('gerenciamentoDePedido'));
      // dispatch(connectionVendas(history));
    },
  },
];

export const aplciativoRoutes = [
  {
    nome: 'Empresa',
    url: '/listagem/Empresas',
    icone: <RiSuitcaseLine />,
  },
  {
    nome: 'Atualizar Licença',
    url: ``,
    icone: <MdCardMembership />,
    disable: false,
    handleClick: () => {
      // dispatch(setLicenseSave(true));
      // dispatch(setEmpresaLicencas(undefined, window));
    },
  },
  // typesAdress(),

];
