import { Router } from 'express';
import {
  CreateGroupPostController,
  GetPostCommentsController,
  GetPostController,
  ReactPostController,
} from '../controllers/post.controller.js';
import { authenticateToken } from '../middleware/jwt.js';

const postRoute = Router({ mergeParams: true });

postRoute.post('/create', authenticateToken, CreateGroupPostController);
postRoute.get('/:postID', GetPostController);
postRoute.post('/:postID/react', authenticateToken, ReactPostController);
postRoute.get('/:postID/comments', GetPostCommentsController);

export default postRoute;
