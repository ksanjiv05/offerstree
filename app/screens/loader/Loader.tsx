import {StyleSheet, View} from 'react-native';
import React from 'react';
import LoaderKit from 'react-native-loader-kit';

export default function Loader() {
  return (
    <View style={styles.container}>
      <LoaderKit color="green" name="BallScale" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loader: {height: 100, width: 100},
});
