import { Router } from 'express';
import authRoute from './auth.js';
import commentRoute from './subRoute_post/comment.js';
import groupRoute from './group.js';
import postRoute from './post.js';
import attachmentRoute from './subRoute_post/attachment.js';
import userRoute from './user.js';
import postReportRoute from './subRoute_post/report.js';
import homeRoute from './home.js';
import moderatorRoute from './subRoute_group/moderator.js';
import superAdminRoute from './superadmin.js';

const routesList = [
  { path: '/home', router: homeRoute },
  { path: '/auth', router: authRoute },
  // *: User related
  { path: '/u/:username', router: userRoute },
  // *: Super admin related
  { path: '/superadmin', router: superAdminRoute },
  // *: Group related
  { path: '/g', router: groupRoute },
  { path: '/g/:groupname/manage', router: moderatorRoute },
  // *: Post related
  { path: '/g/:groupname/post', router: postRoute },
  { path: '/g/:groupname/post/:postID/comment', router: commentRoute },
  { path: '/g/:groupname/post/:postID/report', router: postReportRoute },
  { path: '/upload', router: attachmentRoute },
];
const routes = Router();

routesList.forEach((route) => {
  routes.use(route.path, route.router);
});

export default routes;
