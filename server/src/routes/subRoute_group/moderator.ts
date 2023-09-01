import { Router } from 'express';
import {
  BanUsersFromGroupModController,
  CheckModeratorMiddleware,
  GetUsersFollowGroupModController,
  HardDeletePost,
  RestoreDeletedPost,
  SoftDeleteGroupPost,
  UnbanUsersFromGroupController,
  UpdateGroupInfoController,
} from '../../controllers/moderator.controller.js';
import { authenticateToken } from '../../middleware/jwt.js';
import upload from '../../middleware/multer.js';

const moderatorRoute = Router({ mergeParams: true });

moderatorRoute.use([authenticateToken, CheckModeratorMiddleware]);

moderatorRoute.post(
  '/update',
  [upload.single('file')],
  UpdateGroupInfoController
);
moderatorRoute.get('/users/list', GetUsersFollowGroupModController);
moderatorRoute.post('/users/ban', BanUsersFromGroupModController);
moderatorRoute.post('/users/unban', UnbanUsersFromGroupController);
moderatorRoute.post('/posts/block', SoftDeleteGroupPost);
moderatorRoute.post('/posts/unblock', RestoreDeletedPost);
moderatorRoute.get('/posts/delete/:postID', HardDeletePost);

export default moderatorRoute;
