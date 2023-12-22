import { Router } from 'express';
import { GetPostController } from '../controllers/post.controller.js';
import {
  CreateGroupPostController,
  DeleteGroupPostController,
  GetUserPostReactController,
  PostReactController,
  UpdateGroupPostController,
} from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/jwt.js';
import {
  CheckIfGroupHasBeenBanned,
  CheckIfUserHasBeenBlocked,
} from '../controllers/group.controller.js';

const postRoute = Router({ mergeParams: true });

postRoute.post(
  '/create',
  [authenticateToken, CheckIfGroupHasBeenBanned, CheckIfUserHasBeenBlocked],
  CreateGroupPostController
);
postRoute.get('/:postID', GetPostController);
postRoute.get('/:postID/react', authenticateToken, GetUserPostReactController);
postRoute.post(
  '/:postID/react',
  [authenticateToken, CheckIfGroupHasBeenBanned, CheckIfUserHasBeenBlocked],
  PostReactController
);
postRoute.post(
  '/:postID/update',
  [authenticateToken, CheckIfGroupHasBeenBanned, CheckIfUserHasBeenBlocked],
  UpdateGroupPostController
);
postRoute.post('/:postID/delete', authenticateToken, DeleteGroupPostController);

export default postRoute;
