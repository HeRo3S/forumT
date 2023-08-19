import { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 10000,
  withCredentials: true,
};

export default axiosConfig;
