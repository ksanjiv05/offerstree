import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key: string, value: any) => {
  console.log('set item', key, value);
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getItem = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};
