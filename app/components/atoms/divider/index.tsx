import {View, Text} from 'react-native';
import React from 'react';

type Props = {
  height?: number;
  color?: string;
};

const Divider = ({height = 2, color = 'red'}: Props) => {
  return (
    <View
      style={{
        flex: 1,
        maxHeight: height,
        backgroundColor: color,
      }}></View>
  );
};

export default Divider;
