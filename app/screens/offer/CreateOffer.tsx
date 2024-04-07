import {View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../../theme/ThemeContext';
import styleSheet from './styles';
import FormInput, {ButtonInput} from '../../components/atoms/input';
import Space from '../../components/atoms/space';
import SelectInput from '../../components/atoms/select';
import DatePicker from 'react-native-date-picker';
import TextButton from '../../components/atoms/button';
import {getStores} from '../../apis/store';
import {createOffer, getOfferCategories} from '../../apis/offer';
import moment from 'moment';
import {toastMessage} from '../../services/ToastMessage';

const offerInit = {
  title: '',
  grabe_code: '',
  offer_category_id: 0,
  start_date: '',
  end_date: '',
  total_quantity: 0,
  discount_type: 'value',
  discount_amount: '',
  max_discount_amount: '',
  percentage_value: '',
  min_purchase_amount: '',
  color: '',
  description: '',
  is_active: '0',
};

const CreateOffer = () => {
  const theme = useTheme();
  const styles = styleSheet(theme);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const [offer, setOffer] = useState(offerInit);
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);

  const onChange = (key: string, value: any) => {
    setOffer(p => ({...p, [key]: value}));
  };

  const handleAddOffer = async () => {
    console.log({
      ...offer,
      start_date: moment(startDate).format('YYYY-MM-DD'),
      end_date: endDate,
    });
    let data = {
      ...offer,
      start_date: moment(startDate).format('YYYY-MM-DD'),
      end_date: moment(endDate).format('YYYY-MM-DD'),
    };
    if (
      data.title === '' ||
      data.grabe_code === '' ||
      data.offer_category_id === 0 ||
      data.start_date === '' ||
      data.end_date === '' ||
      data.total_quantity === 0 ||
      (data.discount_amount === '' && data.percentage_value === '') ||
      data.min_purchase_amount === ''
    ) {
      toastMessage.publish({
        title: 'Please fill all the fields',
        type: 'error',
      });
      return;
    }

    try {
      const res = await createOffer(data);
      if (res.status === 201) {
        toastMessage.publish({
          title: 'Offer added successfully',
          type: 'success',
        });
        setOffer(offerInit);
      }
    } catch (error) {
      console.log(error);
      toastMessage.publish({
        title: 'Offer added failed',
        type: 'error',
      });
    }
  };

  const getAllStores = async () => {
    try {
      const res = await getStores({});
      if (res.status === 200) {
        const st = res.data.data.stores.data;
        setStores(st.map((s: any) => ({name: s.title, id: s.id})));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllofferCategories = async () => {
    try {
      const res = await getOfferCategories({});
      console.log(res.data.data.categories);
      if (res.status === 200) {
        setCategories(res.data.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getAllStores();
    getAllofferCategories();
  }, []);

  return (
    <View style={styles.container}>
      <Space height={20} />
      <ScrollView style={{paddingHorizontal: 10}}>
        <FormInput
          placeholder="Enter Offer Name"
          onChange={(value: string) => onChange('title', value)}
        />
        <Space height={20} />
        <SelectInput
          placeholder="Select store for this offer"
          data={stores}
          onChange={(value: string) => onChange('store_id', value)}
        />
        <Space height={20} />
        {/* <FormInput placeholder="Select category for this offer" /> */}
        <SelectInput
          placeholder="Select category for this offer"
          data={categories}
          onChange={(value: string) => onChange('offer_category_id', value)}
        />
        <Space height={20} />
        <FormInput
          placeholder="Enter Offer Code"
          onChange={(value: string) => onChange('grabe_code', value)}
        />
        <Space height={20} />
        <ButtonInput
          onPress={() => setStartDateOpen(p => !p)}
          placeholder={'Enter start date'}
          value={moment(startDate).format('DD-MM-YYYY')}
          onChange={(value: string) => onChange('start_date', value)}
        />
        <Space height={20} />
        <ButtonInput
          onPress={() => setEndDateOpen(p => !p)}
          placeholder={'Enter end date'}
          value={moment(endDate).format('DD-MM-YYYY')}
          onChange={(value: string) => onChange('end_date', value)}
        />
        <Space height={20} />
        <FormInput
          placeholder="Total Quantity"
          keyboardType="numeric"
          onChange={(value: string) => onChange('total_quantity', value)}
        />
        <Space height={20} />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{flex: 1, marginRight: 5}}>
            <FormInput
              placeholder="Discount Percentage"
              keyboardType="numeric"
              onChange={(value: string) => onChange('percentage_value', value)}
            />
          </View>
          <Text style={{color: '#fff', lineHeight: 55}}>OR</Text>
          <View style={{flex: 1, marginLeft: 5}}>
            <FormInput
              placeholder="Flat Discount"
              keyboardType="numeric"
              onChange={(value: string) => onChange('discount_amount', value)}
            />
          </View>
        </View>

        {parseInt(offer.percentage_value) > 0 && (
          <>
            <Space height={20} />
            <FormInput
              placeholder="Max Discount Amount"
              keyboardType="numeric"
              onChange={(value: string) =>
                onChange('max_discount_amount', value)
              }
            />
          </>
        )}
        <Space height={20} />
        <FormInput
          placeholder="Min Purchase Amount"
          keyboardType="numeric"
          onChange={(value: string) => onChange('min_purchase_amount', value)}
        />
      </ScrollView>
      <DatePicker
        modal
        open={startDateOpen}
        date={startDate}
        mode="date"
        onConfirm={date => {
          setStartDateOpen(false);
          setStartDate(date);
        }}
        onCancel={() => {
          setStartDateOpen(false);
        }}
      />
      <DatePicker
        modal
        open={endDateOpen}
        date={endDate}
        mode="date"
        onConfirm={date => {
          setEndDateOpen(false);
          setEndDate(date);
        }}
        onCancel={() => {
          setEndDateOpen(false);
        }}
      />
      <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
        <View style={{flex: 1}}>
          <TextButton onPress={handleAddOffer} labelButton="Add" />
        </View>
      </View>
    </View>
  );
};

export default React.memo(CreateOffer);
