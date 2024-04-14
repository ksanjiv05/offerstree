import {StyleSheet} from 'react-native';
import {ITheme} from '../../../theme/ThemeContext';

export default ({colors}: ITheme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: 10,
      marginVertical: 2,
    },
    rowConatiner: {height: 70, flexDirection: 'row', alignItems: 'center'},
    pic: {
      width: 60,
      height: 60,
      backgroundColor: 'green',
      borderRadius: 51,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      textTransform: 'capitalize',
    },
    rowAlignmentCenter: {flexDirection: 'row', alignItems: 'center'},
    rowSpaceBetween: {flexDirection: 'row', justifyContent: 'space-between'},
    btn: {flex: 1, maxWidth: 150, maxHeight: 25},
    offText: {
      fontSize: 12,
      color: colors.green,
      position: 'absolute',
      right: 10,
      bottom: 5,
    },
    offTextContainer: {
      borderWidth: 1,
      height: 45,
      width: 180,
      borderColor: colors.gray5,
      paddingHorizontal: 20,
      justifyContent: 'center',
      // alignItems: 'center',
    },
  });
};
