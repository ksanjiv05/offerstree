import {View, Text, FlatList, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';
import {OfferCard} from '../../../components/organisms/card/OfferViewCard';
import {useNavigation} from '@react-navigation/native';

const OfferCardList = ({offers}) => {
  console.log('offers',JSON.stringify(offers[0]));
  const navigation = useNavigation();
  return (
    <FlatList
      data={offers}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('offer-details', item)}>
          <OfferCard offer={item} />
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default OfferCardList;
