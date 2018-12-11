import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import styles from '../../Theme/RowStyles';
import { Colors } from '../../Theme';

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
  render() {
    console.log('orderingItem', this.props.orderingItem);
    console.log('selectedOrdering', this.props.selectedOrdering);
    return (
      <View>
        <View style={styles.pickerRow}>
          <View style={styles.leftView}>
            <Text>Ordering</Text>
          </View>
          <View style={{ flex: 2 }}>
            <RNPickerSelect onValueChange={this.props.selectOrdering}
              items={this.props.orderingItem}
              hideIcon={true}
              style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
              placeholderTextColor={'black'}
              value={this.props.selectedOrdering.value} />
          </View>
        </View>
        <View style={styles.pickerRow}>
          <View style={styles.leftView} />
          <View style={{ flex: 2 }}>
            <TouchableWithoutFeedback onPress={this.props.toggleReverse}>
              <View style={styles.pickerRow}>
                <Icon name={'check-box' + (this.props.isReverse ? '' : '-outline-blank')}
                  size={20} color={Colors.green} />
                <Text>Reverse</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}
