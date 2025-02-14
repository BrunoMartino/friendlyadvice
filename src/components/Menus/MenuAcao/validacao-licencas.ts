import { cnpjEmpresaDev } from '../../../utils/consts';

export const menus_remover = [
  'PDV',
  'Notas Fiscais',
  'Finanças',
  'Delivery',
  'Ordens de Serviço',
  'Cadastro de CEP',
  'Cadastro de Bairros',
  'Cadastro de Distâncias',
  'Configuração do Delivery',
  'Configuração de Turnos',
  'Horários Especiais',
];

export const validarMenuLicencas37_38 = (licencas: any[], empDoc: string) => {
  if (empDoc === cnpjEmpresaDev) return false;
  return (
    licencas.some(({ codigoLicenca }) => codigoLicenca === 37) ||
    licencas.some(({ codigoLicenca }) => codigoLicenca === 38)
  );
};

