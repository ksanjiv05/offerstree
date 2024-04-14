import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {OfferCard} from '../../../components/organisms/card/OfferViewCard';
import {useNavigation} from '@react-navigation/native';

const OfferCardList = ({offers}) => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={offers}
      renderItem={({item}) => (
        <OfferCard
          offer={item}
          onPress={() => navigation.navigate('offer-details', item)}
        />
      )}
      keyExtractor={item => item.toString()}
    />
  );
};

export default OfferCardList;
