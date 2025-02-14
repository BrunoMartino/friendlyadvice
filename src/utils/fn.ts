import { format, subHours } from 'date-fns';
import { offsetOf } from 'tz-offset';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';

import { abrirMensagem } from '../store/modules/Components/SnackBar/action';
import { TipoMensagem } from '../components/SnackBar/interface';
// import { setLogoutCliente } from '../store/modules/ClienteLogado/actions';
import moment from 'moment';
import { apiCEP } from '../services/api';
import { yellowMainColor } from './colors';
import axios from 'axios';
import { DateTime } from 'luxon';

interface IFormatarData {
  dia: number;
  mes: number;
  ano: number;
  formato: string;
}

export const tempoAnimacaoDashboard = 1;

export const getMaxGrauPlanoContas = () => {
  return 3;
};

export const getMascaraCodigoPlanoContas = () => {
  return '9.99.99.999';
};

export const applyAccountsMask = (value: string) => {
  const maskDefault = getMascaraCodigoPlanoContas().split('.');
  const mask = getMascaraCodigoPlanoContas().replaceAll('.', '');

  const arrayMask = Object.values(mask);
  const arrayValue = Object.values(value);

  let regexCodigo = '';
  let replaceRegex = '';

  if (arrayValue.length > 1 && arrayValue.length === arrayMask.length) {
    for (let index = 0; index <= maskDefault.length - 1; index++) {
      regexCodigo += `(\\d{${maskDefault[index]?.length}})`;
      replaceRegex += `$${index + 1}${maskDefault.length > 0 ? '.' : ''}`;
    }

    replaceRegex = replaceRegex.substring(0, replaceRegex.length - 1);

    const regexMask = new RegExp(regexCodigo, 'g');

    return value.replace(regexMask, replaceRegex);
  }

  return value;
};

export const formatarData = (obj: IFormatarData): string => {
  if (obj.dia && obj.ano) {
    return format(new Date(obj.ano, obj.mes, obj.dia), obj.formato);
  }

  return '';
};

export const myCustomLocale = {
  // months list by order
  months: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],

  // week days by order
  weekDays: [
    {
      name: 'Domingo', // used for accessibility
      short: 'D', // displayed at the top of days' rows
      isWeekend: true, // is it a formal weekend or not?
    },
    {
      name: 'Segunda',
      short: 'S',
    },
    {
      name: 'Terça',
      short: 'T',
    },
    {
      name: 'Quarta',
      short: 'Q',
    },
    {
      name: 'Quinta',
      short: 'Q',
    },
    {
      name: 'Sexta',
      short: 'S',
    },
    {
      name: 'Sábado',
      short: 'S',
      isWeekend: true,
    },
  ],

  // just play around with this number between 0 and 6
  weekStartingIndex: 0,

  // return a { year: number, month: number, day: number } object
  getToday(gregorainTodayObject: any) {
    return gregorainTodayObject;
  },

  // return a native JavaScript date here
  toNativeDate(date: any) {
    return new Date(date.year, date.month - 1, date.day);
  },

  // return a number for date's month length
  getMonthLength(date: any) {
    return new Date(date.year, date.month, 0).getDate();
  },

  // return a transformed digit to your locale
  transformDigit(digit: any) {
    return digit;
  },

  // texts in the date picker
  nextMonth: 'Proximo Mês',
  previousMonth: 'Mês Anterior',
  openMonthSelector: 'Abrir Seletor de Mês',
  openYearSelector: 'Abrir Seletor de Ano',
  closeMonthSelector: 'Fechar Seletor de Mês',
  closeYearSelector: 'Fechar Seletor de Ano',
  defaultPlaceholder: 'Selecionar...',

  // for input range value
  from: '',
  to: '-',

  // used for input value when multi dates are selected
  digitSeparator: ',',

  // if your provide -2 for example, year will be 2 digited
  yearLetterSkip: 0,

  // is your language rtl or ltr?
  isRtl: false,
};

