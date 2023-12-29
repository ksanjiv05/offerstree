import React from 'react';
import {View, StyleSheet} from 'react-native';

type Props = {
  height?: number;
};

const Space = ({height = 15}: Props) => {
  return <View style={{height}}></View>;
};

// const styles = StyleSheet.create({});

export default Space;
