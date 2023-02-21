import axios from 'axios';
import axiosConfig from '../config/axios';
import { ReqUser } from '../../types/interfaces/reqAPI';
import { ResUser } from '../../types/interfaces/resAPI';

const authInstance = axios.create(axiosConfig);

async function login(props: ReqUser): Promise<ResUser> {
  const res = await authInstance.post('/auth/login', props);
  return res.data;
}

async function register(props: ReqUser): Promise<ResUser> {
  const res = await authInstance.post('/auth/register', props);
  return res.data;
}

async function refreshAccessToken(): Promise<{ accessToken: string }> {
  const res = await authInstance.get('/auth/refreshToken');
  return res.data;
}

async function logout(): Promise<unknown> {
  const res = await authInstance.get('/logout');
  return res.data;
}

const AuthService = {
  login,
  register,
  refreshAccessToken,
  logout,
};

export default AuthService;
