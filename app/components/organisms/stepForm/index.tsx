import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import { CheckIcon} from '../../../assets/icons';

type StepType = {
  Icon: JSX.Element; //| React.ReactNode;
  color?: string;
};

const Step = ({Icon, color = 'blue'}: StepType) => {
  return (
    <>
      <View style={styles.iconContainer}>
        <Icon style={{color: color}} />
      </View>
      <View style={[styles.stepLine, {backgroundColor: color}]} />
    </>
  );
};

type StepFormType = {
  steps: StepType[];
  color?: string;
  activeStep?: number;
  activeColor?: string;
};

const StepForm = ({
  steps = [],
  color = 'red',
  activeStep = 0,
  activeColor = 'blue',
}: StepFormType) => {
  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        {steps.map((step, index) => {
          return (
            <Step
              key={index}
              Icon={step.Icon}
              color={activeStep === index ? activeColor : color}
            />
          );
        })}
        <View style={styles.iconContainer}>
          <CheckIcon
            style={{
              color: activeStep === steps.length - 1 ? activeColor : color,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    // backgroundColor: 'red',
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContainer: {flexDirection: 'row', alignItems: 'center'},
  stepLine: {
    flex: 1,
    height: 10,
    backgroundColor: 'green',
  },
});

export default StepForm;
