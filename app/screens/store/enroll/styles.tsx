import {StyleSheet} from 'react-native';
import {ITheme} from '../../../theme/ThemeContext';

export default ({colors}: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black,
    },
    imgPicContainer: {height: 200, flexDirection: 'row'},
    imgPic: {
      width: 175,
      height: 175,
      borderRadius: 200,
      backgroundColor: 'red',
      overflow: 'hidden',
    },
    imgPic2: {
      flex: 1,
      maxHeight: 175,
      // marginLeft: 10,
      backgroundColor: 'red',
    },
    mapZoom: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 100,
    },
  });
};
