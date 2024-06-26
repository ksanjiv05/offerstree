import React from 'react';
import {ScrollView, View} from 'react-native';
import CustomImagePicker from '../../components/organisms/imagePicker';
import SelectInput from '../../components/atoms/select';
import FormInput from '../../components/atoms/input';
import Space from '../../components/atoms/space';
import TextButton from '../../components/atoms/button';
import {useTheme} from '../../theme/ThemeContext';
import styleSheet from './styles';
import {Text} from '../../components/atoms/text/Text';
import {privateNavigation} from '../../utils/private.navigation';
import {useNavigation} from '@react-navigation/native';
import {getItem} from '../../utils/storage';

const Profile = ({closeDrawer}) => {
  const theme = useTheme();
  const styles = styleSheet(theme);
  const [user, setUser] = React.useState({});

  const getUser = async () => {
    const userData = await getItem('user');
    console.log('user', userData);
    setUser(userData);
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.container,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      <ScrollView style={{paddingHorizontal: 10}}>
        <View style={{height: 250, justifyContent: 'center'}}>
          <View style={styles.pic}></View>
        </View>
        <Text style={{color: '#fff', fontSize: 22, textAlign: 'center'}}>
          {user?.name}
        </Text>
        <Text style={{color: '#fff', textAlign: 'center'}}>{user?.email}</Text>
        <Space height={20} />
        <Space height={20} />
        <TextButton
          buttonStyle={{backgroundColor: '#0000004a'}}
          onPress={() => {
            closeDrawer();
            navigation.navigate('offer-explore');
          }}
          labelButton="home"
        />
        <TextButton
          buttonStyle={{backgroundColor: '#0000004a'}}
          onPress={() => {}}
          labelButton="edit profile"
        />
        <TextButton
          buttonStyle={{backgroundColor: '#0000004a'}}
          onPress={() => {
            closeDrawer();
            privateNavigation(navigation, 'wishlist', {});
          }}
          labelButton="wishlist"
        />

        <TextButton
          buttonStyle={{backgroundColor: '#0000004a'}}
          onPress={() => {
            closeDrawer();
            privateNavigation(navigation, 'listed', {});
          }}
          labelButton="Your offers"
        />
        <TextButton
          buttonStyle={{backgroundColor: '#0000004a'}}
          onPress={() => {
            closeDrawer();
            privateNavigation(navigation, 'store-listed', {});
          }}
          labelButton="Your stores"
        />
        <Space height={20} />
      </ScrollView>
      <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
        <View style={{flex: 1}}>
          <TextButton onPress={() => {}} labelButton="Logout" />
        </View>
      </View>
    </View>
  );
};

export default Profile;
