import { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:5000',
  timeout: 1000,
  withCredentials: true,
};

export default axiosConfig;
