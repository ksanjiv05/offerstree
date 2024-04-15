import {View, Text, Touchable} from 'react-native';
import React from 'react';
import Category from '../../components/molecules/category/Category';
import {getCategories} from '../../apis/category';
import Input from '../../components/atoms/input';
import {SearchIcon} from '../../assets/icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import OfferView from './offer/OfferView';
import OfferCardList from './offer/OfferCardList';
import ExploreMap from './map/ExploreMap';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../components/molecules/header/Header';
import {getOffers} from '../../apis/offer';

const Explore = () => {
  const [categories, setCategories] = React.useState([]);
  const [mapView, setMapView] = React.useState(false);
  const [offers, setOffers] = React.useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      console.log('response', response.data?.data?.categories);
      setCategories(response.data?.data?.categories);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOffers = async () => {
    try {
      const response = await getOffers({});
      console.log('offer response', JSON.stringify(response.data?.data?.offers));
      setOffers(response.data?.data?.offers);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchCategories();
    fetchOffers();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#000000'}}>
      {mapView ? (
        <ExploreMap onBackPress={() => setMapView(false)} />
      ) : (
        <>
          <Input placeholder="Search" appendComponent={<SearchIcon />} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#fff', fontSize: 25, marginRight: 7}}>
                Filter
              </Text>
              <Icon name="filter" size={25} color="#fff" />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <Icon name="home" size={25} color="#fff" /> */}
              <TouchableOpacity onPress={() => setMapView(true)}>
                <Icon name="map" size={25} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          <Category categories={categories} />
          <OfferCardList offers={offers} />
        </>
      )}
    </View>
  );
};

export default Explore;
