import {View, FlatList} from 'react-native';
import React from 'react';
import OfferViewCard from '../../../components/organisms/card/OfferViewCard';
import {useTheme} from '../../../theme/ThemeContext';
import styleSheet from './styles';

const OfferExplore = () => {
  const theme = useTheme();
  const styles = styleSheet(theme);
  return (
    <View style={styles.container}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={() => (
          <OfferViewCard
            location="90 foot Kankarbagh, Patna - 800020"
            text="Some information about the store... some information about the store..."
          />
        )}
        keyExtractor={item => item.toString()}
      />
    </View>
  );
};

export default OfferExplore;
