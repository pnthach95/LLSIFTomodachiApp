import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { AppStyles } from '~/Theme';
import rowStyles from '~/Theme/RowStyles';
import type { LVObject, CombinedWithBOE } from '~/Utils/types';

type Props<T = CombinedWithBOE> = {
  title: string;
  value: T;
  setValue: (value: T) => void;
  data: LVObject<T>[];
};

/**
 * Boolean or empty selection row
 */
const SelectionRow: React.FC<Props> = ({ title, value, setValue, data }) => {
  const keyExtractor = (item: Props['data'][0], index: number): string =>
    `${index}${item.value}`;

  const renderItem = ({ item }: { item: Props['data'][0] }) => {
    const onPress = () => setValue(item.value);

    return (
      <TouchableRipple
        onPress={onPress}
        style={[
          rowStyles.textButton,
          rowStyles.standardButton,
          value === item.value && rowStyles.selectedValue,
        ]}>
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
        <FlatList
          horizontal
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

SelectionRow.propTypes = {
  title: PropTypes.any,
  value: PropTypes.any,
  setValue: PropTypes.any,
  data: PropTypes.any,
};

export default SelectionRow;
