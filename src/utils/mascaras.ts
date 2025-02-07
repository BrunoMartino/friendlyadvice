import { format } from 'date-fns';
import moment from 'moment';
import { dataConvert, formatarDataSimples } from './fn';

export const mascaraCPFCNPJ = (campoTexto: string) => {
  let result: string = '';

  if (campoTexto.length <= 11) {
    result = mascaraCpf(campoTexto);
  } else {
    result = mascaraCnpj(campoTexto);
  }

  return result;
};

export const mascaraCnpjCpf = (valor: string) => {
  const txt = removerMascara(valor);
  switch (txt.trim().length) {
    case 14:
      return mascaraCnpj(txt);
    case 11:
      return mascaraCpf(txt);
    default:
      return valor;
  }
};

export const mascaraCEP = (campoTexto: string) => {
  if (!campoTexto) return '';
  const mask = /(\d{5})(\d{3})/;
  if (campoTexto && campoTexto.length > 0) {
    return campoTexto.replace(mask, '$1-$2');
  }
};

export const mascaraTelefone = (campoTexto: string) => {
  if (campoTexto) {
    let mask;
    switch (campoTexto.length) {
      case 10:
        mask = /(\d{2})(\d{4})(\d{4})/;
        break;
      case 11:
        mask = /(\d{2})(\d{5})(\d{4})/;
        break;
      default:
        mask = null;
    }
    if (mask) {
      return campoTexto.replace(mask, '($1) $2-$3');
    } else {
      return campoTexto;
    }
  } else {
    return campoTexto;
  }
};

export const removerMascara = (campoTexto: string) => {
  if (campoTexto && campoTexto.length > 0) {
    return campoTexto
      .trim()
      .replaceAll('(', '')
      .replaceAll(')', '')
      .replaceAll(' ', '')
      .replaceAll('/', '')
      .replaceAll('.', '')
      .replaceAll('-', '');
  } else return '';
};

const mascaraCpf = (valor: string) => {
  return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
};

const mascaraCnpj = (valor: string) => {
  return valor.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
    '$1.$2.$3/$4-$5',
  );
};

export const mascaraValor = (valor: number) => {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currency: 'BRL',
  });
};

export const mascaraQuantidade = (valor: number) => {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
    currency: 'BRL',
  });
};

// Aceita apenas números
export const maskOnlyNumbers = (value: any) => {
  return value.replace(/\d/g, '');
};

export const mascaraData = (data: any) => {
  if (data) {
    return format(new Date(data), 'dd/MM/yyyy');
  }
};

export const mascaraHora = (hora: any) => {
  if (hora) {
    return format(new Date(hora), 'HH:mm:ss');
  }
};

export const mascaraDataHora = (hora: any) => {
  if (hora) {
    return format(new Date(hora), 'dd/MM/yyyy HH:mm:ss');
  }
};

export const maskDate = (data: any) => {
  const date = new Date(data);
  const dia = date.getDate() < 31 ? date.getDate() + 1 : date.getDate() - 1;
  const mes = date.getMonth() + 1;
  const ano = String(date.getFullYear()).substring(2);
  const dateString =
    (dia <= 9 ? '0' + dia : dia) +
    '/' +
    (mes <= 9 ? '0' + mes : mes) +
    '/' +
    ano;

  return dateString;
};

export const maskDateMoment = (date: any) => {
  let dat = moment(date)
  return dat.format('YYYY-MM-DD[T]HH:mm:ss')
}

export const mascaraDataReduced = (data: any) => {
  if (data) {
    return format(new Date(data), 'dd/MM/yy');
  }
};
