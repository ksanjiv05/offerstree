import {StyleSheet} from 'react-native';
import {ITheme} from '../../../theme/ThemeContext';

export default ({colors}: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black,
    },
    conatint: {
      flex: 1,
      maxHeight: 120,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      paddingRight: 20,
    },
    leftCircle: (width: number, margin: number) => ({
      position: 'absolute',
      top: margin,
      left: margin,
      width: width,
      height: width,
      backgroundColor: colors.green,
      borderBottomRightRadius: width * 0.85,
    }),
    starContainer: {
      // position: 'absolute',
      // top: 20,
      // right: 20,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      width: 60,
      height: 60,
    },
    title: {
      fontSize: 36,
      fontWeight: '700',
      color: colors.white,
    },
    text: {
      color: colors.white,
    },
    childrenContainer: {
      flex: 1,
    },
  });
};
