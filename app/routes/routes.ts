import Login from '../screens/auth/Login.tsx';
import Register from '../screens/auth/Register.tsx';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
];

export default routes;
