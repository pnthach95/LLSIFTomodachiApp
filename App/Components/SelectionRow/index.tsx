import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {View} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';
import {AppStyles} from '~/Theme';
import rowStyles from '~/Theme/RowStyles';

type Props<T = CombinedWithBOE> = {
  title: string;
  value: T;
  setValue: (value: T) => void;
  data: LVObject<T>[];
};

/**
 * Boolean or empty selection row
 */
const SelectionRow = ({title, value, setValue, data}: Props) => {
  const keyExtractor = (item: Props['data'][0], index: number): string =>
    `${index}${item.value}`;

  const renderItem = ({item}: {item: Props['data'][0]}) => {
    const onPress = () => setValue(item.value);

    return (
      <TouchableRipple
        style={[
          rowStyles.textButton,
          rowStyles.standardButton,
          value === item.value && rowStyles.selectedValue,
        ]}
        onPress={onPress}>
        <Text>{item.label}</Text>
      </TouchableRipple>
    );
  };

  return (
    <View style={AppStyles.row}>
      <View style={rowStyles.leftView}>
        <Text>{title}</Text>
      </View>
      <View style={rowStyles.rightView}>
        <FlashList
          horizontal
          data={data}
          estimatedItemSize={50}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default SelectionRow;
