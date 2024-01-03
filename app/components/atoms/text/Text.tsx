import * as React from 'react';
import {Text as RText, TextProps, TextStyle} from 'react-native';

export function Text(
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<RText> &
    Readonly<TextProps>,
) {
  const {style} = props;
  return <RText style={[{}, style]} {...props}></RText>;
}
