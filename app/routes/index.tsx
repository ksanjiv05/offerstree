import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';
import {getItem} from '../utils/storage';
import Loader from '../screens/loader/Loader';
import axios from 'axios';


const Stack = createNativeStackNavigator();
type Props = {};

const Routes = ({}: Props) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loader, setLoader] = React.useState(true);
  const checkAuth = async () => {
    const token = await getItem('token');
    console.log('token', token);
    if (token) {
      setIsAuthenticated(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoader(false);
  };
  React.useEffect(() => {
    checkAuth();
  }, []);
  if (loader) {
    return <Loader />;
  }
  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'store-enroll' : 'login'}>
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
