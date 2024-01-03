import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {ThemeProvider} from './app/theme/ThemeContext';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './app/routes';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000000'} />
      <GestureHandlerRootView style={styles.container}>
        <ThemeProvider>
          <BottomSheetModalProvider>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </BottomSheetModalProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
