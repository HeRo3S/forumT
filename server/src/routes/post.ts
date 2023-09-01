import { Router } from 'express';
import { GetPostController } from '../controllers/post.controller.js';
import {
  CreateGroupPostController,
  DeleteGroupPostController,
  GetUserPostReactController,
  PostReactController,
} from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/jwt.js';
import { CheckIfUserHasBeenBlocked } from '../controllers/group.controller.js';

const postRoute = Router({ mergeParams: true });

postRoute.post(
  '/create',
  [authenticateToken, CheckIfUserHasBeenBlocked],
  CreateGroupPostController
);
postRoute.get('/:postID', GetPostController);
postRoute.get('/:postID/react', authenticateToken, GetUserPostReactController);
postRoute.post(
  '/:postID/react',
  [authenticateToken, CheckIfUserHasBeenBlocked],
  PostReactController
);
postRoute.post('/:postID/delete', authenticateToken, DeleteGroupPostController);

export default postRoute;
