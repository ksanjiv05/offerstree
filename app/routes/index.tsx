import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';

const Stack = createNativeStackNavigator();
type Props = {};

const Routes = ({}: Props) => {
  return (
    <Stack.Navigator initialRouteName="register">
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
