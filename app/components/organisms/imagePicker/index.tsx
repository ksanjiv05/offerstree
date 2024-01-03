import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';

const CustomImagePicker = () => {
  const handlePicImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <TouchableOpacity
      style={{flex: 1}}
      onPress={handlePicImage}></TouchableOpacity>
  );
};

export default CustomImagePicker;
