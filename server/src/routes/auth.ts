import { Router } from 'express';
import {
  PostLoginController,
  PostRegisterController,
  HandleRefreshToken,
} from '../controllers/auth.controller.js';

const authRoute = Router();

authRoute.post('/register', PostRegisterController);
authRoute.post('/login', PostLoginController);
authRoute.get('/refreshToken', HandleRefreshToken);

export default authRoute;
