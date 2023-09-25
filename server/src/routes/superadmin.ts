import { Router } from 'express';
import {
  CheckSuperAdminMiddleware,
  GetAllGroupsController,
} from '../controllers/superadmin.controller.js';
import { authenticateToken } from '../middleware/jwt.js';

const superAdminRoute = Router({});

superAdminRoute.use([authenticateToken, CheckSuperAdminMiddleware]);

superAdminRoute.get('/groups/list', GetAllGroupsController);

export default superAdminRoute;
