import React from 'react';
import {
  Text, View, StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import styles from '~/Theme/RowStyles';
import { Colors } from '~/Theme';

/**
 * Idol Name Row.
 *
 * Idol list in `this.props.idols`.
 *
 * Prop:
 * - `selectIdol`: Save `name` state
 * - `name`: state from parent
 *
 * @export
 * @class IdolNameRow
 * @extends {React.Component}
 */
export default class OrderingRow extends React.Component {
  static propTypes = {
    orderingItem: PropTypes.any,
    selectOrdering: PropTypes.any,
    selectedOrdering: PropTypes.any,
    toggleReverse: PropTypes.any,
    isReverse: PropTypes.bool,
  };

  render() {
    // console.log('orderingItem', this.props.orderingItem);
    // console.log('selectedOrdering', this.props.selectedOrdering);
    return (
      <View>
        <View style={styles.pickerRow}>
          <View style={styles.leftView}>
            <Text>Ordering</Text>
          </View>
          <View style={styles.flex2}>
            <RNPickerSelect onValueChange={this.props.selectOrdering}
              items={this.props.orderingItem}
              hideIcon={true}
              style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
              placeholderTextColor={'black'}
              value={this.props.selectedOrdering} />
          </View>
        </View>
        <View style={[styles.pickerRow, styles1.marginTop10]}>
          <View style={styles.leftView} />
          <View style={styles.flex2}>
            <TouchableWithoutFeedback onPress={this.props.toggleReverse}>
              <View style={styles.pickerRow}>
                <Icon name={`check-box${this.props.isReverse ? '' : '-outline-blank'}`}
                  size={20} color={Colors.green} style={styles1.marginRight10} />
                <Text>Reverse order</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}

const styles1 = StyleSheet.create({
  marginRight10: { marginRight: 10 },
  marginTop10: { marginTop: 10 },
});
