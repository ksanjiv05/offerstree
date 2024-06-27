import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';
import {getItem, setItem} from '../utils/storage';
import Loader from '../screens/loader/Loader';
import axios from 'axios';

const Stack = createNativeStackNavigator();
type Props = {};

const Routes = ({}: Props) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loader, setLoader] = React.useState(true);
  const checkAuth = async () => {
    const expiry = await getItem('expiresIn');
    console.log('exp-- ', expiry, expiry < new Date().getTime());
    if (expiry < new Date().getTime()) {
      setIsAuthenticated(false);
      setItem('expiresIn', 0);
      setItem('token', '');
       setLoader(false);
      return;
    }
    const token = await getItem('token');
    if (token) {
      setIsAuthenticated(true);
     
    }
    setLoader(false);
  };
  React.useEffect(() => {
    checkAuth();
  }, []);
  if (loader) {
    return <Loader />;
  }
  console.log('is auth ', isAuthenticated);
  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'offer-explore' : 'login'}>
      {routes.map((route, index) => {
        return (
          <Stack.Screen
            key={index}
            name={route.name}
            component={route.component}
            options={{
              headerShown: false,
            }}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default Routes;
