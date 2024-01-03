import {
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputKeyPressEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {forwardRef, ReactNode} from 'react';
import styleSheet from './styles';
import {useTheme} from '../../../theme/ThemeContext';

interface IFormInputProps {
  placeholder?: string;
  value: string;
  onChange(value: string): void;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  editable?: boolean;
  secureTextEntry?: boolean;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url';
  onFocus?(): void;
  onBlur?(): void;
  appendComponent?: ReactNode | null;
  isErrorMessage?: boolean;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  numberOfLines?: number;
  multiline?: boolean;
  onKeyPress?(e: NativeSyntheticEvent<TextInputKeyPressEventData>): void;
}

const FormInput = forwardRef<TextInput, IFormInputProps>((props, ref) => {
  const theme = useTheme();
  const styles = styleSheet(theme);

  return (
    <View
      style={[
        styles.defaultInputContainerStyle,
        props.isErrorMessage ? styles.redBorder : styles.greyBorder,
        props.inputContainerStyle,
      ]}>
      <View style={styles.flexRow}>
        <View style={styles.leftSideContainerStyle}>
          <TextInput
            style={[styles.defaultInputStyle, props.inputStyle]}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChange}
            placeholderTextColor={theme.colors.gray5}
            maxLength={props.maxLength}
            autoCapitalize={props.autoCapitalize}
            editable={props.editable}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            multiline={props.multiline}
            numberOfLines={props.numberOfLines}
            ref={ref}
            onKeyPress={props.onKeyPress}
            // onKeyPress={props.onKeyPress}
          />
        </View>

        <View style={styles.rightSideContainerStyle}>
          {props.appendComponent && props.appendComponent}
        </View>
      </View>
    </View>
  );
});

export default FormInput;
