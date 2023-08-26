import axios, { AxiosError, AxiosResponse } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL; 
const client = axios.create({ baseURL });

client.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => { 
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return Promise.reject(error);
    } 

    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export default client;
