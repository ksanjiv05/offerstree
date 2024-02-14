import Login from '../screens/auth/Login.tsx';
import Register from '../screens/auth/Register.tsx';
import Enroll from '../screens/store/enroll/Enroll.tsx';
import Profile from '../screens/profile/Profile.tsx';
import CreateOffer from '../screens/offer/CreateOffer.tsx';
import OfferView from '../screens/explore/offer/OfferView.tsx';

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
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/offer-create',
    name: 'offer-create',
    component: CreateOffer,
  },
  {
    path: '/offer-view',
    name: 'offer-view',
    component: OfferView,
  },
];

export default routes;
