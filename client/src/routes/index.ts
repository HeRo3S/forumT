import CreatePost from '../pages/CreatePost';
import DetailPost from '../pages/DetailPost';
import Group from '../pages/Group';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/g/:groupname', component: Group },
  { path: '/g/:groupname/post/:postID', component: DetailPost },
  { path: '/create/post', component: CreatePost },
  { path: '*', component: NotFound },
];

export default routes;
