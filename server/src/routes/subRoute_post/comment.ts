import { Router } from 'express';
import {
  GetPostCommentsController,
  PostCommentController,
} from '../../controllers/comment.controller.js';
import { authenticateToken } from '../../middleware/jwt.js';

const commentRoute = Router({ mergeParams: true });
commentRoute.get('/', GetPostCommentsController);
commentRoute.post('/', authenticateToken, PostCommentController);

export default commentRoute;
