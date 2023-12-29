import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {SlideInDown, SlideInUp} from 'react-native-reanimated';
import {useTheme} from '../../../../theme/ThemeContext';

type Props = {
  text: string;
};

const AnText = Animated.createAnimatedComponent(Text);

const AnimatedTitle = ({text = ''}: Props) => {
  const theme = useTheme();
  return (
    <View>
      <Animated.View
        entering={SlideInDown}
        style={[styles.line, {backgroundColor: theme.colors.green}]}
      />
      <AnText entering={SlideInUp} style={styles.text}>
        {text}
      </AnText>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 20,
    width: 170,
    position: 'absolute',
    top: 30,
  },
  text: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default AnimatedTitle;
