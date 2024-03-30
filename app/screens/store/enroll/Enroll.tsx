import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
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
import MapView from 'react-native-maps';
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
import {addStore} from '../../../apis/store';

const steps = [
  {
    Icon: AiEditIcon,
  },
  {
    Icon: LocationIcon,
  },
];

const initEnrollProps = {
  founding_date: 'string',
  founding_location: 'string',
  website_url: 'string',
  description: 'string',
  is_active: '0',
};

type StepFormProps = {
  setEnrollDataProps: React.Dispatch<React.SetStateAction<StoreEnrollProps>>;
  stepARef: React.MutableRefObject<any>;
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
    }
    if (!data.store_category_id || data.store_category_id === '') {
      toastMessage.publish({
        title: 'Store Category is required!',
        type: 'error',
      });
    }
    if (!data.founder || data.founder === '') {
      toastMessage.publish({
        title: 'Store Owner Name is required!',
        type: 'error',
      });
    }
    if (!data.store_contact_number || data.store_contact_number === '') {
      toastMessage.publish({
        title: 'Store Contact Number is required!',
        type: 'error',
      });
    }
    if (!data.store_email || data.store_email === '') {
      toastMessage.publish({
        title: 'Store Email is required!',
        type: 'error',
      });
    }
    if (!(data.store_email && isValidEmail(data.store_email))) {
      toastMessage.publish({
        type: 'error',
        title: 'Please enter your valid email',
      });
      return;
    }
    // setEnrollDataProps({
    //   ...data,
    //   logo: 'https://admin.offerstree.com/storage/blogs/cover_images/nZQKLIYr4WALrFGjziGqO5pwi7gG363SsBc7TCwf.webp',
    // });
    try {
      const res = await addStore({...data, logo: ''});
      console.log('error res--------||--- ', res);
      if (res&&res?.status === 200) {
        toastMessage.publish({
          title: 'Store added successfully',
          type: 'success',
        });
        return true;
      }
    } catch (error) {
       console.log('error-- res-------- ', error);
      toastMessage.publish({
        title: 'Something went wrong',
        type: 'error',
      });
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

const StepB = ({setEnrollDataProps}: StepFormProps) => {
  const height = useSharedValue(200);
  const [zoom, setZoom] = React.useState(false);
  const screenHeight = Dimensions.get('screen').height;
  const theme = useTheme();
  const styles = styleSheet(theme);

  const mapRStyle = useAnimatedStyle(() => {
    console.log(height.value);
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
  return (
    <View>
      <Animated.View style={mapRStyle}>
        <MapView
          style={{...StyleSheet.absoluteFillObject}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          // followsUserLocation={true}
          // userLocationCalloutEnabled={true}
          showsMyLocationButton={true}
        />
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
      />
      <Space height={20} />

      <FormInput placeholder="Landmark" />
      <Space height={20} />
      <FormInput placeholder="State" />
      <Space height={20} />
      <FormInput placeholder="City" />
      <Space height={20} />
      <FormInput placeholder="Pincode" />
    </View>
  );
};

const StepFinal = ({setEnrollDataProps}: StepFormProps) => {
  return (
    <View>
      <Space height={40} />
      <Text style={{color: '#fff', fontSize: 20}}>Store Status</Text>
      <Space height={10} />

      <Switch isActive={true} />
      <Space height={20} />

      <FormInput
        placeholder="Enter store description"
        multiline
        numberOfLines={6}
        inputContainerStyle={{height: 200}}
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
  const [enrollData, setEnrollDataProps] =
    React.useState<StoreEnrollProps>(initEnrollProps);
  const stepARef = React.useRef<any>(null);

  const renderStep = () => {
    console.log(activeStep);
    switch (activeStep) {
      case 0:
        return (
          <StepA setEnrollDataProps={setEnrollDataProps} stepARef={stepARef} />
        );
      case 1:
        return <StepB setEnrollDataProps={setEnrollDataProps} />;
      case 2:
        return <StepFinal setEnrollDataProps={setEnrollDataProps} />;
      default:
        return <StepA setEnrollDataProps={setEnrollDataProps} />;
    }
  };

  const handleNext = async () => {
    // if (activeStep < steps.length) {
    //   setActiveStep(activeStep + 1);

    // }

    switch (activeStep) {
      case 0:
        const status = await (stepARef && stepARef?.current());
        console.log('status', status);
        if (status) {
          setActiveStep(activeStep + 1);
        }
        break;
      case 1:
        return <StepB setEnrollDataProps={setEnrollDataProps} />;
      case 2:
        return <StepFinal setEnrollDataProps={setEnrollDataProps} />;
      default:
        return <StepA setEnrollDataProps={setEnrollDataProps} />;
    }
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
          <TextButton onPress={handleNext} labelButton="Next" />
        </View>
      </View>
    </View>
  );
};

export default Enroll;
