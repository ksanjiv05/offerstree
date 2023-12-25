import React from 'react';
import {View} from 'react-native';
import FormInput from '../components/atoms/input';

type Props = {};

const Routes = ({}: Props) => {
  return (
    <View style={{
        backgroundColor: 'red',
        padding: 20,
    }}>
      <FormInput
        value={'xxx'}
        onChange={function (value: string): void {
          throw new Error('Function not implemented.');
        }}
      />
    </View>
  );
};

export default Routes;
