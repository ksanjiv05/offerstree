import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Reanimated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedSwitch = Reanimated.createAnimatedComponent(TouchableOpacity);

interface SwitchProps {
  activeColor?: string;
  color?: string;
  onPress?: () => void;
  isActive?: boolean;
}

const Switch = ({
  activeColor = 'green',
  color = 'red',
  onPress = () => {},
  isActive = false,
}: SwitchProps) => {
  const [isEnabled, setIsEnabled] = React.useState(isActive);
  const animation = useSharedValue(isActive ? 1 : 0);

  const handleSwitch = () => {
    setIsEnabled(!isEnabled);
    if (isEnabled) {
      animation.value = withTiming(0);
      onPress();
    } else {
      animation.value = withTiming(1);
      onPress();
    }
  };

  const rStyleSwitch = useAnimatedStyle(() => {
    return {
      transform: [{translateX: animation.value * 27}],
      backgroundColor: interpolateColor(
        animation.value,
        [0, 1],
        [color, activeColor],
      ),
    };
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.track}
      onPress={handleSwitch}>
      <AnimatedSwitch
        activeOpacity={1}
        style={[styles.thumb, rStyleSwitch]}></AnimatedSwitch>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    width: 54,
    height: 25,
    backgroundColor: '#fff',
  },
  thumb: {
    width: 27,
    height: 25,
    backgroundColor: 'red',
    transform: [{translateX: 0}],
  },
});

export default Switch;
