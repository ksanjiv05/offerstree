import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../../theme/ThemeContext';
import styleSheet from './styles';
import {LocationIcon, SettingsIcon} from '../../../assets/icons';
import Space from '../../atoms/space';
import TextButton from '../../atoms/button';
import {Text} from '../../atoms/text/Text';
import {AirbnbRating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StoreViewCard = ({text = '', location = ''}) => {
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

//store_email
//store_contact_number
//logo
//founder
//is_active

export const StoreCard = ({
  title = '',
  store_contact_number = '',
  logo = '',
  founder = '',
  onPress,
  is_active = 1,
}) => {
  const theme = useTheme();
  const styles = styleSheet(theme);
  return (
    <View style={styles.container}>
      <View style={styles.rowConatiner}>
        <View style={styles.pic}>
          <Image source={{uri: logo}} style={styles.pic} />
        </View>
        <View style={{paddingLeft: 10}}>
          <Text style={styles.title}>{title}</Text>
          <Text style={{color: theme.colors.gray5}}>{founder}</Text>
        </View>
      </View>

      <Space height={5} />
      <View
        style={[styles.rowSpaceBetween, {alignItems: 'center', height: 50}]}>
        <View style={{alignItems: 'flex-start', marginRight: 15}}>
          <TouchableOpacity>
            <Icon name="phone" size={25} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignItems: 'flex-start', marginRight: 15}}>
          <Text style={styles.title}>{store_contact_number}</Text>
        </View>

        <View>
          <TextButton
            buttonStyle={{height: 45, width: 70}}
            labelButton="View"
            onPress={onPress}
          />
        </View>
      </View>
    </View>
  );
};

export default StoreViewCard;
