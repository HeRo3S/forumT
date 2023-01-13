import { Router } from 'express';
import {
  PostLoginController,
  PostRegisterController,
} from '../controllers/auth.controller.js';

const authRoute = Router();

// Create + Update account
authRoute.post('/register', PostRegisterController);
//Login account
authRoute.post('/login', PostLoginController);
// Delete

export default authRoute;
