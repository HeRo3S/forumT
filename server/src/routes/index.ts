import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoute from './auth.js';
import commentRoute from './comment.js';
import groupRoute from './group.js';
import postRoute from './post.js';
import attachmentRoute from './attachment.js';

const routesList = [
  { path: '/auth', router: authRoute },
  { path: '/g', router: groupRoute },
  { path: '/g/:groupname/post', router: postRoute },
  { path: 'g/:groupname/post/:postID/comment', router: commentRoute },
  { path: '/upload', router: attachmentRoute },
];
const routes = Router();

routesList.forEach((route) => {
  routes.use(route.path, route.router);
});

export default routes;
