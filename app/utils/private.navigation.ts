import {getItem} from './storage';

export const privateNavigation = async (
  navigation: any,
  screenName: string,
  params: any,
) => {
  const token = await getItem('token');
  if (!token) {
    navigation.navigate('login');
    return;
  }
  navigation.navigate(screenName, params);
};
