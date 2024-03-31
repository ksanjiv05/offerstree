import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import styleSheet from './styles';
import {useTheme} from '../../../theme/ThemeContext';
import LoaderKit from 'react-native-loader-kit';

interface ITextButtonProps {
  onPress(): void;
  labelButton: string;
  buttonStyle?: StyleProp<ViewStyle>;
  labelButtonStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  isLoader?: boolean;
}

const TextButton = (props: ITextButtonProps) => {
  const theme = useTheme();
  const styles = styleSheet(theme);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      disabled={props.disabled}
      style={[styles.defaultButtonStyle, props.buttonStyle]}>
      <Text
        style={[
          styles.defaultLabelButtonStyle(props.disabled!),
          props.labelButtonStyle,
        ]}>
        {props.isLoader ? (
          <LoaderKit
            color="#ffffff"
            name="BallPulse"
            style={{
              height: 30,
              width: 30,
            }}
          />
        ) : (
          props.labelButton
        )}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
