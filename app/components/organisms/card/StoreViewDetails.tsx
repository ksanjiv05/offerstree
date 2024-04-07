import {View} from 'react-native';
import React from 'react';
import {useTheme} from '../../../theme/ThemeContext';
import styleSheet from './styles';
import Space from '../../atoms/space';
import {Text} from '../../atoms/text/Text';

const TextCard = ({title = '', text = ''}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 24,
        alignItems: 'center',
      }}>
      <Text style={[{fontSize: 17, fontWeight: 'bold', color: '#fff'}]}>
        {title}:{' '}
      </Text>
      <Text style={{fontSize: 17, color: '#fff'}}>{text??"N/A"}</Text>
    </View>
  );
};

const StoreViewDetailsCard = ({
  description = '',
  founder = '',
  address,
  store_email = '',
  store_name = '',
  store_contact_number = '',
  founding_date = '',
  website_url = '',
  title= '',
}) => {
  const theme = useTheme();
  const styles = styleSheet(theme);
  return (
    <View style={[{flex: 1, backgroundColor: '#000000', padding: 10}]}>
      <View style={styles.rowConatiner}>
        <View style={styles.pic} />
        <View style={{paddingLeft: 10}}>
          <Text style={[styles.title, {color: '#fff'}]}>{title}</Text>
          <Text style={{color: theme.colors.gray5}}>Category</Text>
        </View>
      </View>
      <Space height={5} />
      <View style={{marginLeft: 10}}>
        <TextCard text={store_email} title="Email" />
        <TextCard text={store_contact_number} title="Contact Number" />
        <TextCard text={founder} title="Founder" />
        <TextCard text={address?.state} title="Founding Location" />
        <TextCard text={founding_date} title="Date of incorporated" />
        <TextCard text={website_url} title="website" />

        <Space height={15} />
        <Text style={[styles.title, {color: theme.colors.green}]}>Address</Text>
        <Space height={5} />
        <Text style={{color: theme.colors.white}}>
          {`${address?.address} ${address?.landmark} ${address?.city}`}
        </Text>
        <Text style={{color: theme.colors.white}}>
          {`${address?.state} ${address?.country} ${address?.postal_code}`}
        </Text>

        <Space height={15} />
        <Text style={[styles.title, {color: theme.colors.green}]}>
          Description
        </Text>
        <Space height={5} />
        <Text style={{color: theme.colors.white}}>{description}</Text>

        <Space height={15} />
        <Text style={[styles.title, {color: theme.colors.green}]}>Gallery</Text>
        <Space height={5} />
      </View>
    </View>
  );
};

export default StoreViewDetailsCard;
