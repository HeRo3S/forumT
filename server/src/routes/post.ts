import { Router } from 'express';
import {
  CreateGroupPostController,
  GetPostController,
  GetUserPostReactController,
  PostReactController,
} from '../controllers/post.controller.js';
import { authenticateToken } from '../middleware/jwt.js';

const postRoute = Router({ mergeParams: true });

postRoute.post('/create', authenticateToken, CreateGroupPostController);
postRoute.get('/:postID', GetPostController);
postRoute.get('/:postID/react', authenticateToken, GetUserPostReactController);
postRoute.post('/:postID/react', authenticateToken, PostReactController);

export default postRoute;
