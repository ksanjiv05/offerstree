import React from 'react';
import {useTheme} from '../../../theme/ThemeContext';
import styleSheet from './styles';
import {Text, View} from 'react-native';
import {StarIcon} from '../../../assets/icons';

type Props = {
  children: React.ReactNode;
};

const width = 100;

const AuthContainer = (props: Props) => {
  const theme = useTheme();
  const styles = styleSheet(theme);
  return (
    <View style={styles.container}>
      <View style={styles.leftCircle(width, 0)} />
      <View style={styles.leftCircle(width, 10)} />
      <View style={styles.conatint}>
        <View style={styles.starContainer}>
          <StarIcon />
        </View>
        <Text style={styles.title}>City Offers</Text>
        <Text style={styles.text}>A simple and elegant way to grab offers</Text>
      </View>
      <View style={styles.childrenContainer}>{props.children}</View>
    </View>
  );
};

export default AuthContainer;
