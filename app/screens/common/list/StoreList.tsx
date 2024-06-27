import {View, FlatList} from 'react-native';
import React from 'react';
import {StoreCard} from '../../../components/organisms/card/StoreViewCard';
import {getStores} from '../../../apis/store';

const StoreList = ({navigation}: any) => {
  const [stores, setStores] = React.useState([]);

  const getStoresOfUser = async () => {
    try {
      const res = await getStores({});
      console.log(res.data.data.stores.data[0]);
      if (res.status === 200) {
        setStores(res.data.data.stores.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getStoresOfUser();
  }, []);
  return (
    <View>
      <FlatList
        data={stores}
        renderItem={({item}: any) => (
          <StoreCard
            title={item.title}
            onPress={() => navigation.navigate('store-view', {store: item})}
            store_contact_number={item.store_contact_number}
            logo={item.logo}
            founder={item.founder}
            is_active={item.is_active}
          />
        )}
        keyExtractor={item => item?.id.toString()}
      />
    </View>
  );
};

export default StoreList;
