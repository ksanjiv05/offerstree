import {ITheme} from '../../../theme/ThemeContext';

export default ({colors}: ITheme) => {
  return {
    defaultButtonStyle: {},
    defaultLabelButtonStyle: (disabled: boolean) => ({
      fontSize: 16,
      color: disabled ? colors.inActiveBlue : colors.blue,
      // ...typography.robotoMedium,
    }),
  };
};
