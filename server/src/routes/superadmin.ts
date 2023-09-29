import { Router } from 'express';
import {
  BlockGroupController,
  CheckSuperAdminMiddleware,
  GetAllGroupsController,
  UnBlockGroupController,
} from '../controllers/superadmin.controller.js';
import { authenticateToken } from '../middleware/jwt.js';

const superAdminRoute = Router({});

superAdminRoute.use([authenticateToken, CheckSuperAdminMiddleware]);

superAdminRoute.get('/groups/list', GetAllGroupsController);
superAdminRoute.post('/groups/ban', BlockGroupController);
superAdminRoute.post('/groups/unban', UnBlockGroupController);

export default superAdminRoute;
