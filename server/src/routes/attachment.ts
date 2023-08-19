import { Router } from 'express';
import UploadController from '../controllers/attachment.controller.js';
import { authenticateToken } from '../middleware/jwt.js';
import upload from '../middleware/multer.js';

const attachmentRoute = Router();

attachmentRoute.post(
  '/',
  [authenticateToken, upload.single('file')],
  UploadController
);

export default attachmentRoute;
