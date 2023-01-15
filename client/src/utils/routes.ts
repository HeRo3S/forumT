import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';

const routes = [
  { path: '/', component: Home() },
  { path: '/login', component: Login() },
  { path: '/register', component: Register() },
  { path: '*', component: NotFound() },
];

export default routes;
