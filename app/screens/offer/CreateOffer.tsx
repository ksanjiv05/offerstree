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
import CustomImagePicker from '../../components/organisms/imagePicker';

const offerInit = {
  title: '',
  grabe_code: '',
  offer_category_id: 0,
  start_date: '',
  end_date: '',
  total_quantity: 0,
  discount_type: 'value',
  discount_amount: 0,
  max_discount_amount: 0,
  percentage_value: 0,
  min_purchase_amount: 0,
  color: '',
  description: '',
  is_active: '0',
  offer_type: 'standard',
  offer_banner: null,
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
  const [activeTab, setActiveTab] = useState(0);
  const [img, setImg] = useState(null);

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
      offer_type: activeTab === 0 ? 'standard' : 'banner',
      offer_banner: {
        uri: img?.path,
        type: 'image/jpeg',
        name: 'photo.jpg',
      },
    };
    if (activeTab === 0) {
      if (
        data.title === '' ||
        data.offer_category_id === 0 ||
        data.start_date === '' ||
        data.end_date === '' ||
        data.total_quantity === 0 ||
        (data.discount_amount === '' && data.percentage_value === '') ||
        data.grabe_code === '' ||
        data.min_purchase_amount === ''
      ) {
        toastMessage.publish({
          title: 'Please fill all the fields',
          type: 'error',
        });
        return;
      }
    } else {
      if (
        data.title === '' ||
        data.offer_category_id === 0 ||
        data.start_date === '' ||
        data.end_date === ''
      ) {
        toastMessage.publish({
          title: 'Please fill all the fields',
          type: 'error',
        });
        return;
      }
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
      <View
        style={{
          height: 50,
          flexDirection: 'row',
        }}>
        <TextButton
          buttonStyle={{
            flex: 1,
            marginLeft: 10,
            backgroundColor: activeTab == 0 ? theme.colors.blue : undefined,
          }}
          onPress={() => setActiveTab(0)}
          labelButton={'Standered'}></TextButton>
        <TextButton
          buttonStyle={{
            flex: 1,
            marginRight: 10,
            backgroundColor: activeTab == 1 ? theme.colors.blue : undefined,
          }}
          onPress={() => setActiveTab(1)}
          labelButton={'Banner'}></TextButton>
      </View>
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

        {activeTab === 0 && (
          <>
            <Space height={20} />
            <FormInput
              placeholder="Enter Offer Code"
              onChange={(value: string) => onChange('grabe_code', value)}
            />
          </>
        )}
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
        {activeTab === 0 ? (
          <>
            <FormInput
              placeholder="Total Quantity"
              keyboardType="numeric"
              onChange={(value: string) =>
                onChange('total_quantity', parseInt(value))
              }
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
                  onChange={(value: string) =>
                    onChange('percentage_value', parseInt(value))
                  }
                />
              </View>
              <Text style={{color: '#fff', lineHeight: 55}}>OR</Text>
              <View style={{flex: 1, marginLeft: 5}}>
                <FormInput
                  placeholder="Flat Discount"
                  keyboardType="numeric"
                  onChange={(value: string) =>
                    onChange('discount_amount', parseInt(value))
                  }
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
              onChange={(value: string) =>
                onChange('min_purchase_amount', value)
              }
            />
          </>
        ) : (
          <View
            style={{
              height: 180,
            }}>
            <CustomImagePicker setImg={setImg} isGallary={true} />
          </View>
        )}
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
