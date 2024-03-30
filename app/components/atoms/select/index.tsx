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

type DataProps = {
  name: string;
  id: string;
};

interface ISelectInputProps {
  placeholder?: string;
  value?: string;
  onChange(value: string): void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  appendComponent?: ReactNode | null;
  isErrorMessage?: boolean;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  data?: DataProps[];
}

const SelectInput = forwardRef<TextInput, ISelectInputProps>(props => {
  const theme = useTheme();
  const styles = styleSheet(theme);
  const {data, value = ''} = props;
  const length = data?.length;
  const [selectedValue, setSelectedValue] = React.useState(props.placeholder);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const heightOfModal = length && (length < 6 ? '30%' : '60%');
  // variables
  const snapPoints = useMemo(() => [heightOfModal], [heightOfModal]);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderList = () => {
    return (
      <View>
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.btnStyle}
                onPress={() => {
                  bottomSheetModalRef.current?.close();
                  props.onChange(item.id);
                  setSelectedValue(item.name)
                }}>
                <Text style={styles.btnText}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
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
            {selectedValue}
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
