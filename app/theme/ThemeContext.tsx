import React, {createContext, useContext} from 'react';
import {useColorScheme} from 'react-native';
import {IColor, dark, light} from './colors';

export interface ITheme {
  isDark: boolean;
  colors: IColor;
  // images: Images.IImage;
  // typography: Typography.ITypography;
}

export const ThemeContext = createContext({
  isDark: false,
  colors: light,
  // images: Images.light,
  // typography: Typography.light,
});

export interface ThemeProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const defaultTheme = {
    isDark,
    colors: isDark ? dark : light,
    // images: isDark ? Images.dark : Images.light,
    // typography: isDark ? Typography.dark : Typography.light,
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
