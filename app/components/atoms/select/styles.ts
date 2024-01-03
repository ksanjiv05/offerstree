import {StyleSheet} from 'react-native';
import {ITheme} from '../../../theme/ThemeContext';

export default ({colors}: ITheme) => {
  return StyleSheet.create({
    defaultInputContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 56,
      backgroundColor: colors.gray1,
      borderWidth: 1,
      // borderRadius: 16,
    },
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    leftSideContainerStyle: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    defaultInputStyle: {
      paddingVertical: 0,
      fontSize: 18,
      color: colors.primaryText,
      // ...typography.robotoRegular,
    },
    rightSideContainerStyle: {
      flex: 0,
    },
    greyBorder: {
      borderColor: colors.gray3,
    },
    redBorder: {
      borderColor: colors.red,
    },
    btnStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 35,
    },
    btnText: {
      color: colors.black,
      fontSize: 18,
      textTransform: 'capitalize',
    },
  });
};
