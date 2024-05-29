import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import {useTheme} from '../../../theme/ThemeContext';
import styleSheet from './styles';
import MapView, {Marker} from 'react-native-maps';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getStores} from '../../../apis/store';
import Geolocation from '@react-native-community/geolocation';
import {storeIcon} from '../../../assets/icons';
import StoreViewDetailsCard from '../../../components/organisms/card/StoreViewDetails';
import {ScrollView} from 'react-native-gesture-handler';
import TextButton from '../../../components/atoms/button';

const ExploreMap = ({onBackPress}) => {
  const theme = useTheme();
  const styles = styleSheet(theme);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [stores, setStores] = React.useState([]);
  const [selectedStore, setSelectedStore] = React.useState({});
  const [userLocation, setUserLocation] = React.useState({
    latitude: 25.588214,
    longitude: 85.163143,
  });

  // variables
  const snapPoints = useMemo(() => ['60%'], []);

  // callbacks
  const handlePresentModalPress = useCallback((store: any) => {
    setSelectedStore(store);
    bottomSheetModalRef.current?.present();
  }, []);

  React.useEffect(() => {
    // handlePresentModalPress();
  }, [handlePresentModalPress]);

  const fetchStors = async () => {
    const res = await getStores({});
    if (res.status === 200) setStores(res.data.data.stores);
  };

  React.useEffect(() => {
    fetchStors();
  }, []);

  React.useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('position', position);
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.log('error', error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  //25.588214, 85.163143
  return (
    <View style={styles.container}>
      <MapView
        style={{...StyleSheet.absoluteFillObject}}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}>
        {stores.map((store: any, index) => {
          console.log('store', {
            latitude: parseFloat(store.address.lat),
            longitude: parseFloat(store.address.lng),
          });
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(store.address.lat),
                longitude: parseFloat(store.address.lng),
              }}
              onPress={() => handlePresentModalPress(store)}>
              <Image source={storeIcon} />
            </Marker>
          );
        })}
      </MapView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}>
        <ScrollView>
          <StoreViewDetailsCard {...selectedStore} />
          <TextButton labelButton="Listed Offers" onPress={() => {}} />
        </ScrollView>
      </BottomSheetModal>
      <TouchableOpacity style={styles.backIcon} onPress={onBackPress}>
        <Icon name="keyboard-backspace" size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default ExploreMap;
