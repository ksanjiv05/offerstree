/* eslint-disable react-native/no-inline-styles */
import {
  TouchableOpacity,
  Platform,
  Alert,
  PermissionsAndroid,
  Image,
} from 'react-native';
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {
  PERMISSIONS,
  request,
  RESULTS,
  Permission,
  check,
} from 'react-native-permissions';

type CustomeImagePickerProps = {
  setImg: React.Dispatch<React.SetStateAction<null>>;
  isGallary?: boolean;
};

const CustomImagePicker = ({
  isGallary = true,
  setImg,
}: CustomeImagePickerProps) => {
  const [image, setImage] = React.useState(undefined);
  const requestPermission = async (permission: Permission) => {
    const status = await check(permission);
    console.log('Permission status:', status);
    const result = await request(permission);
    console.log('Permission result:', result);
    return result === RESULTS.GRANTED;
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera so you can take pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handlePickImageFromGallery = async () => {
    console.log('handlePickImageFromGallery');
    // requestCameraPermission();
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;

    const hasPermission = await requestPermission(permission);
    if (!hasPermission) {
      Alert.alert(
        'Permission denied',
        'You need to grant photo library permission to use this feature.',
      );
      return;
    }

    pickImageFromGallery();
  };

  const handleTakePhotoFromCamera = async () => {
    console.log('handlePickImageFromCamera');
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;

    const hasPermission = await requestPermission(permission);
    if (!hasPermission) {
      Alert.alert(
        'Permission denied',
        'You need to grant camera permission to use this feature.',
      );
      return;
    }

    takePhotoFromCamera();
  };

  const pickImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image: any) => {
        console.log(image);
        setImage(image.path);
        setImg && setImg(image);
      })
      .catch(error => {
        console.log('Error picking an image from the gallery:', error);
      });
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image: any) => {
        console.log(image);
        setImage(image.path);
        setImg && setImg(image);
      })
      .catch(error => {
        console.log('Error taking a photo:', error);
      });
  };
  React.useEffect(() => {
    requestCameraPermission();
  }, []);
  return (
    <TouchableOpacity
      style={{flex: 1, backgroundColor: 'blue'}}
      onPress={() =>
        isGallary ? handlePickImageFromGallery() : handleTakePhotoFromCamera()
      }>
      <Image source={{uri: image}} style={{flex: 1}} />
    </TouchableOpacity>
  );
};

export default CustomImagePicker;
