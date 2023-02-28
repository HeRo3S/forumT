import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosHeaders,
  AxiosResponse,
} from 'axios';
import axiosConfig from '../config/axios';
import { logout, refreshAccessToken } from '../redux/features/authSlice';
import { AppDispatch } from '../redux/store';

let store: ToolkitStore;
export function injectStore(_store: ToolkitStore) {
  store = _store;
}

const instance = axios.create(axiosConfig);
instance.interceptors.request.use((config) =>
  loadAccessTokenIntoHeader(config)
);
instance.interceptors.response.use(
  (response) => response,
  (error) => refreshJWT(error)
);

function loadAccessTokenIntoHeader(config: AxiosRequestConfig) {
  const { accessToken } = store.getState().auth;
  if (accessToken && config.headers)
    (config.headers as AxiosHeaders).set(
      'Authorization',
      `Bearer ${accessToken}`
    );
  return config;
}

async function refreshJWT(error: AxiosError) {
  const { response, config } = error;
  const { status, data } = response as AxiosResponse;
  if (areRefreshConditionsMatch(status, data)) {
    try {
      await (store.dispatch as AppDispatch)(refreshAccessToken()).unwrap();
      if (config) {
        // *instance interceptor will load the new token
        return await instance.request(config);
      }
    } catch (err) {
      await (store.dispatch as AppDispatch)(logout());
      throw err;
    }
  }
  return Promise.reject(error);
}

function areRefreshConditionsMatch(status: number, data: any): boolean {
  return (
    (status === 403 && data?.name === 'TokenExpiredError') ||
    (status === 401 && data === 'Token not found')
  );
}

export default instance;
