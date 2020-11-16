import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useModal } from 'react-native-modalfy';

import rowStyles from '~/Theme/RowStyles';
import { Colors, Metrics } from '~/Theme';
import type { LVObject, ModalStackParamList } from '~/Utils/types';

type Props = {
  list: LVObject<string>[];
  onSelect: (item: string) => void;
  selectedItem: string | undefined;
  toggleReverse: () => void;
  isReverse: boolean;
};

/**
 * Ordering Row
 */
const OrderingRow: React.FC<Props> = ({
  isReverse,
  list,
  onSelect,
  selectedItem,
  toggleReverse,
}) => {
  const { colors } = useTheme();
  const { openModal } = useModal<ModalStackParamList>();

  const openList = () => {
    openModal('list', {
      title: 'Ordering',
      selectedItem,
      objectData: list,
      onPress: onSelect,
    });
  };

  const findLabel = list.find((i) => i.value === selectedItem)?.label || '';

  return (
    <>
      <View style={rowStyles.row}>
        <View style={rowStyles.leftView}>
          <Text>Ordering</Text>
        </View>
        <TouchableRipple onPress={openList} style={rowStyles.flex2}>
          <View style={rowStyles.selectionButton}>
            <Text>{findLabel}</Text>
            <Icon name='menu-down' size={20} color={colors.text} />
          </View>
        </TouchableRipple>
      </View>
      <View style={rowStyles.row}>
        <View style={rowStyles.leftView} />
        <TouchableRipple onPress={toggleReverse} style={rowStyles.flex2}>
          <View style={[rowStyles.row, styles.padding]}>
            <Icon
              name={isReverse ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={20}
              color={Colors.green}
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

OrderingRow.propTypes = {
  isReverse: PropTypes.any,
  onSelect: PropTypes.any,
  list: PropTypes.any,
  selectedItem: PropTypes.any,
  toggleReverse: PropTypes.any,
};

export default OrderingRow;
