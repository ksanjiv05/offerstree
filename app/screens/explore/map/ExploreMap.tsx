import {StyleSheet, View} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import {useTheme} from '../../../theme/ThemeContext';
import styleSheet from './styles';
import MapView from 'react-native-maps';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Text} from '../../../components/atoms/text/Text';

const ExploreMap = () => {
  const theme = useTheme();
  const styles = styleSheet(theme);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['60%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  React.useEffect(() => {
    handlePresentModalPress();
  }, [handlePresentModalPress]);

  return (
    <View style={styles.container}>
      <MapView
        style={{...StyleSheet.absoluteFillObject}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}>
        <View style={{flex: 1}}>
          <Text>Bottom Sheet Content</Text>
        </View>
      </BottomSheetModal>
    </View>
  );
};

export default ExploreMap;
