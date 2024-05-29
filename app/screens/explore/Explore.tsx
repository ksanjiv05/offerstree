import {View, Text, DrawerLayoutAndroid, StyleSheet, Image} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import Category from '../../components/molecules/category/Category';
import Input from '../../components/atoms/input';
import {SearchIcon} from '../../assets/icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import OfferCardList from './offer/OfferCardList';
import ExploreMap from './map/ExploreMap';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getOfferCategories, getOffers} from '../../apis/offer';
import Space from '../../components/atoms/space';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import Filter from './filter/Filter';
import Geolocation from '@react-native-community/geolocation';
import {privateNavigation} from '../../utils/private.navigation';
import Profile from '../profile/Profile';
import {Drawer} from 'react-native-drawer-layout';

const defaultCategory = {
  id: 0,
  name: 'All',
};

const Explore = ({navigation}) => {
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
      console.log('total offers', response.data?.data?.offers.length);
      setOffers(response.data?.data?.offers);
      setFilteredOffers(response.data?.data?.offers);
      return true;
    } catch (error) {
      console.error(error);
      return false;
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
    bottomSheetModalRef.current?.close();
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

  const handleRefresh = () => {
    return fetchOffers({});
  };
  // const drawer = useRef<DrawerLayoutAndroid>(null);
  const [open, setOpen] = React.useState(false);

  const closeDrawer = () => {
    setOpen(false);
  };
  const navigationView = () => (
    <View style={{flex: 1}}>
      <Profile closeDrawer={closeDrawer} />
    </View>
  );
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
            onDrawerClose={() => {
              console.log('drawer closed');
            }}
            onDrawerOpen={() => {
              console.log('drawer open');
            }}
            renderNavigationView={navigationView}> */}
          <Drawer
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            renderDrawerContent={navigationView}>
            <View style={styles.searchCon}>
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={{
                  marginRight: 10,
                }}>
                <Image
                  source={undefined}
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#fff',
                    borderRadius: 45,
                  }}
                />
              </TouchableOpacity>
              <View style={{flex: 1}}>
                <Input
                  placeholder="Search"
                  inputContainerStyle={{
                    width: '100%',
                    height: 45,
                  }}
                  onChange={text => onChange('search', text)}
                  appendComponent={
                    <SearchIcon onPress={() => fetchOffers(filter)} />
                  }
                />
              </View>
            </View>
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
            <OfferCardList
              handleRefresh={handleRefresh}
              offers={filteredOffers}
            />
            <TouchableOpacity
              onPress={() => privateNavigation(navigation, 'offer-create', {})}
              style={styles.createBtn}>
              <Icon name="plus" size={30} color="#fff" />
            </TouchableOpacity>
            {/* </DrawerLayoutAndroid> */}
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}>
              <View style={{flex: 1}}>
                <Filter onFilter={onFilter} />
              </View>
            </BottomSheetModal>
          </Drawer>
          {/* </DrawerLayoutAndroid> */}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchCon: {
    flex: 1,
    maxHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
  },
  createBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#000000',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Explore;
