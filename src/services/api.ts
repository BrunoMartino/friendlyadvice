import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
});

export const apiCEP = axios.create({
  baseURL: `https://viacep.com.br/ws/`,
});

export const apiEmissor = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_FISCAL}`,
});

export const apiFidelidade = axios.create({
  baseURL:
    `${process.env.REACT_APP_ENV}` === 'DEV'
      ? `${process.env.REACT_APP_API_FIDELIDADE_DEV}`
      : `${process.env.REACT_APP_API_FIDELIDADE}`,
});

export const apiGenerica = axios.create({
  baseURL: `${process.env.REACT_APP_API_GENERICA}`,
});

export default api;
