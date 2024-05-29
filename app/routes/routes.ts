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
import Wishlist from '../screens/wishlist/Wishlist.tsx';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    isPrivate: false,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    isPrivate: false,
  },
  {
    path: '/store-enroll',
    name: 'store-enroll',
    component: Enroll,
    isPrivate: true,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    isPrivate: true,
  },
  {
    path: '/offer-create',
    name: 'offer-create',
    component: CreateOffer,
    isPrivate: true,
  },
  {
    path: '/store-list',
    name: 'store-list',
    component: StoreList,
    isPrivate: true,
  },
  {
    path: '/store-view',
    name: 'store-view',
    component: StoreView,
    isPrivate: true,
  },
  {
    path: '/offer-view',
    name: 'offer-view',
    component: OfferView,
    isPrivate: true,
  },
  {
    path: '/map',
    name: 'map',
    component: ExploreMap,
    isPrivate: false,
  },
  {
    path: '/offer-explore',
    name: 'offer-explore',
    component: Explore,
    isPrivate: false,
  },
  {
    path: '/offer-details',
    name: 'offer-details',
    component: OfferDetails,
    isPrivate: false,
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: Wishlist,
    isPrivate: true,
  },
];

export default routes;
