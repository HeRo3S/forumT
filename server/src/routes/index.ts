import { Router } from 'express';
import authRoute from './auth.js';

const routesList = [{ path: '/auth', router: authRoute }];
const routes = Router();

routesList.map((route) => {
  routes.use(route.path, route.router);
});

export default routes;
