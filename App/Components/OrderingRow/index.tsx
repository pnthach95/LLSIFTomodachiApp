import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import styles from '~/Theme/RowStyles';
import { Colors } from '~/Theme';

type OrderingRowType = {
  orderingItem: any;
  selectOrdering: any;
  selectedOrdering: any;
  toggleReverse: any;
  isReverse: boolean;
};

/**
 * Ordering Row
 */
const OrderingRow: React.FC<OrderingRowType> = ({
  isReverse,
  orderingItem,
  selectOrdering,
  selectedOrdering,
  toggleReverse
}) => {
  return (
    <>
      <View style={styles.pickerRow}>
        <View style={styles.leftView}>
          <Text>Ordering</Text>
        </View>
        <View style={styles.flex2}>
          <RNPickerSelect
            onValueChange={selectOrdering}
            items={orderingItem}
            style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
            value={selectedOrdering}
          />
        </View>
      </View>
      <View style={[styles.pickerRow, styles1.marginTop10]}>
        <View style={styles.leftView} />
        <View style={styles.flex2}>
          <TouchableWithoutFeedback onPress={toggleReverse}>
            <View style={styles.pickerRow}>
              <Icon
                name={`check-box${isReverse ? '' : '-outline-blank'}`}
                size={20}
                color={Colors.green}
                style={styles1.marginRight10}
              />
              <Text>Reverse order</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  );
};

const styles1 = StyleSheet.create({
  marginRight10: { marginRight: 10 },
  marginTop10: { marginTop: 10 }
});

export default OrderingRow;
