import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useModal} from 'react-native-modalfy';
import {Text, TouchableRipple, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Metrics} from '~/Theme';
import rowStyles from '~/Theme/RowStyles';
import type {ModalStackParamList} from '~/typings/modalfy';

type Props = {
  list: LVObject<string>[];
  onSelect: (item: string) => void;
  selectedItem: string | undefined;
  toggleReverse: () => void;
  isReverse: boolean;
};

/** Ordering Row */
const OrderingRow = ({
  isReverse,
  list,
  onSelect,
  selectedItem,
  toggleReverse,
}: Props) => {
  const {colors} = useTheme();
  const {openModal} = useModal<ModalStackParamList>();

  const openList = () => {
    openModal('list', {
      title: 'Ordering',
      selectedItem,
      objectData: list,
      onPress: onSelect,
    });
  };

  const findLabel = list.find(i => i.value === selectedItem)?.label || '';

  return (
    <>
      <View style={rowStyles.row}>
        <View style={rowStyles.leftView}>
          <Text>Ordering</Text>
        </View>
        <TouchableRipple style={rowStyles.flex2} onPress={openList}>
          <View style={rowStyles.selectionButton}>
            <Text>{findLabel}</Text>
            <Icon color={colors.text} name="menu-down" size={20} />
          </View>
        </TouchableRipple>
      </View>
      <View style={rowStyles.row}>
        <View style={rowStyles.leftView} />
        <TouchableRipple style={rowStyles.flex2} onPress={toggleReverse}>
          <View style={[rowStyles.row, styles.padding]}>
            <Icon
              color={Colors.green}
              name={isReverse ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={20}
              style={styles.marginRight}
            />
            <Text>Reverse order</Text>
          </View>
        </TouchableRipple>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  marginRight: {
    marginRight: Metrics.baseMargin,
  },
  padding: {
    padding: Metrics.baseMargin,
  },
});

export default OrderingRow;