export const isNumberFormat = /^[0-9]*$/;
export const Plano = /[0-9]{1}\.?[0-9]{2}\.?[0-9]{2}\.?[0-9]{3}/;
export const somenteLetrasMinusculas_Numeros = /^[a-z0-9_]*$/;
export const isRealFormat = /^\d{0,3}\d{0,3},?\d{0,2}?$/;

export const handleFormatDate = (date: Date | undefined) => {
  if (
    typeof date === 'object' &&
    date !== null &&
    'getDate' in date &&
    'getMonth' in date &&
    'getFullYear' in date
  ) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}-${String(date.getDate()).padStart(2, '0')} ${String(
      date.getHours(),
    ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(
      date.getSeconds(),
    ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`;
  }
};

// remove valores duplicados. prop é o dado dentro do obejto. ex: {prop: 'alguma coisa'}
export const removeDuplicates = (originalArray: any[], prop: any) => {
  const newArray = [];
  let lookupObject: any = {};

  for (let i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (let i in lookupObject) {
    newArray.push(lookupObject[i]);
  }

  return newArray;
};

export const formatarValor = (
  value: any,
  digitos: number = 2,
  maxDigitos = 2,
) => {
  const valor = parseFloat(value < 0 ? value * -1 : value);

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: digitos,
    maximumFractionDigits: digitos || maxDigitos,
    currency: 'BRL',
  }).format(valor);
};
export const formatarValorSem = (value: any) =>
  new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    currency: 'BRL',
  }).format(value);

// export const mphone = (v: string): string => {
//   let r = v.replace(/\D/g, '');
//   r = r.replace(/^0/, '');
//   if (r.length > 10) {
//     r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
//   } else if (r.length > 5) {
//     r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
//   } else if (r.length > 2) {
//     r = r.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
//   } else {
//     r = r.replace(/^(\d*)/, '($1');
//   }
//   return r;
// };

export const strNumToFloat = (strNum: string) => {
  const validStrNum = /^\s*(?:[1-9]\d{0,2}(?:\.\d{3})*|0)(?:,\d{1,2})?$/;
  if (validStrNum.test(strNum)) {
    return parseFloat(strNum.replaceAll('.', '').replace(',', '.'));
  } else {
    return 0;
  }
};

export const loadState = (): void => {
  try {
    const serializableState = localStorage.getItem('@MenuDigital:data');
    if (!serializableState) {
      return undefined;
    }

    const status = CryptoJS.AES.decrypt(
      serializableState,
      `${process.env.REACT_APP_CRYPTO_PRIVATE_KEY}`,
    );

    const statusOriginal = status.toString(CryptoJS.enc.Utf8);

    return JSON.parse(statusOriginal);
  } catch (err) {
    return undefined;
  }
};

export const formatarValorNumerico = (value: string, casasDecimais = 2) => {
  let novoValor = value;

  if (value.includes(',')) {
    novoValor = value.replace(',', '.');
  }

  const formatter = Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: casasDecimais,
    minimumFractionDigits: casasDecimais,
  });

  if (!isNaN(parseFloat(novoValor))) {
    return formatter.format(parseFloat(novoValor));
  }

  return value;
};

export const getTokenDashboard = () => {
  try {
    const token = localStorage.getItem('@INPERA:token');
    const tokenADM = localStorage.getItem('@INPERA:token_adm');

    if (!token || (!token && !tokenADM)) {
      throw new Error('Sessão expirada, faça o login, por favor =D');
    }

    return token ? token : tokenADM ? tokenADM : null;
  } catch (err) {
    throw err;
  }
};

export const getTokenCliente = (dispatch: any) => {
  try {
    const token = localStorage.getItem('@INPERA:delivery');

    if (!validacaoTokenJWT(token!, '@INPERA:delivery')) {
      // dispatch(setLogoutCliente());
      return;
    }

    return token;
  } catch (err) {
    throw err;
  }
};

export const getDadosCliente = (dispatch: any) => {
  const token = getTokenCliente(dispatch);

  if (token) {
    const data: any = jwt.decode(token);

    return {
      id: data.id,
      nome: data.nome,
      email: data.email,
    };
  } else {
    return {
      id: '',
      nome: '',
      email: '',
    };
  }
};

export const device = {
  mobile: `(max-width: 600px)`,
  tablet: `(max-width: 960px)`,
  desktop: `(max-width: 1280px)`,
};

export enum Status {
  ABERTO = 'ABERTO',
  PRODUCAO = 'PRODUÇÃO',
  ENTREGA = 'ENTREGA',
  CANCELADO = 'CANCELADO',
  FINALIZADO = 'FINALIZADO',
  EM_RECEBIMENTO = 'EM RECEBIMENTO',
  PENDENTE = 'PENDENTE',
  A_PAGAR = 'À PAGAR',
  TODOS = 'TODOS',
  INCONSISTENCIA = 'INCONSISTENCIA',
}

export enum StatusColorReturn {
  ABERTO = '#F24B63',
  PRODUCAO = '#E38242',
  ENTREGA = '#4660F2',
  CANCELADO = '#A7A3A2',
  FINALIZADO = '#4BBF64',
  EM_RECEBIMENTO = '#6338A6',
  A_PAGAR = '#6338A6',
  INCONSISTENCIA = '#FF0000',
}

export enum StatusAutoAtendimento {
  ABERTO = 'ABERTO',
  PRODUCAO = 'PRODUÇÃO',
  CANCELADO = 'CANCELADO',
  FINALIZADO = 'FINALIZADO',
  EM_RECEBIMENTO = 'EM RECEBIMENTO',
  TODOS = 'TODOS',
}

export enum Origem {
  TODOS = 'TODOS',
  INPERADELIVERY = 'INPERADELIVERY',
  INPERAESTOUAQUI = 'INPERAESTOUAQUI',
  IFOOD = 'IFOOD',
}

export const VALOR_REGEX = /^[0-9,.]+$/;
export const REGEX_CEP = /^\d{0,8}$/;
export const REGEX = /^[1-9]{1}[0-9]*$/;
export const REGEX_NUMBER = /^[0-9]*$/;
export const REGEX_PERCENT = /^[0-9][0-9]?$|^100$/;
export const REGEX_VALOR_MONETARIO = /^\d*,?\d{0,2}$/;
export const REGEX_VALUE_DECIMAL_100 = /^\d{0,3},?\d{0,2}?$/;
export const REGEX_PERCENT_DECIMAL =
  /^((100((\,)[0-9]{1,2})?)|([0-9]{1,2}((\,)[0-9]{0,2})?))$/;

export const REGEX_MONEY_HUNDRED_LIMIT = /^[0-9]{0,8}(\,[0-9]{0,2})?$/;
export const REGEX_DISTANCE_KM = /^[0-9]{0,5}(\,[0-9]{0,3})?$/;

export const checkTokenRenderiza = (dispatch: any, history: any) => {
  let result = false;
  if (userIsLogged('@INPERA:token')) {
    result = true;
  } else {
    result = false;
    dispatch(
      abrirMensagem({
        open: true,
        mensagem: 'Sessão Expirada, faça o login =D',
        tipo: TipoMensagem.ERRO,
      }),
    );
    history.push('/');
  }
  return result;
};

export const validacaoTokenJWT = (token: string, chave: string) => {
  if (token) {
    try {
      const decodedToken: any = jwt.verify(
        token,
        `${process.env.REACT_APP_JWT_PRIVATE_KEY}`,
      );

      let tokenExpirado = false;

      if (decodedToken.exp) {
        tokenExpirado = Date.now() >= decodedToken.exp * 1000;
      }

      if (tokenExpirado) {
        // localStorage.removeItem('@INPERA:token');
        localStorage.removeItem(chave);
      } else if (chave === '@INPERA:token_adm') {
        localStorage.removeItem('@INPERA:token');
      }

      return !tokenExpirado && decodedToken !== undefined;
    } catch (error) {
      // localStorage.removeItem('@INPERA:token');
      localStorage.removeItem(chave);
      return false;
    }
  } else {
    return false;
  }
};

export const userIsLogged = (caminhoToken: string) => {
  const token = localStorage.getItem(caminhoToken);

  if (!token) return false;

  return validacaoTokenJWT(token, caminhoToken);
};

export const CriptoAssinatura = (value: string) => {
  if (value) {
    return CryptoJS.AES.encrypt(
      value,
      `${process.env.REACT_APP_CRYPTO_PRIVATE_KEY}`,
    ).toString();
  }
};

export const desCryptoJS = (value: any) => {
  if (value && value.length > 0) {
    return CryptoJS.AES.decrypt(
      value,
      `${process.env.REACT_APP_CRYPTO_PRIVATE_KEY}`,
    ).toString(CryptoJS.enc.Utf8);
  }

  return null;
};

// export const descriptData = (value: any) => {
//   if (value && typeof value === 'string' && value.length > 0) {
//     return CryptoJS.AES.decrypt(
//       value.toString(),
//       `${process.env.REACT_APP_CRYPTO_PRIVATE_KEY}`,
//     ).toString(CryptoJS.enc.Utf8);
//   }
//   return null;
// };

export const descriptData = (texto: any) => {
  if (texto && (texto !== '' || texto !== null || texto !== undefined)) {
    try {
      const bytes = CryptoJS.AES.decrypt(
        texto,
        `${process.env.REACT_APP_CRYPTO_PRIVATE_KEY}`,
      );
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedText || texto; // Se não for descriptografado com êxito, retorna o texto original
    } catch (error) {
      // Se ocorrer um erro na descriptografia, retorne o texto original
      return texto;
    }
  }
  return null;
};

// export function Decrypt(word, key = 'share') {
//   let decData = CryptoJS.enc.Base64.parse(word).toString(CryptoJS.enc.Utf8);
//   let bytes = CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8);
//   return JSON.parse(bytes);
// }

export const validarItensCarrinho_UsuarioLogado = (
  usuarioLogado: boolean,
  carrinho: any,
  dispatch: any,
) => {
  if (usuarioLogado && carrinho.length > 0) {
    return true;
  } else {
    if (!usuarioLogado) {
      dispatch(
        abrirMensagem({
          open: true,
          mensagem:
            'Rota não permitida, faça o login para acessar essa página.',
          tipo: TipoMensagem.INFO,
        }),
      );

      return false;
    } else if (carrinho.length <= 0) {
      dispatch(
        abrirMensagem({
          open: true,
          mensagem:
            'Rota não permitida, não existem itens no carrinho para acessar essa página.',
          tipo: TipoMensagem.INFO,
        }),
      );

      return false;
    }
  }
};

export const validTokenAdministracao = () => {
  const tokenAdm = localStorage.getItem('@INPERA:token_adm');

  if (tokenAdm && userIsLogged('@INPERA:token_adm')) {
    return true;
  }
  return false;
};

export const orderAscVenda = (a: any, b: any) => {
  if (a.numero < b.numero) return 1;
  if (a.numero > b.numero) return -1;
  return 0;
};

export const dataLocal = (tz: any, data: Date = new Date()) => {
  let timezone: any;

  if (!isNumber(tz) || !tz) {
    timezone = offsetOf('America/Sao_Paulo');
  } else {
    timezone = tz;
  }

  const tzValue = isNumber(timezone) ? timezone : offsetOf(timezone);
  return subHours(data, tzValue / 60);
};

export const formataCondicionais = (condicionais: any) => {
  if (isEmpty(condicionais)) {
    return [];
  }

  const listaInicial = Object.values(condicionais);
  const itensSimples = listaInicial.filter((f: any) => f.idCondicional);
  const itensCompostos = listaInicial.filter((f: any) => !f.idCondicional);

  let flat: any = [];
  if (itensCompostos.length > 0) {
    const data = itensCompostos.map((item: any) => Object.values(item));
    flat = flatMap(data);
  }

  return [...itensSimples, ...flat];
};

export const isPromocaoValida = (dataInicial: any, dataFinal: any) => {
  if (dataInicial && dataFinal) {
    const datai = moment(dataInicial);
    const dataf = moment(dataFinal).hours(23).minutes(59).minutes(59);
    const hoje = moment();
    return hoje >= datai && hoje <= dataf;
  }
  return false;
};

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
  NULL = 'NULL',
}

export const searchCep = async (valorDigitado: any, dispatch: any) => {
  const { data } = await apiCEP.get(
    `https://viacep.com.br/ws/${valorDigitado}/json/`,
  );

  if (data.erro) {
    dispatch(
      abrirMensagem({
        open: true,
        mensagem: 'CEP não localizado na base dos correios!',
        tipo: TipoMensagem.ERRO,
      }),
    );
    // return data;
    // throw new Error('CEP não localizado na base dos correios!');
  }
  return data;
};

export const regexHour = /^(?:([01]?\d|2[0-3]):([0-5]?\d))$/;

export const validarHora = (value: any) => {
  let semMascara = '';
  if (value) {
    if (regexHour.test(value)) return true;
    semMascara = value.replace(/[\:|_]/g, '');
    if (semMascara === '') return true;
  }
  if (value === '' || semMascara === '') return true;
  if (value === null || semMascara === null) return true;
  return false;
};

export const validCharacters = (value: any) => {
  if (value && value !== null && value !== undefined) {
    const words = value.replace(/(\r\n|\n|\r)/gm, ' ').split(' ');
    if (words) {
      for (let letters of words) {
        while (letters.length > 28) {
          return false;
        }
      }
    } else {
      return true;
    }
  }
  return true;
};

export const validarCPF = (cpf: any) => {
  // Elimina CPFs invalidos conhecidos
  if (
    cpf == '00000000000' ||
    cpf == '11111111111' ||
    cpf == '22222222222' ||
    cpf == '33333333333' ||
    cpf == '44444444444' ||
    cpf == '55555555555' ||
    cpf == '66666666666' ||
    cpf == '77777777777' ||
    cpf == '88888888888' ||
    cpf == '99999999999'
  ) {
    return false;
  }

  // Valida 1o digito
  let add = 0;

  for (let i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let rev = 11 - (add % 11);

  if (rev == 10 || rev == 11) {
    rev = 0;
  }

  if (rev != parseInt(cpf.charAt(9))) {
    return false;
  }

  // Valida 2o digito
  add = 0;

  for (let i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i)) * (11 - i);
  }

  rev = 11 - (add % 11);

  if (rev == 10 || rev == 11) {
    rev = 0;
  }

  if (rev != parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
};

export const validarCNPJ = (cnpj: any) => {
  if (
    cnpj == '00000000000000' ||
    cnpj == '11111111111111' ||
    cnpj == '22222222222222' ||
    cnpj == '33333333333333' ||
    cnpj == '44444444444444' ||
    cnpj == '55555555555555' ||
    cnpj == '66666666666666' ||
    cnpj == '77777777777777' ||
    cnpj == '88888888888888' ||
    cnpj == '99999999999999'
  ) {
    return false;
  }

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) {
    return false;
  }

  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) {
    return false;
  }
  return true;
};

