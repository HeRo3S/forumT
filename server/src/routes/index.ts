import { Router } from 'express';
import authRoute from './auth.js';
import groupRoute from './group.js';
import postRoute from './post.js';

const routesList = [
  { path: '/auth', router: authRoute },
  { path: '/g', router: groupRoute },
  { path: '/g/:groupname/post', router: postRoute },
];
const routes = Router();

routesList.forEach((route) => {
  routes.use(route.path, route.router);
});

export default routes;
