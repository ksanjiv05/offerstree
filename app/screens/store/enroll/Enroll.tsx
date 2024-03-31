import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import {useTheme} from '../../../theme/ThemeContext';
import styleSheet from './styles';
import StepForm from '../../../components/organisms/stepForm';
import {AiEditIcon, LocationIcon} from '../../../assets/icons';
import FormInput from '../../../components/atoms/input';
import Space from '../../../components/atoms/space';
import TextButton from '../../../components/atoms/button';
import {Text} from '../../../components/atoms/text/Text';
import Switch from '../../../components/atoms/switch';
import CustomImagePicker from '../../../components/organisms/imagePicker';
import SelectInput from '../../../components/atoms/select';
import MapView, {Marker} from 'react-native-maps';
import {StoreEnrollProps} from '../../../types/store.type';
import {getCategories} from '../../../apis/category';
import {toastMessage} from '../../../services/ToastMessage';
import {isValidEmail} from '../../../config/isValidEmail';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styles from './styles';
import {addStore, updateAddress, updateDiscription} from '../../../apis/store';

const steps = [
  {
    Icon: AiEditIcon,
  },
  {
    Icon: LocationIcon,
  },
];

const getFormData = (data: any) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  return formData;
};

type StepFormProps = {
  setEnrollDataProps: React.Dispatch<React.SetStateAction<any>>;
  stepARef: React.MutableRefObject<any>;
};

const showErrorMessage = errors => {
  const keys = Object.keys(errors);
  const messqge = errors[keys[0]][0];
  toastMessage.publish({
    title: messqge,
    type: 'error',
  });
};

const StepA = ({setEnrollDataProps, stepARef}: StepFormProps) => {
  const theme = useTheme();
  const styles = styleSheet(theme);
  const [data, setData] = React.useState({
    title: '',
    store_category_id: '',
    founder: '',
    store_contact_number: '',
    store_email: '',
  });
  const [img, setImg] = React.useState(null);
  // const [imgStore, setImgStore] = React.useState(null);
  const [categories, setCategories] = React.useState([]);

  const onChange = (key: string, value: string) => {
    setData(p => ({...p, [key]: value}));
  };

  const handleStepANext = async () => {
    if (!data.title || data.title === '') {
      toastMessage.publish({
        title: 'Store Name is required!',
        type: 'error',
      });
      return;
    }
    if (!data.store_category_id || data.store_category_id === '') {
      toastMessage.publish({
        title: 'Store Category is required!',
        type: 'error',
      });
      return;
    }
    if (!data.founder || data.founder === '') {
      toastMessage.publish({
        title: 'Store Owner Name is required!',
        type: 'error',
      });
      return;
    }
    if (!data.store_contact_number || data.store_contact_number === '') {
      toastMessage.publish({
        title: 'Store Contact Number is required!',
        type: 'error',
      });
      return;
    }
    if (!data.store_email || data.store_email === '') {
      toastMessage.publish({
        title: 'Store Email is required!',
        type: 'error',
      });
      return;
    }
    if (!(data.store_email && isValidEmail(data.store_email))) {
      toastMessage.publish({
        type: 'error',
        title: 'Please enter your valid email',
      });
      return;
    }

    try {
      const res = await addStore({...data, logo: img?.path});
      if (res && res?.status === 201) {
        console.log('res.data.data.store.id', res.data.data.store);
        setEnrollDataProps({id: res.data.data.store.id});
        toastMessage.publish({
          title: 'Store added successfully',
          type: 'success',
        });
        return true;
      }
    } catch (error: any) {
      console.log('error-- res-------- ', error);
      toastMessage.publish({
        title: 'Something went wrong',
        type: 'error',
      });
      showErrorMessage(error.error.errors);
      return false;
    }
  };
  stepARef.current = handleStepANext;
  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      const cdata = await response.data;
      setCategories(cdata.data?.categories);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View>
      <View style={styles.imgPicContainer}>
        {/* <View style={styles.imgPic}>
          <CustomImagePicker setImg={setImgStore} />
        </View> */}
        <View style={styles.imgPic2}>
          <CustomImagePicker setImg={setImg} isGallary={true} />
        </View>
      </View>
      <FormInput
        placeholder="Store Name"
        onChange={text => onChange('title', text)}
      />
      <Space height={20} />
      <SelectInput
        placeholder="Store Category"
        onChange={text => onChange('store_category_id', text)}
        data={categories}
      />
      <Space height={20} />
      <FormInput
        placeholder="Store Owner Name "
        onChange={text => onChange('founder', text)}
      />
      <Space height={20} />
      <FormInput
        placeholder="Store Contact Number"
        keyboardType="phone-pad"
        maxLength={10}
        onChange={text => onChange('store_contact_number', text)}
      />
      <Space height={20} />
      <FormInput
        placeholder="Store Email"
        onChange={text => onChange('store_email', text)}
      />
    </View>
  );
};

