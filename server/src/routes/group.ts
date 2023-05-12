import { Router } from 'express';
import {
  CreateGroupController,
  GetGroupInfo,
  GetGroupPostsController,
  SearchGroupsController,
} from '../controllers/group.controller.js';
import {
  GetGroupsUserFollowingController,
  GetGroupsUserModeratingController,
  CheckUserFollowingGroup,
  CreateUserFollowingGroup,
  DeleteUserFollowingGroup,
} from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/jwt.js';

const groupRoute = Router();

groupRoute.post('/create', authenticateToken, CreateGroupController);
// search?keyword=''
groupRoute.get('/search', SearchGroupsController);
groupRoute.get(
  '/following',
  authenticateToken,
  GetGroupsUserFollowingController
);
groupRoute.get(
  '/moderating',
  authenticateToken,
  GetGroupsUserModeratingController
);

groupRoute.get('/:groupname', GetGroupInfo);
groupRoute.get('/:groupname/posts', GetGroupPostsController);

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
export default groupRoute;
