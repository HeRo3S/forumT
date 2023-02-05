import { Router } from 'express';
import {
  CreateGroupController,
  GetAllGroupsExistedController,
} from '../controllers/group.controller.js';

const groupRoute = Router();

groupRoute.post('/create', CreateGroupController);
groupRoute.get('/', GetAllGroupsExistedController);

export default groupRoute;
