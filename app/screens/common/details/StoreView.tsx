import React from 'react';
import StoreViewDetailsCard from '../../../components/organisms/card/StoreViewDetails';

const StoreView = ({route}: any) => {
  console.log(route.params);
  const {store} = route.params;
  return <StoreViewDetailsCard {...store} />;
};

export default StoreView;
