import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Category from '../../../components/molecules/category/Category';
import TextButton from '../../../components/atoms/button';
import {Slider} from '@miblanchard/react-native-slider';
import Space from '../../../components/atoms/space';
import {FlatList} from 'react-native-gesture-handler';
import CalendarPicker, {ChangedDate} from 'react-native-calendar-picker';

const filter = [
  {
    id: 1,
    name: 'sort by distance',
  },
  {
    id: 2,
    name: 'by store',
  },
  {
    id: 3,
    name: 'max discount',
  },
  {
    id: 4,
    name: 'date',
  },
  {
    id: 5,
    name: 'higest rating',
  },
];

const Filter = ({onFilter}) => {
  const [selectedCategory, setSelectedCategory] = React.useState(filter[0]);
  const [distance, setDistance] = React.useState(0);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const onCategorySelect = (category: any) => {
    setSelectedCategory(category);
  };

  const renderStore = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 200,
          backgroundColor: 'red',
          margin: 10,
          borderRadius: 10,
        }}></TouchableOpacity>
    );
  };

  const applyFilter = () => {
    const filterObj = {
      start_date: startDate,
      end_date: endDate,
    };
    onFilter(filterObj);
  };

  const byDistance = (distance: number) => {
    onFilter({search_radius: distance});
  };
  const byDiscount = (discount: number) => {
    onFilter({discount});
  };

  return (
    <View style={{padding: 10}}>
      <Category
        categories={filter}
        onCategorySelect={onCategorySelect}
        defaultColor="#0000004a"
        isDefaultCategory={false}
      />
      {selectedCategory.id === 1 && (
        <View style={styles.container}>
          <View style={styles.containtConatiner}>
            <TextButton
              onPress={() => byDistance(5)}
              buttonStyle={styles.btn}
              labelButton="Within 5KM"
            />
            <TextButton
              onPress={() => byDistance(10)}
              buttonStyle={styles.btn}
              labelButton="Within 10KM"
            />
            <TextButton
              onPress={() => byDistance(15)}
              buttonStyle={styles.btn}
              labelButton="Within 15KM"
            />
            <TextButton
              onPress={() => byDistance(20)}
              buttonStyle={styles.btn}
              labelButton="Within 20KM"
            />
            <TextButton
              onPress={() => byDistance(25)}
              buttonStyle={styles.btn}
              labelButton="Within 25KM"
            />
          </View>
          <View>
            <Space height={20} />
            <Slider
              minimumValue={1}
              maximumValue={100}
              onValueChange={v => {
                console.log('v', v[0].toFixed(0));
              }}
              onSlidingComplete={v => byDistance(Math.round(v[0]))}
            />
            <Text
              style={{textAlign: 'center', fontSize: 18, fontWeight: '700'}}>
              Within {Math.round(distance)}KM
            </Text>
          </View>
        </View>
      )}
      {selectedCategory.id === 2 && (
        <View>
          <FlatList
            data={[1, 2, 3, 4, 5]}
            renderItem={renderStore}
            keyExtractor={item => item.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}
            numColumns={2}
          />
        </View>
      )}
      {selectedCategory.id === 3 && (
        <View style={styles.container}>
          <View style={styles.containtConatiner}>
            <TextButton
              onPress={() => byDiscount(50)}
              buttonStyle={styles.btn}
              labelButton="50% Off"
            />
            <TextButton
              onPress={() => byDiscount(60)}
              buttonStyle={styles.btn}
              labelButton="60% Off"
            />
            <TextButton
              onPress={() => byDiscount(70)}
              buttonStyle={styles.btn}
              labelButton="70% Off"
            />
            <TextButton
              onPress={() => byDiscount(80)}
              buttonStyle={styles.btn}
              labelButton="80% Off"
            />
            <TextButton
              onPress={() => byDiscount(90)}
              buttonStyle={styles.btn}
              labelButton="90% Off"
            />
          </View>
          <View>
            <Space height={20} />
            <Slider
              minimumValue={1}
              maximumValue={100}
              onValueChange={v => setDistance(v)}
              onSlidingComplete={v => byDiscount(Math.round(v))}
            />
            <Text
              style={{textAlign: 'center', fontSize: 18, fontWeight: '700'}}>
              {Math.round(distance)}% Off
            </Text>
          </View>
        </View>
      )}
      {selectedCategory.id === 4 && (
        <View style={styles.container}>
          <View style={{paddingHorizontal: 15}}>
            <CalendarPicker
              weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
              showDayStragglers={false}
              // selectedDayColor={COLORS.red}
              // selectedDayTextColor={COLORS.text1}
              onDateChange={(date: Date, type: ChangedDate) => {
                if (type == 'START_DATE') {
                  setStartDate(date);
                  setEndDate(undefined);
                } else if (type == 'END_DATE') {
                  setEndDate(date);
                }
              }}
              // todayBackgroundColor={COLORS.transparent}
              // selectedRangeStyle={{backgroundColor: COLORS.lightGreen}}
              selectedStartDate={startDate}
              selectedEndDate={endDate}
              allowRangeSelection={true}
              // width={width - 30}
              // previousComponent={
              //   <BackArrow color={COLORS.grey600} size={moderateScale(22)} />
              // }
              // nextComponent={
              //   <RightArrowSvg color={COLORS.grey500} size={moderateScale(22)} />
              // }
              // todayTextStyle={{color: COLORS.text1}}
              // textStyle={{color: COLORS.text1}}
              dayLabelsWrapper={{
                borderBottomWidth: 0,
                borderTopWidth: 0,
              }}
              minDate={new Date()}
              // selectedRangeStartStyle={{
              //   backgroundColor: COLORS.green,
              // }}
              // selectedRangeEndStyle={{
              //   backgroundColor: COLORS.green,
              // }}
            />
          </View>
          <Space height={20} />
          <TextButton onPress={applyFilter} labelButton="Apply" />
        </View>
      )}
      {selectedCategory.id === 5 && (
        <View>
          <Text>higest rating</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  containtConatiner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    paddingHorizontal: 15,
    height: 50,
    marginHorizontal: 10,
    borderRadius: 20,
    marginVertical: 10,
  },
});

export default Filter;
