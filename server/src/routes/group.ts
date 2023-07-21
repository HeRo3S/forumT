import { Router } from 'express';
import {
  CreateGroupController,
  GetGroupInfo,
  GetGroupPostsController,
  SearchGroupsController,
} from '../controllers/group.controller.js';
import {
  BanUsersFromGroupModController,
  CheckModeratorMiddleware,
  GetUsersFollowGroupModController,
} from '../controllers/moderator.controller.js';
import {
  CheckUserFollowingGroup,
  CreateUserFollowingGroup,
  DeleteUserFollowingGroup,
} from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/jwt.js';

const groupRoute = Router();

// NOTE: Unauthorize controller
groupRoute.get('/search', SearchGroupsController);
groupRoute.get('/:groupname', GetGroupInfo);
groupRoute.get('/:groupname/posts', GetGroupPostsController);

// NOTE: User controller
groupRoute.post('/create', authenticateToken, CreateGroupController);
groupRoute.get(
  '/:groupname/follow',
  authenticateToken,
  CheckUserFollowingGroup
);
groupRoute.post(
  '/:groupname/follow',
  authenticateToken,
  CreateUserFollowingGroup
);
groupRoute.post(
  '/:groupname/unfollow',
  authenticateToken,
  DeleteUserFollowingGroup
);
// NOTE: Moderator controller
groupRoute.get(
  '/:groupname/mod/users',
  [authenticateToken, CheckModeratorMiddleware],
  GetUsersFollowGroupModController
);
groupRoute.post(
  `/:groupname/mod/ban`,
  [authenticateToken, CheckModeratorMiddleware],
  BanUsersFromGroupModController
);
export default groupRoute;
