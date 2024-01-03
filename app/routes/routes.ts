import Login from '../screens/auth/Login.tsx';
import Register from '../screens/auth/Register.tsx';
import Enroll from '../screens/store/enroll/Enroll.tsx';

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
  {
    path: '/store-enroll',
    name: 'store-enroll',
    component: Enroll,
  },
];

export default routes;
