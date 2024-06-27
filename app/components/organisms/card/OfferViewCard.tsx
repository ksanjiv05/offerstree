import {Image, ToastAndroid, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../../theme/ThemeContext';
import styleSheet from './styles';
import {LocationIcon} from '../../../assets/icons';
import Space from '../../atoms/space';
import TextButton from '../../atoms/button';
import {Text} from '../../atoms/text/Text';
import {AirbnbRating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';
import {addToWishList, removeToWishList} from '../../../apis/offer';
import {s} from 'react-native-size-matters';
import {getItem} from '../../../utils/storage';
import {useNavigation} from '@react-navigation/native';

const OfferViewCard = ({text = '', location = ''}) => {
  const theme = useTheme();
  const styles = styleSheet(theme);
  return (
    <View style={styles.container}>
      <View style={styles.rowConatiner}>
        <View style={styles.pic} />
        <View style={{paddingLeft: 10}}>
          <Text style={styles.title}>Store Name</Text>
          <Text style={{color: theme.colors.gray5}}>Category</Text>
        </View>
      </View>
      <Space height={5} />
      <View>
        <Text>{text}</Text>
      </View>
      <Space height={5} />

      <View style={styles.rowAlignmentCenter}>
        <View style={{transform: [{scale: 0.7}]}}>
          <LocationIcon color="red" />
        </View>
        <Text>{location}</Text>
      </View>
      <Space height={5} />
      <View style={styles.rowSpaceBetween}>
        <View>
          <AirbnbRating showRating={false} size={25} />
        </View>
        <View style={styles.btn}>
          <TextButton buttonStyle={{height: 35}} labelButton="View Offer" />
        </View>
      </View>
    </View>
  );
};

// it is used in app/screens/explore/offer/OfferCardList.tsx
export const OfferCard = ({offer,isWishListBtn=true}: any) => {
  const theme = useTheme();
  const styles = styleSheet(theme);
  const {
    title,
    grabe_code,
    percentage_value,
    offer_banner_url = '',
    offer_category,
    wishlisted = null,
    
  } = offer;

  const [wishlist, setWishlist] = React.useState(wishlisted ? true : false);
  const {navigation} = useNavigation();

  const grabOffer = async (id: number) => {
    try {
      const token = await getItem('token');
      if (!token) {
        ToastAndroid.show('Please login to grab offer', ToastAndroid.SHORT);
        navigation.navigate('login');

        return;
      }
      if (wishlist) {
        setWishlist(false);
        await removeToWishList({offer_id: id});
        return;
      }

      setWishlist(true);
      await addToWishList({offer_id: id});
    } catch (error) {
      console.log('error', error);
      setWishlist(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowConatiner}>
        <View style={styles.pic} />
        <View style={{paddingLeft: 10, flex: 1}}>
          <Text style={styles.title}>{title}</Text>
          <Text style={{color: theme.colors.gray5}}>
            {offer_category?.name}
          </Text>
        </View>
        <View
          style={{
            width: 60,
            height: 50,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Icon name="star" color={theme.colors.gold} size={20} />
          <Text
            style={{color: theme.colors.green, fontSize: 20, marginLeft: 5}}>
            4.5
          </Text>
        </View>
      </View>

      <Space height={5} />
      {offer_banner_url === null || offer_banner_url === '' ? (
        <View
          style={[styles.rowSpaceBetween, {alignItems: 'center', height: 50}]}>
          <View style={styles.offTextContainer}>
            <Text style={[styles.title, {textTransform: 'uppercase'}]}>
              {grabe_code}
            </Text>
            <Text style={styles.offText}>OFF {percentage_value}%</Text>
          </View>
          {/* <View style={{flex: 1, alignItems: 'flex-end', marginRight: 15}}>
            <TouchableOpacity>
              <SettingsIcon />
            </TouchableOpacity>
          </View>
          <View>
            <TextButton
              buttonStyle={{height: 45, width: 70}}
              labelButton="View"
              // onPress={onPress}
            />
          </View> */}
        </View>
      ) : (
        <View
          style={{
            height: 200,
            width: '100%',
            backgroundColor: theme.colors.gray1,
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <Image
            source={{uri: offer_banner_url}}
            style={{width: '100%', height: 200}}
            resizeMode="contain"
          />
        </View>
      )}

      {isWishListBtn&&<TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 0,
          right: 10,
          width: 60,
          height: 50,
          alignItems: 'center',
        }}
        onPress={() => grabOffer(offer.id)}>
        <Icon
          name="heart"
          color={wishlist ? theme.colors.red : theme.colors.gray5}
          size={30}
        />
      </TouchableOpacity>}
    </View>
  );
};

export default OfferViewCard;
