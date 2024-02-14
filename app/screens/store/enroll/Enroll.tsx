import {View, ScrollView, StyleSheet} from 'react-native';
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

const steps = [
  {
    Icon: AiEditIcon,
  },
  {
    Icon: LocationIcon,
  },
];

const StepA = () => {
  return (
    <View>
      <View style={{height: 200, flexDirection: 'row'}}>
        <View
          style={{
            width: 175,
            height: 175,
            borderRadius: 200,
            backgroundColor: 'red',
            overflow: 'hidden',
          }}>
          <CustomImagePicker />
        </View>
        <View
          style={{
            flex: 1,
            maxHeight: 175,
            marginLeft: 10,
            backgroundColor: 'red',
          }}>
          <CustomImagePicker />
        </View>
      </View>
      <FormInput placeholder="Store Name" />
      <Space height={20} />
      <SelectInput placeholder="Store Category" />
      <Space height={20} />
      <FormInput placeholder="Store Owner Name " />
      <Space height={20} />
      <FormInput placeholder="Store Contact Number" />
      <Space height={20} />
      <FormInput placeholder="Store Email" />
    </View>
  );
};

const StepB = () => {
  return (
    <View>
      <View style={{height: 200,backgroundColor:"red"}}>
        <MapView
          style={ {...StyleSheet.absoluteFillObject,}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
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

const StepFinal = () => {
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

  const renderStep = () => {
    console.log(activeStep);
    switch (activeStep) {
      case 0:
        return <StepA />;
      case 1:
        return <StepB />;
      case 2:
        return <StepFinal />;
      default:
        return <StepA />;
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
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
