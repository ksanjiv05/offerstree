import {StyleSheet} from 'react-native';
import {ITheme} from '../../theme/ThemeContext';

export default ({colors}: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black,
    },
    contentCenter: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
      height: 250,
    },
    loginContainer: {flex: 1, paddingHorizontal: 10},
    rowConatiner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    registerText: {
      color: colors.green,
      fontWeight: 'bold',
    },
    switchContainer: {
      width: 150,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    eyeContainer: {
      position: 'absolute',
      right: 0,
      top: 0,
      width: 60,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
    },
    // flexWithHeight: (height: number) => ({
    //   flex: 1,
    //   maxHeight:height,
    // }),
  });
};