const StepB = ({enrollData, stepBRef}: any) => {
  const height = useSharedValue(200);
  const [zoom, setZoom] = React.useState(false);
  const screenHeight = Dimensions.get('screen').height;
  const theme = useTheme();
  const styles = styleSheet(theme);
  const [data, setData] = React.useState({
    address: '',
    landmark: '',
    city: '',
    state: '',
    country: 'india',
    postal_code: '',
    lat: '',
    lng: '',
  });

  const [location, setLocation] = React.useState({
    lat: '',
    lng: '',
  });

  const onChange = (key: string, value: string) => {
    setData(p => ({...p, [key]: value}));
  };

  const handleNext = async () => {
    if (!data.address || data.address === '') {
      toastMessage.publish({
        title: 'Address is required!',
        type: 'error',
      });
    }
    if (!data.landmark || data.landmark === '') {
      toastMessage.publish({
        title: 'Landmark is required!',
        type: 'error',
      });
    }
    if (!data.city || data.city === '') {
      toastMessage.publish({
        title: 'City is required!',
        type: 'error',
      });
    }
    if (!data.state || data.state === '') {
      toastMessage.publish({
        title: 'State is required!',
        type: 'error',
      });
    }
    if (!data.postal_code || data.postal_code === '') {
      toastMessage.publish({
        title: 'Postal code is required!',
        type: 'error',
      });
    }

    if (!data.lat || data.lat === '' || !data.lng || data.lng === '') {
      toastMessage.publish({
        title: 'Please select location on map!',
        type: 'error',
      });
    }

    try {
      const res = await updateAddress(enrollData.id, data);
      if (res && res?.status === 200) {
        toastMessage.publish({
          title: 'Address added successfully',
          type: 'success',
        });
        return true;
      }
    } catch (error: any) {
      console.log('error-- res-------- ', error);
      toastMessage.publish({
        title: 'Something went wrong',
        type: 'error',
      });
      showErrorMessage(error.error.errors);

      return false;
    }
  };

  stepBRef.current = handleNext;

  const mapRStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value),
    };
  });

  React.useEffect(() => {
    if (zoom) {
      height.value = screenHeight * 0.75;
    } else {
      height.value = 200;
    }
  }, [height, screenHeight, zoom]);

  React.useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      console.log(info);
      setData(p => ({
        ...p,
        lat: info.coords.latitude.toString(),
        lng: info.coords.longitude.toString(),
      }));
    });
  }, []);
  return (
    <View>
      <Animated.View style={mapRStyle}>
        <MapView
          style={{...StyleSheet.absoluteFillObject}}
          initialRegion={
            data.lat && data.lng
              ? {
                  latitude: parseFloat(data.lat),
                  longitude: parseFloat(data.lng),
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
              : {
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
          }
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          onPress={e => {
            console.log(e.nativeEvent.coordinate);
            const {latitude, longitude} = e.nativeEvent.coordinate;
            setData(p => ({
              ...p,
              lat: latitude.toString(),
              lng: longitude.toString(),
            }));
          }}>
          <Marker
            coordinate={
              data.lat && data.lng
                ? {
                    latitude: parseFloat(data.lat),
                    longitude: parseFloat(data.lng),
                  }
                : {
                    latitude: 37.78825,
                    longitude: -122.4324,
                  }
            }
            title="My Marker"
            description="Some description"
          />
        </MapView>
        <TouchableOpacity
          style={styles.mapZoom}
          onPress={() => {
            setZoom(p => !p);
          }}>
          <LocationIcon />
        </TouchableOpacity>
      </Animated.View>
      <Space height={20} />
      <FormInput
        placeholder="Full Address"
        multiline
        numberOfLines={3}
        inputContainerStyle={{height: 120}}
        inputStyle={{height: 90, textAlignVertical: 'top'}}
        onChange={text => onChange('address', text)}
      />
      <Space height={20} />

      <FormInput
        placeholder="Landmark"
        onChange={text => onChange('landmark', text)}
      />
      <Space height={20} />
      <FormInput
        placeholder="State"
        onChange={text => onChange('state', text)}
      />
      <Space height={20} />
      <FormInput placeholder="City" onChange={text => onChange('city', text)} />
      <Space height={20} />
      <FormInput
        placeholder="Pincode"
        onChange={text => onChange('postal_code', text)}
        keyboardType="numeric"
        maxLength={6}
      />
    </View>
  );
};

const StepFinal = ({enrollData, stepCRef}: any) => {
  const [discrption, setDiscrption] = React.useState('');
  const [storeStatus, setStoreStatus] = React.useState(true);

  const handleNext = async () => {
    try {
      const res = await updateDiscription(enrollData.id, {
        description: discrption,
        is_active: storeStatus ? '0' : '1',
      });
      if (res && res?.status === 200) {
        toastMessage.publish({
          title: 'store description added successfully',
          type: 'success',
        });
        return true;
      }
    } catch (error: any) {
      console.log('error-- res-------- ', error);
      toastMessage.publish({
        title: 'Something went wrong',
        type: 'error',
      });
      showErrorMessage(error.error.errors);

      return false;
    }
  };
  stepCRef.current = handleNext;
  return (
    <View>
      <Space height={40} />
      <Text style={{color: '#fff', fontSize: 20}}>Store Status</Text>
      <Space height={10} />

      <Switch isActive={storeStatus} onPress={() => setStoreStatus(p => !p)} />
      <Space height={20} />

      <FormInput
        placeholder="Enter store description"
        multiline
        numberOfLines={6}
        inputContainerStyle={{height: 200}}
        onChange={text => setDiscrption(text)}
        inputStyle={{height: 170, textAlignVertical: 'top'}}
      />
      <Space height={20} />
    </View>
  );
};

const Enroll = () => {
  const theme = useTheme();
  const styles = styleSheet(theme);
  const [activeStep, setActiveStep] = React.useState(0);
  const [enrollData, setEnrollDataProps] = React.useState<StoreEnrollProps>({
    id: '',
  });
  const stepARef = React.useRef<any>(null);
  const stepBRef = React.useRef<any>(null);
  const stepCRef = React.useRef<any>(null);

  const [loader, setLoader] = React.useState(false);

  const renderStep = () => {
    console.log(activeStep);
    switch (activeStep) {
      case 0:
        return (
          <StepA setEnrollDataProps={setEnrollDataProps} stepARef={stepARef} />
        );
      case 1:
        return <StepB enrollData={enrollData} stepBRef={stepBRef} />;
      case 2:
        return <StepFinal enrollData={enrollData} stepCRef={stepCRef} />;
      default:
        return <StepA setEnrollDataProps={setEnrollDataProps} />;
    }
  };

  const handleNext = async () => {
    // if (activeStep < steps.length) {
    //   setActiveStep(activeStep + 1);

    // }
    setLoader(true);
    switch (activeStep) {
      case 0:
        const status = await (stepARef && stepARef?.current());
        console.log('status', status);
        if (status) {
          setActiveStep(activeStep + 1);
        }
        break;
      case 1:
        const statusB = await (stepBRef && stepBRef?.current());
        console.log('statusB', statusB);
        if (statusB) {
          setActiveStep(activeStep + 1);
        }
        break;

      case 2:
        const statusC = await (stepCRef && stepCRef?.current());
        console.log('statusC', statusC);
        if (statusB) {
          setActiveStep(activeStep + 1);
        }
        break;

      default:
        return <StepA setEnrollDataProps={setEnrollDataProps} />;
    }
    setLoader(false);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <View style={styles.container}>
      <StepForm
        steps={steps}
        activeStep={activeStep}
        activeColor={theme.colors.green}
        color={theme.colors.white}
      />
      <Space height={20} />
      <ScrollView style={{paddingHorizontal: 10}}>
        {renderStep()}
        <Space height={20} />
      </ScrollView>
      <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
        <View style={{flex: 1}}>
          <TextButton
            onPress={handleBack}
            buttonStyle={{backgroundColor: '#000000'}}
            labelButton="Back"
          />
        </View>
        <View style={{flex: 1}}>
          <TextButton
            onPress={handleNext}
            isLoader={loader}
            labelButton="Next"
          />
        </View>
      </View>
    </View>
  );
};

export default Enroll;
