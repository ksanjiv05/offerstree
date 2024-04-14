import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';

const Category = ({categories = []}) => {
  return (
    <View
      style={{
        height: 50,
      }}>
      <FlatList
        data={categories}
        renderItem={({item}) => {
          console.log('item', item);
          return (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                height: 40,
              }}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 115,
                  backgroundColor: 'white',
                }}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item?.id?.toString()}
        horizontal
      />
    </View>
  );
};

export default Category;
