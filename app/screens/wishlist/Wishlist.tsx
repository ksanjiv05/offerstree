import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import Input from '../../components/atoms/input';
import {SearchIcon} from '../../assets/icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import OfferCardList from './OfferCardList';

import {TouchableOpacity} from 'react-native-gesture-handler';

import Profile from '../profile/Profile';
import {Drawer} from 'react-native-drawer-layout';
import {getWishList} from '../../apis/wishlist';

const Wishlist = ({navigation}) => {
  const [offers, setOffers] = React.useState([]);
//   const [filteredOffers, setFilteredOffers] = React.useState([]);

  const fetchOffers = async (filterObj: any) => {
    try {
      const response = await getWishList(filterObj);
      console.log('total offers--',JSON.stringify(response.data?.data.offers));
      setOffers(response.data?.data?.offers);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  React.useEffect(() => {
    fetchOffers({});
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
              //   onChange={text => onChange('search', text)}
              appendComponent={
                <SearchIcon
                // onPress={() => fetchOffers(filter)}
                />
              }
            />
          </View>
        </View>

        <OfferCardList handleRefresh={handleRefresh} offers={offers} />
      </Drawer>
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

export default Wishlist;
