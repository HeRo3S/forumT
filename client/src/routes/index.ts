import DetailPost from '../pages/DetailPost';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/g/:groupID' },
  { path: '/g/:groupID/:postID', component: DetailPost },
  { path: '*', component: NotFound },
];

export default routes;
