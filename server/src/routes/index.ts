import { Router } from 'express';
import authRoute from './auth.js';
import groupRoute from './group.js';
import { authenticateToken } from '../middleware/jwt.js';

const routesListWithoutJWT = [{ path: '/auth', router: authRoute }];
const routesListWithJWT = [{ path: '/g', router: groupRoute }];
const routes = Router();

routesListWithoutJWT.forEach((route) => {
  routes.use(route.path, route.router);
});
routes.use(authenticateToken);
routesListWithJWT.forEach((route) => {
  routes.use(route.path, route.router);
});

export default routes;
