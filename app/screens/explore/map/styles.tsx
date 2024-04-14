import {StyleSheet} from 'react-native';
import {ITheme} from '../../../theme/ThemeContext';

export default ({colors}: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black,
      paddingHorizontal: 10,
    },
    contentCenter: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    rowConatiner: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    pic: {
      width: 50,
      height: 50,
      backgroundColor: 'green',
      borderRadius: 51,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.white,
    },
    htitle: {
      fontSize: 26,
      fontWeight: '600',
      color: colors.green,
    },
    text: {
      color: colors.white,
      fontSize: 16,
    },
    textBlueM: {
      color: colors.green,
      fontSize: 18,
      marginLeft: 10,
    },
    textM: {
      color: colors.white,
      fontSize: 18,
      marginLeft: 10,
    },
    backIcon: {
      position: 'absolute',
      top: 20,
      left: 20,
      backgroundColor: colors.white,
      padding: 10,
      borderRadius: 50,
    },
    rowAlignmentCenter: {flexDirection: 'row', alignItems: 'center'},
  });
};
