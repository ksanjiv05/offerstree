import {View} from 'react-native';
import React from 'react';
import StoreViewDetailsCard from '../../../components/organisms/card/StoreViewDetails';

const StoreView = ({route}) => {
  console.log(route.params);
  const {store} = route.params;
  return <StoreViewDetailsCard {...store} />;
};

export default StoreView;
