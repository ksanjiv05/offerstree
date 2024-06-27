import {View, StyleSheet, Image, FlatList, RefreshControl} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Drawer} from 'react-native-drawer-layout';
import {SearchIcon} from '../../../assets/icons';
import Input from '../../../components/atoms/input';
import Profile from '../Profile';
import {privateNavigation} from '../../../utils/private.navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getSellerStores} from '../../../apis/store';
import { StoreCard } from '../../../components/organisms/card/StoreViewCard';

const StoreListed = ({navigation}: any) => {
  const [stores, setStores] = React.useState([]);

  const fetchStores = async () => {
    try {
      const response = await getSellerStores({});
      setStores(response.data.data.stores);
      console.log("storse",response.data.data.stores )
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchStores();
  }, []);

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
    <View style={{flex: 1,backgroundColor:"#000"}}>
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        renderDrawerContent={navigationView}>
        <View style={styles.searchContainer}>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={styles.searchIconContainer}>
            <Image source={undefined} style={styles.profileIcon} />
          </TouchableOpacity>
          <View style={styles.searchInputContainer}>
            <Input
              placeholder="Search"
              inputContainerStyle={styles.searchInput}
              appendComponent={<SearchIcon />}
            />
          </View>
        </View>

        <View style={styles.storeListContainer}>
          <FlatList
            data={stores}
            renderItem={({item}) => (
              <TouchableOpacity >
                <StoreCard {...item} onPress={() => privateNavigation(navigation, 'store-view', {store: item})} />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>

        <TouchableOpacity
          onPress={() => privateNavigation(navigation, 'store-enroll', {})}
          style={styles.createButton}>
          <Icon name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      </Drawer>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    maxHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIconContainer: {
    marginRight: 10,
  },
  profileIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 45,
  },
  searchInputContainer: {
    flex: 1,
  },
  searchInput: {
    width: '100%',
    height: 45,
  },
  storeListContainer: {
    flex: 1,
    marginTop: 10,
  },
  storeItem: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    // backgroundColor: '#fff',
    borderColor:"#fff",
    borderWidth: 1,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StoreListed;
