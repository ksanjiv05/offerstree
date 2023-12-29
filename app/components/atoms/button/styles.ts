import {ITheme} from '../../../theme/ThemeContext';

export default ({colors}: ITheme) => {
  return {
    defaultButtonStyle: {
      height: 56,
      backgroundColor: colors.green,
      justifyContent: 'center',
      alignItems: 'center',
    },
    defaultLabelButtonStyle: (disabled: boolean) => ({
      fontSize: 17,
      fontWeight: '700',
      color: colors.white,
      textTransform: 'capitalize',
      // ...typography.robotoMedium,
    }),
  };
};
