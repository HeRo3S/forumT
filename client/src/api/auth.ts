import instance from '.';
import { ReqUser } from '../utils/interfaces/reqAPI';
import { ResUser } from '../utils/interfaces/resAPI';

async function login(props: ReqUser): Promise<ResUser> {
  const res = await instance.post('/auth/login', props);
  return res.data;
}

async function register(props: ReqUser): Promise<ResUser> {
  const res = await instance.post('/auth/register', props);
  return res.data;
}

const AuthService = {
  login,
  register,
};

export default AuthService;
