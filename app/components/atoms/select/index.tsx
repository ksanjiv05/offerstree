import {
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import styleSheet from './styles';
import {useTheme} from '../../../theme/ThemeContext';
import {ArrowBottomIcon} from '../../../assets/icons';
import {Text} from '../text/Text';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {FlatList} from 'react-native-gesture-handler';

interface ISelectInputProps {
  placeholder?: string;
  value: string;
  onChange(value: string): void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  appendComponent?: ReactNode | null;
  isErrorMessage?: boolean;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

const categories = [
  'smartphones',
  'laptops',
  'fragrances',
  'skincare',
  'groceries',
  'home-decoration',
  'furniture',
  'tops',
  'womens-dresses',
  'womens-shoes',
  'mens-shirts',
  'mens-shoes',
  'mens-watches',
  'womens-watches',
  'womens-bags',
  'womens-jewellery',
  'sunglasses',
  'automotive',
  'motorcycle',
  'lighting',
];

const SelectInput = forwardRef<TextInput, ISelectInputProps>((props, ref) => {
  const theme = useTheme();
  const styles = styleSheet(theme);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['60%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderList = () => {
    return (
      <View>
        <FlatList
          data={categories}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.btnStyle}>
                <Text style={styles.btnText}>{item}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item}
        />
      </View>
    );
  };

  return (
    <View
      style={[
        styles.defaultInputContainerStyle,
        props.isErrorMessage ? styles.redBorder : styles.greyBorder,
        props.inputContainerStyle,
      ]}>
      <TouchableOpacity
        style={styles.flexRow}
        onPress={handlePresentModalPress}>
        <View style={[styles.leftSideContainerStyle]}>
          <Text
            style={[
              styles.defaultInputStyle,
              {color: theme.colors.gray5},
              props.inputStyle,
            ]}>
            {props.placeholder}
          </Text>
        </View>

        <View style={styles.rightSideContainerStyle}>
          <ArrowBottomIcon
            width={40}
            height={50}
            style={{color: theme.colors.primaryText}}
          />
          {/* {props.appendComponent && props.appendComponent} */}
        </View>
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}>
        <View style={{flex: 1}}>{renderList()}</View>
      </BottomSheetModal>
    </View>
  );
});

export default SelectInput;
