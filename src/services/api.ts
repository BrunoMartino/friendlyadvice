import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
});

export const apiCEP = axios.create({
  baseURL: `https://viacep.com.br/ws/`,
});

export const apiGenerica = axios.create({
  baseURL: `${process.env.REACT_APP_API_GENERICA}`,
});

export default api;
