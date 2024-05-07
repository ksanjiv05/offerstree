import {View, Text, DrawerLayoutAndroid, Button} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import Category from '../../components/molecules/category/Category';
import Input from '../../components/atoms/input';
import {SearchIcon} from '../../assets/icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import OfferCardList from './offer/OfferCardList';
import ExploreMap from './map/ExploreMap';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getOfferCategories, getOffers} from '../../apis/offer';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import Space from '../../components/atoms/space';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import Filter from './filter/Filter';
import Geolocation from '@react-native-community/geolocation';

const defaultCategory = {
  id: 0,
  name: 'All',
};

const Explore = () => {
  const [categories, setCategories] = React.useState([]);
  const [mapView, setMapView] = React.useState(false);
  const [offers, setOffers] = React.useState([]);
  const [filteredOffers, setFilteredOffers] = React.useState([]);
  const [currentLocation, setCurrentLocation] = React.useState({});

  const fetchCategories = async () => {
    try {
      const response = await getOfferCategories({});
      console.log('response', response.data?.data?.categories);
      setCategories(response.data?.data?.categories);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOffers = async (filterObj: any) => {
    try {
      const response = await getOffers(filterObj);
      console.log(
        'offer response',
        JSON.stringify(response.data?.data?.offers),
      );
      setOffers(response.data?.data?.offers);
      setFilteredOffers(response.data?.data?.offers);
    } catch (error) {
      console.error(error);
    }
  };

  // React.useEffect(() => {
  //   fetchCategories();
  //   fetchOffers({});
  // }, []);

  const onCategorySelect = (category: any) => {
    console.log('category', category);
    if (category.id === 0) {
      setFilteredOffers(offers);
      return;
    }
    const filteredOffersById = offers.filter((offer: any) => {
      return offer.offer_category.id === category.id;
    });
    setFilteredOffers(filteredOffersById);
  };

  const [filter, setFilter] = React.useState({});

  const onChange = (key: string, value: string) => {
    setFilter({...filter, [key]: value});
  };

  // const drawer = useRef<DrawerLayoutAndroid>(null);
  // const navigationView = () => (
  //   <View
  //     style={{
  //       flex: 1,
  //       padding: 16,
  //       backgroundColor: '#ecf0f1',
  //     }}>
  //     <Text>Filter</Text>
  //     <Space height={25} />
  //     <Button
  //       title="Close drawer"
  //       onPress={() => drawer.current?.closeDrawer()}
  //     />
  //   </View>
  // );

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['70%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const onFilter = (filterObj: any) => {
    console.log('filterObj', filterObj);
    fetchOffers({
      ...filterObj,
      lat: currentLocation.current_lat,
      lng: currentLocation.current_lng,
    });
  };

  React.useEffect(() => {
    fetchCategories();
    Geolocation.getCurrentPosition(info => {
      console.log(info);
      setCurrentLocation({
        current_lat: info.coords.latitude.toString(),
        current_lng: info.coords.longitude.toString(),
      });
      fetchOffers({
        current_lat: info.coords.latitude.toString(),
        current_lng: info.coords.longitude.toString(),
      });
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#000000'}}>
      {mapView ? (
        <ExploreMap onBackPress={() => setMapView(false)} />
      ) : (
        <>
          {/* <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition="left"
            renderNavigationView={navigationView}> */}
          <Input
            placeholder="Search"
            onChange={text => onChange('search', text)}
            appendComponent={<SearchIcon onPress={() => fetchOffers(filter)} />}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={handlePresentModalPress}>
              <Text style={{color: '#fff', fontSize: 25, marginRight: 7}}>
                Filter
              </Text>
              <Icon name="filter" size={25} color="#fff" />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <Icon name="home" size={25} color="#fff" /> */}
              <TouchableOpacity
                onPress={() => setMapView(true)}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: '#fff', fontSize: 25, marginRight: 7}}>
                  Stores
                </Text>
                <Icon name="map" size={25} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          <Category
            isDefaultCategory={false}
            categories={[defaultCategory, ...categories]}
            onCategorySelect={onCategorySelect}
          />
          <OfferCardList offers={filteredOffers} />
          {/* </DrawerLayoutAndroid> */}
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}>
            <View style={{flex: 1}}>
              <Filter onFilter={onFilter} />
            </View>
          </BottomSheetModal>
        </>
      )}
    </View>
  );
};

export default Explore;
