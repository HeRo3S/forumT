import { Router } from 'express';
import {
  CreateGroupPostController,
  GetGroupPostsController,
  GetPostCommentsController,
  ReactPostController,
} from '../controllers/post.controller.js';
import { authenticateToken } from '../middleware/jwt.js';

const postRoute = Router();

postRoute.get('/', GetGroupPostsController);
postRoute.post('/create', authenticateToken, CreateGroupPostController);
postRoute.post('/react', authenticateToken, ReactPostController);
postRoute.get('/comments', GetPostCommentsController);

export default postRoute;