export const urlBase64ToUint8Array = (base64String: string) => {
  var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const dataConvert = (data: Date | undefined): string => {
  if (
    typeof data === 'object' &&
    data !== null &&
    'getDate' in data &&
    'getMonth' in data &&
    'getFullYear' in data
  ) {
    return `${String(data.getDate()).padStart(2, '0')}/${String(
      data.getMonth() + 1,
    ).padStart(2, '0')}/${data.getFullYear()}`;
  } else {
    return '';
  }
};

export const hourConvert = (data: Date | undefined): string => {
  if (data) {
    return `${String(data.getHours()).padStart(2, '0')}:${String(
      data.getMinutes(),
    ).padStart(2, '0')}`;
  } else {
    return '';
  }
};

export const randomColors = (cbState: any) => {
  const color: string[] = [
    '#F9D255',
    '#DBAA4B',
    '#DB854B',
    '#F97F55',
    '#8A46F2',
    '#77F292',
    '#1F7AA6',
    '#5EC2F2',
    '#6BF2D5',
    '#3041A6',
    '#526AF2',
    '#E852F2',
    '#37BFA2',
  ];

  // for (let index = 0; index < maxColors; index++) {
  //   color.push('#' + Math.floor(Math.random() * 16777215).toString(16));
  // }

  // if (color.length === 0) {
  //   color.push(initialColor);
  // }

  cbState(color);
};

export const getNextStatusByOrder = (
  actualStatus: Order,
  field: string,
  order: any,
  setOrder: any,
  orderByOne = false,
) => {
  let result: any;
  if (actualStatus === Order.NULL) {
    result = { field, status: Order.DESC };
  } else if (actualStatus === Order.DESC) {
    result = { field, status: Order.ASC };
  } else {
    result = { status: Order.NULL };
  }
  const idx = order.findIndex((el: any) => el.field === field);

  if (orderByOne) {
    setOrder(() => {
      if (result.status === Order.NULL) {
        return [];
      } else {
        return [result];
      }
    });
  } else {
    if (idx >= 0) {
      setOrder((prev: any) => {
        if (result.status === Order.NULL) {
          return prev.filter((el: any) => el.field !== field);
        } else {
          const data = prev;
          data[idx] = result;
          return [...data];
        }
      });
    } else {
      setOrder((prev: any) => [...prev, result]);
    }
  }

  return result;
};

export const getMaiorOrdemProducao = (itens: any) => {
  let ordens = [];
  for (let item of itens) {
    if (item.hasOwnProperty('data')) {
      for (let info of item.data) ordens.push(info.ordemProducao);
    } else {
      ordens.push(item.ordemProducao);
    }
  }

  if (ordens.length === 0) return 0;

  return Math.max(...ordens);
};

export const formatarDataSimples = (data: Date, exibirHora = false) => {
  if (exibirHora) {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const DATA_INICIAL = (data?: Date) => {
  const dataInicial = data ? data : new Date();
  return new Date(
    new Date(
      dataInicial.getFullYear(),
      dataInicial.getMonth(),
      dataInicial.getDate(),
      0,
      0,
      0,
      0,
    ),
  );
};

export const DATA_FINAL = (data?: Date) => {
  const dataFinal = data ? data : new Date();

  return new Date(
    dataFinal.getFullYear(),
    dataFinal.getMonth(),
    dataFinal.getDate(),
    23,
    59,
    59,
    999,
  );
};

// faz um reduce
export const getReduceValue = (value: string | number, dataSource: any) => {
  const reduce =
    dataSource &&
    dataSource.length > 0 &&
    dataSource.reduce((accum: number, el: any) => {
      return parseFloat(accum + el[`${value}`]);
    }, 0);
  return isNaN(reduce) ? '0' : Number(reduce);
};

// pega o valor e transforma em porcentagem somando todos os anteriores (em um reduce)
export const getValueInPercentageReduced = (
  nameData: any,
  dataSource?: any,
) => {
  if (dataSource) {
    const textValue = nameData.split('.'); // 0: [item], 1: [nameContent]
    const returnNewData = dataSource.reduce((accum: number, el: any) => {
      return parseFloat(accum + el[`${textValue[1]}`]);
    }, 0);
    return isNaN(returnNewData) ? '0' : formatValueDecimal(returnNewData, 3);
  }
};

// pega o valor e transforma em porcentagem ( só para listagem )
export const getValueInPercentage = (nameData: any) => {
  if (isNaN(nameData)) return 0;
  return nameData >= 100
    ? (parseFloat(nameData) / 100) * 100
    : (parseFloat(nameData) / 100) * 100;
};

export const formatValueDecimal = (value: any, decimalPlaces = 2) => {
  return parseFloat(Number(value).toFixed(decimalPlaces));
};

export const currectlyPageVisions = (
  subPages: any,
  origemAtual: String,
  paginaAtual?: boolean,
) => {
  let currectlyPage = 0;
  const pageSaved = subPages.find((item: any) => item.origem === origemAtual);
  if (pageSaved && pageSaved.origem !== '') {
    if (paginaAtual) {
      currectlyPage = pageSaved.page - 1;
    } else {
      currectlyPage = pageSaved.page;
    }
  }

  return currectlyPage;
};

export const clearItemsChecked = (refCheckBox: any) => {
  if (refCheckBox && refCheckBox.current) {
    refCheckBox.current.checked = false;
  }
};

export const validarValor = (value: string | undefined) => {
  if (!value) return false;
  if (value === '0,00') return true;
  if (VALOR_REGEX.test(value)) return true;
  return false;
};

export const validCardapio = (licenca: any) => {
  if (licenca && licenca.length > 0) {
    const licencaDelivery = licenca.some((e: any) => e.codigoLiberado === 23);
    const licencaCardapio = licenca.some((e: any) => e.codigoLiberado === 22);

    if (licencaCardapio) {
      if (!licencaDelivery) {
        return true;
      }
      return false;
    }
  }
};

export const checkAllLicenca = (licencas: any, dispatch: any) => {
  if (licencas && licencas.length > 0) {
    const dataAtual = Date.parse(String(new Date()));

    licencas.forEach((dt: any) => {
      const dataLicenca = Date.parse(String(new Date(dt.ultimaLiberacao)));

      if (dataAtual > dataLicenca) {
        dispatch(
          abrirMensagem({
            mensagem:
              'Licenças expiradas, entre em contato com seu represetante por favor',
            tipo: TipoMensagem.INFO,
            open: true,
          }),
        );
      }
    });
  }
};

export const licencasExpiradas = (empresaLicencas: any): Boolean => {
  let value = false;
  if (empresaLicencas && Object.keys(empresaLicencas).length > 0) {
    if (empresaLicencas.licencas && empresaLicencas.licencas.length > 0) {
      empresaLicencas.licencas.forEach((dt: any) => {
        const data = new Date();
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();

        const dataAtual = Date.parse(String(new Date(`${ano}/${mes}/${dia}`)));

        const dataConvert = dt.ultimaLiberacao.split('-');

        const dataLicenca = Date.parse(
          String(
            new Date(`${dataConvert[0]}/${dataConvert[1]}/${dataConvert[2]}`),
          ),
        );

        if (dataAtual > dataLicenca) {
          value = true;
        } else {
          value = false;
        }
      });
    }
  }
  return value;
};

export function verificaCaracteresEspeciais(texto: string): boolean {
  const caracteresEspeciais = [
    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    ',',
    '.',
    ';',
    ':',
    '&',
    '*',
    '(',
    ')',
    '_',
    '-',
  ];

  const regex = /^$|^[\p{L}\p{N}\p{P}\p{Zs}]+$/u;
  // const numberRegex = /[0-9]+/g;
  // const emojiRegex = /[!@#$%^,.:;&*()_\-0-9a-zA-Z]\p{Emoji}/;

  if (!regex.test(texto)) {
    return false;
  }

  for (let i = 0; i < texto.length - 1; i++) {
    const charAtual = texto[i];
    const charSeguinte = texto[i + 1];

    if (
      caracteresEspeciais.includes(charAtual) &&
      caracteresEspeciais.includes(charSeguinte)
    ) {
      return false;
    }
    if (charAtual === ' ' && caracteresEspeciais.includes(charSeguinte)) {
      return false;
    }
  }

  return true;
}

export function transformaString(string: string): string {
  const palavras: string[] = string.toLowerCase().split(' ');
  let novaString: string = palavras[0];

  for (let i = 1; i < palavras.length; i++) {
    const palavra: string = palavras[i];
    novaString += palavra.charAt(0).toUpperCase() + palavra.slice(1);
  }

  return novaString
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\./g, '');
}

export function removerAcentos(texto: string): string {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function validateArrayLength(array: any[]): boolean {
  return array && array.length > 0;
}

export const statusColorReturn = (status: Status) => {
  switch (status) {
    case Status.ABERTO:
      return StatusColorReturn.ABERTO;
    case Status.PRODUCAO:
      return StatusColorReturn.PRODUCAO;
    case Status.ENTREGA:
      return StatusColorReturn.ENTREGA;
    case Status.FINALIZADO:
      return StatusColorReturn.FINALIZADO;
    case Status.EM_RECEBIMENTO:
      return StatusColorReturn.EM_RECEBIMENTO;
    case Status.A_PAGAR:
      return StatusColorReturn.A_PAGAR;
    case Status.CANCELADO:
      return StatusColorReturn.CANCELADO;
    case Status.INCONSISTENCIA:
      return StatusColorReturn.INCONSISTENCIA;
    default:
      return yellowMainColor;
  }
};

export const isEncoded = (text: string) => {
  const regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
  return regex.test(text);
};

export const dataAtual = (local: string = '', parse: boolean = false) => {
  let dataAtualObj = undefined;
  if (local !== '') {
    const dataAtual = new Date().toLocaleString('en-US', {
      timeZone: local,
    });
    dataAtualObj = new Date(dataAtual);
  } else {
    dataAtualObj = new Date();
  }

  const dia = String(dataAtualObj.getDate()).padStart(2, '0');
  const mes = String(dataAtualObj.getMonth() + 1).padStart(2, '0');
  const ano = dataAtualObj.getFullYear();

  const dataFormatada = parse
    ? Date.parse(String(new Date(`${ano}/${mes}/${dia}`)))
    : new Date(`${ano}/${mes}/${dia}`);

  return dataFormatada;
};

export const getDataInicial = (data?: Date) => {
  const dataInicial = data ? new Date(data) : new Date();

  const dia = String(dataInicial.getDate()).padStart(2, '0');
  const mes = String(dataInicial.getMonth() + 1).padStart(2, '0');
  const ano = dataInicial.getFullYear();

  const dtInicialFormat = `${ano}-${mes}-${dia}`;

  return dtInicialFormat;
};

export const getDataFinal = (data?: Date) => {
  const dataFinal = data ? new Date(data) : new Date();

  const dia = String(dataFinal.getDate()).padStart(2, '0');
  const mes = String(dataFinal.getMonth() + 1).padStart(2, '0');
  const ano = dataFinal.getFullYear();

  const dtFinalFormat = `${ano}-${mes}-${dia}`;

  return dtFinalFormat;
};

export const isEncrypted = (input: string) => {
  try {
    const resultadoDecodificacao = CryptoJS.enc.Base64.parse(input).toString(
      CryptoJS.enc.Utf8,
    );

    if (
      typeof resultadoDecodificacao === 'string' &&
      resultadoDecodificacao.length > 0
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const paginacaoAplicativos = (array: []) => {
  const chunkedArrays = [];

  for (let i = 0; i < array.length; i += 10) {
    const chunk = array.slice(i, i + 10);
    chunkedArrays.push(chunk);
  }

  return chunkedArrays;
};

export const formatDateForOS = (data: string) => {
  return DateTime.fromISO(data).toFormat('HH:mm');
};

export const toast = (dispatch: any, msg: string, tipo?: TipoMensagem) => {
  return dispatch(
    abrirMensagem({
      open: true,
      mensagem: msg,
      tipo: tipo ? tipo : TipoMensagem.SUCESSO,
    }),
  );
};
