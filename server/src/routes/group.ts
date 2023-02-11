import { Router } from 'express';
import {
  CreateGroupController,
  GetGroupPostsController,
  GetGroupsUserFollowingController,
  SearchGroupsController,
} from '../controllers/group.controller.js';
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
groupRoute.get('/:groupname/', GetGroupPostsController);

export default groupRoute;
