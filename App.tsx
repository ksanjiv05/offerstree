import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {ThemeProvider} from './app/theme/ThemeContext';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './app/routes';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <ThemeProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
