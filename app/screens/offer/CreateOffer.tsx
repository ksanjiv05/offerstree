import {View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../../theme/ThemeContext';
import styleSheet from './styles';
import FormInput, { ButtonInput } from '../../components/atoms/input';
import Space from '../../components/atoms/space';
import SelectInput from '../../components/atoms/select';
import DatePicker from 'react-native-date-picker';
import TextButton from '../../components/atoms/button';

const CreateOffer = () => {
  const theme = useTheme();
  const styles = styleSheet(theme);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
       <Space height={20} />
      <ScrollView style={{paddingHorizontal: 10}}>
        <FormInput placeholder="Enter Offer Name" />
        <Space height={20} />
        <SelectInput placeholder="Select store for this offer" />
        <Space height={20} />
        <FormInput placeholder="Select category for this offer" />
        <Space height={20} />
        <FormInput placeholder="Enter Offer Code" />
        <Space height={20} />
        <ButtonInput
          onPress={() => setOpen(p => !p)}
          placeholder={'Enter start date'}
          value={date.toString()}
        />
        <Space height={20} />
        <ButtonInput
          onPress={() => setOpen(p => !p)}
          placeholder={'Enter end date'}
          value={date.toString()}
        />
        <Space height={20} />
        <FormInput placeholder="Total Quantity" />
        <Space height={20} />
      </ScrollView>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
        <View style={{flex: 1}}>
          <TextButton onPress={() => {}} labelButton="Add" />
        </View>
      </View>
    </View>
  );
};

export default CreateOffer;
