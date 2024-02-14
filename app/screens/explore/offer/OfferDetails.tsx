import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '../../../theme/ThemeContext';
import styleSheet from './styles';
import {IdleIcon, LocationIcon} from '../../../assets/icons';
import Space from '../../../components/atoms/space';
import Divider from '../../../components/atoms/divider';
import {AirbnbRating} from 'react-native-ratings';
import TextButton from '../../../components/atoms/button';

const OfferDetails = () => {
  const theme = useTheme();
  const styles = styleSheet(theme);
  return (
    <View style={styles.container}>
      <View style={styles.rowConatiner}>
        <View style={styles.pic} />
        <View style={{paddingLeft: 15}}>
          <Text style={styles.title}>Store Name</Text>
          <Text style={{color: theme.colors.green}}>Category</Text>
        </View>
      </View>
      <Space height={15} />
      <View style={styles.rowAlignmentCenter}>
        <View style={{transform: [{scale: 0.7}]}}>
          <LocationIcon color="gray" />
        </View>
        <Text style={{color: theme.colors.green}}>
          90 foot Kankarbagh, Patna - 800020
        </Text>
      </View>
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

        <Text style={styles.text}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover... 
        </Text>
      </View>
      <Space height={25} />
      <View style={styles.rowAlignmentCenter}>
        <View>
          <IdleIcon color={theme.colors.green} />
        </View>
        <Text style={styles.textM}>Expires on </Text>
        <Text style={styles.textBlueM}>20-feb-2024</Text>
      </View>
      <Space height={10} />
      <View style={styles.rowAlignmentCenter}>
        <View>
          <IdleIcon color={theme.colors.green} />
        </View>
        <Text style={styles.textBlueM}>Flat</Text>
        <Text style={styles.textM}>discount type</Text>

      </View>
      <Space height={10} />

      <View style={styles.rowAlignmentCenter}>
        <View>
          <IdleIcon color={theme.colors.green} />
        </View>
        <Text style={styles.textBlueM}>Flat of 200.0</Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <TextButton
          buttonStyle={{height: 55}}
          labelButton="Grab the Offer"
          labelButtonStyle={{fontSize: 25}}
        />
      </View>
    </View>
  );
};

export default OfferDetails;
