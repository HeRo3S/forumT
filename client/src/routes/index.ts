import CreateGroup from '../pages/CreateGroup';
import CreatePost from '../pages/CreatePost';
import DetailPost from '../pages/DetailPost';
import EditPost from '../pages/EditPost';
import Group from '../pages/Group';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import SuperAdmin from '../pages/SuperAdmin';

interface RouteList {
  path: string;
  component: () => JSX.Element;
}

const normalRoutes: RouteList[] = [
  { path: '/', component: Home },
  { path: '/g/:groupname', component: Group },
  { path: '/g/:groupname/post/:postID', component: DetailPost },
  { path: '/u/:username', component: Profile },
  { path: '*', component: NotFound },
];

const authenticateRoutes: RouteList[] = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

const userRoutes: RouteList[] = [
  { path: '/create/post', component: CreatePost },
  { path: '/create/group', component: CreateGroup },
  { path: '/g/:groupname/post/:postID/edit', component: EditPost },
];

const superAdminRoutes: RouteList[] = [
  { path: '/admin', component: SuperAdmin },
];

const routes = {
  normalRoutes,
  authenticateRoutes,
  userRoutes,
  superAdminRoutes,
};

export default routes;
