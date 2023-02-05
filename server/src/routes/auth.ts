import { Router } from 'express';
import {
  PostLoginController,
  PostRegisterController,
} from '../controllers/auth.controller.js';

const authRoute = Router();

authRoute.post('/register', PostRegisterController);
authRoute.post('/login', PostLoginController);

export default authRoute;
