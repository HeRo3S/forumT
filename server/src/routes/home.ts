import { Router } from 'express';
import {
  GetHomePagePostsGuestController,
  GetHomePagePostsUserController,
} from '../controllers/post.controller.js';
import { authenticateToken } from '../middleware/jwt.js';

const homeRoute = Router();

homeRoute.get('/posts/user', authenticateToken, GetHomePagePostsUserController);
homeRoute.get('/posts/guest', GetHomePagePostsGuestController);

export default homeRoute;
