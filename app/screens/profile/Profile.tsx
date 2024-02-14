import React from 'react';
import {ScrollView, View} from 'react-native';
import CustomImagePicker from '../../components/organisms/imagePicker';
import SelectInput from '../../components/atoms/select';
import FormInput from '../../components/atoms/input';
import Space from '../../components/atoms/space';
import TextButton from '../../components/atoms/button';
import {useTheme} from '../../theme/ThemeContext';
import styleSheet from './styles';

const Profile = () => {
  const theme = useTheme();
  const styles = styleSheet(theme);

  return (
    <View style={styles.container}>
      <ScrollView style={{paddingHorizontal: 10}}>
        <View
          style={{height: 250, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.pic}>
            <CustomImagePicker />
          </View>
        </View>
        <FormInput placeholder="Full Name" />
        <Space height={20} />
        <SelectInput placeholder="Email" />
        <Space height={20} />
        <FormInput placeholder="Phone number " />
        <Space height={20} />
        <FormInput placeholder="Username" />
        <Space height={20} />
      </ScrollView>
      <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
        <View style={{flex: 1}}>
          <TextButton onPress={() => {}} labelButton="Next" />
        </View>
      </View>
    </View>
  );
};

export default Profile;
