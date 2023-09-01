import { Router } from 'express';
import { authenticateToken } from '../../middleware/jwt.js';
import { CheckModeratorMiddleware } from '../../controllers/moderator.controller.js';
import {
  CreatePostReportsControllers,
  GetPostReportsControllers,
} from '../../controllers/postReport.controller.js';

const postReportRoute = Router({ mergeParams: true });

postReportRoute.get(
  '/',
  [authenticateToken, CheckModeratorMiddleware],
  GetPostReportsControllers
);

postReportRoute.post('/', authenticateToken, CreatePostReportsControllers);

export default postReportRoute;
