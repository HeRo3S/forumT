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

export default groupRoute;
