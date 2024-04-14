import Login from '../screens/auth/Login.tsx';
import Register from '../screens/auth/Register.tsx';
import Enroll from '../screens/store/enroll/Enroll.tsx';
import Profile from '../screens/profile/Profile.tsx';
import CreateOffer from '../screens/offer/CreateOffer.tsx';
import OfferView from '../screens/explore/offer/OfferView.tsx';
import ExploreMap from '../screens/explore/map/ExploreMap.tsx';
import OfferExplore from '../screens/explore/store/OfferView.tsx';
import StoreList from '../screens/common/list/StoreList.tsx';
import StoreView from '../screens/common/details/StoreView.tsx';
import Explore from '../screens/explore/Explore.tsx';
import OfferDetails from '../screens/explore/offer/OfferDetails.tsx';

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
    path: '/store-list',
    name: 'store-list',
    component: StoreList,
  },
  {
    path: '/store-view',
    name: 'store-view',
    component: StoreView,
  },
  {
    path: '/offer-view',
    name: 'offer-view',
    component: OfferView,
  },
  {
    path: '/map',
    name: 'map',
    component: ExploreMap,
  },
  {
    path: '/offer-explore',
    name: 'offer-explore',
    component: Explore,
  },
  {
    path: '/offer-details',
    name: 'offer-details',
    component: OfferDetails,
  },
];

export default routes;
