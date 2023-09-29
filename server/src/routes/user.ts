import { Router } from 'express';
import {
  GetGroupsUserFollowingController,
  GetGroupsUserModeratingController,
  GetProfileController,
  GetUserPostsController,
  GetUsersCommentsController,
  UpdateProfileController,
} from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/jwt.js';
import upload from '../middleware/multer.js';

const userRoute = Router({ mergeParams: true });

userRoute.get('/', GetProfileController);

userRoute.post(
  '/update/info',
  [authenticateToken, upload.single('file')],
  UpdateProfileController
);

userRoute.get('/posts', GetUserPostsController);

userRoute.get('/comments', GetUsersCommentsController);

userRoute.get('/following', GetGroupsUserFollowingController);

userRoute.get('/moderating', GetGroupsUserModeratingController);

export default userRoute;
