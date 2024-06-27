import {FlatList, TouchableOpacity, RefreshControl} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { OfferCard } from '../../../components/organisms/card/OfferViewCard';

const OfferCardList = ({offers, handleRefresh}: any) => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await handleRefresh();
    setRefreshing(false);
    // fetchOffers().then(() => setRefreshing(false));
  }, []);
  return (
    <FlatList
      data={offers}
      //pull to refresh
      refreshing={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({item}) => (
        <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate('offer-details', {offer: item?.offer})
          // }
          >
          <OfferCard offer={item} isWishListBtn={false} />
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default OfferCardList;
