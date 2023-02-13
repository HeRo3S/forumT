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

// *checking if there is jwt in redux to add into the request
function loadAccessTokenIntoHeader(config: AxiosRequestConfig) {
  const { accessToken } = store.getState().auth;
  if (accessToken && config.headers)
    (config.headers as AxiosHeaders).set(
      'Authorization',
      `Bearer ${accessToken}`
    );
  return config;
}
// *sending refreshJWT request if req get 403 error
async function refreshJWT(error: AxiosError) {
  const { response, config } = error;
  const { status, data } = response as AxiosResponse;
  if (status === 403 && data?.name === 'TokenExpiredError') {
    try {
      const accessToken = await (store.dispatch as AppDispatch)(
        refreshAccessToken()
      ).unwrap();
      if (accessToken && config?.headers) {
        (config.headers as AxiosHeaders).set(
          'Authorization',
          `Bearer ${accessToken}`
        );
        instance.request(config);
      }
    } catch (err) {
      (store.dispatch as AppDispatch)(logout());
      throw err;
    }
  }
}

export default instance;
