import {View, Text, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import React from 'react';
import {useTheme} from '../../../theme/ThemeContext';
import styleSheet from './styles';
import {IdleIcon, LocationIcon} from '../../../assets/icons';
import Space from '../../../components/atoms/space';
import Divider from '../../../components/atoms/divider';
import {AirbnbRating} from 'react-native-ratings';
import TextButton from '../../../components/atoms/button';
import moment from 'moment';
import {addToWishList} from '../../../apis/offer';
import {Linking} from 'react-native';
import { getItem } from '../../../utils/storage';

const OfferDetails = ({route,navigation}) => {
  const theme = useTheme();
  const styles = styleSheet(theme);

  const offerDetails = route.params;
  const {
    color = null,
    created_at = '2024-04-03T05:12:46.000000Z',
    description = null,
    discount_amount = '88.00',
    discount_type = 'value',
    end_date = '2028-03-03',
    grabe_code = 'oipu',
    id = -1,
    is_active = 1,
    max_discount_amount = '999.00',
    min_purchase_amount = '55.00',
    offer_category = null,
    percentage_value = '10.00',
    start_date = '2024-04-04',
    store_id = 3,
    title = 'offer2',
    total_quantity = 70,
    updated_at = '2024-04-12T08:01:31.000000Z',
    used_quantity = 0,
    store = null,
  } = offerDetails;

  const grabOffer = async (id: number) => {
    try {
      const token = await getItem('token');
      if (!token) {
        ToastAndroid.show('Please login to grab offer', ToastAndroid.SHORT);
        navigation.navigate('login');
        return;
      }
      await addToWishList({offer_id: id});
      ToastAndroid.show('Offer added to wishlist', ToastAndroid.SHORT);
    } catch (error) {
      console.log('error', error);
    }
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.rowConatiner}>
        <View style={styles.pic}>
          <Image source={{uri: store?.logo}} style={styles.pic} />
        </View>
        <View style={{paddingLeft: 15}}>
          <Text style={styles.title}>{title}</Text>
          <Text style={{color: theme.colors.green}}>
            {offer_category?.name}
          </Text>
        </View>
      </View>
      <Space height={15} />
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            `google.navigation:q=${store?.address?.city} ${store?.address?.state} ${store?.address?.country}-${store?.address?.postal_code}`,
          )
        }
        style={styles.rowAlignmentCenter}>
        <View style={{transform: [{scale: 0.5}]}}>
          <LocationIcon color="gray" />
        </View>
        <Text style={{color: theme.colors.green, fontSize: 17}}>
          {store.address
            ? `${store?.address?.city} ${store?.address?.state} ${store?.address?.country}-${store?.address?.postal_code}`
            : 'N/A'}
        </Text>
      </TouchableOpacity>
      <Space height={15} />
      <View style={{alignItems: 'flex-start'}}>
        <AirbnbRating showRating={false} size={25} />
      </View>
      <Space height={20} />

      <Divider height={2} color={theme.colors.green} />
      <Space height={20} />

      <View>
        <Text style={styles.htitle}>Offer title</Text>
        <Space height={10} />

        <Text style={styles.text}>{description ? description : 'N/A'}</Text>
      </View>
      <Space height={25} />
      <View style={styles.rowAlignmentCenter}>
        <View>
          <IdleIcon color={theme.colors.green} />
        </View>
        <Text style={styles.textM}>Expires on </Text>
        <Text style={styles.textBlueM}>
          {moment(end_date).format('DD-MM-YYYY')}
        </Text>
      </View>
      <Space height={10} />
      {percentage_value > 0 && (
        <>
          <View style={styles.rowAlignmentCenter}>
            <View>
              <IdleIcon color={theme.colors.green} />
            </View>
            <Text style={styles.textBlueM}>discount</Text>
            <Text style={styles.textM}> {percentage_value}%</Text>
          </View>
          <Space height={10} />
        </>
      )}

      <View style={styles.rowAlignmentCenter}>
        <View>
          <IdleIcon color={theme.colors.green} />
        </View>
        <Text style={styles.textBlueM}>
          {percentage_value > 0
            ? `Max discount ${max_discount_amount}`
            : `Discount ${discount_amount}`}
        </Text>
      </View>
      <Space height={10} />
      <View style={styles.rowAlignmentCenter}>
        <View>
          <IdleIcon color={theme.colors.green} />
        </View>
        <Text style={styles.textBlueM}>Min Purchase {min_purchase_amount}</Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <TextButton
          buttonStyle={{height: 55}}
          labelButton="Add to wishlist"
          labelButtonStyle={{fontSize: 25}}
          onPress={() => grabOffer(id)}
        />
      </View>
    </View>
  );
};

export default OfferDetails;
