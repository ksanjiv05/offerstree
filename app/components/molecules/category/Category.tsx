import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';

type CategoryProps = {
  categories: any[];
  onCategorySelect: (category: any) => void;
  defaultColor?: string;
  activeColor?: string;
  isDefaultCategory: boolean;
};

const Category = ({
  categories = [],
  onCategorySelect,
  activeColor = 'green',
  defaultColor = '#fff',
}: CategoryProps) => {
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0]);

  const selectCategory = (category: any) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };
  return (
    <View
      style={{
        height: 50,
      }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                height: 40,
              }}
              onPress={() => selectCategory(item)}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 115,
                  backgroundColor:
                    selectedCategory.id == item?.id
                      ? activeColor
                      : defaultColor,
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
