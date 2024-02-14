import {StyleSheet} from 'react-native';
import {ITheme} from '../../theme/ThemeContext';

export default ({colors}: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black,
    },
    pic: {
      width: 175,
      height: 175,
      borderRadius: 200,
      backgroundColor: 'red',
      overflow: 'hidden',
    },
  });
};
