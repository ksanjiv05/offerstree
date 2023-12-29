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
    }
    // flexWithHeight: (height: number) => ({
    //   flex: 1,
    //   maxHeight:height,
    // }),
  });
};
