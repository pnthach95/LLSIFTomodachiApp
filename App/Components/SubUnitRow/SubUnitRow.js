import React from 'react';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import PropTypes from 'prop-types';
import styles from '~/Theme/RowStyles';

/**
 * Sub Unit Row.
 *
 * Sub Unit list in `this.props.subUnits`.
 *
 * Prop:
 * - `selectSubUnit`: Save `idol_sub_unit` state
 * - `idol_sub_unit`: state from parent
 *
 * @export
 * @class SubUnitRow
 * @extends {React.Component}
 */
export default class SubUnitRow extends React.Component {
  static propTypes = {
    idol_sub_unit: PropTypes.string.isRequired,
    selectSubUnit: PropTypes.func.isRequired,
    subUnits: PropTypes.any,
  };

  render() {
    return (
      <View style={styles.pickerRow}>
        <View style={styles.leftView}>
          <Text>Sub unit</Text>
        </View>
        <View style={styles.flex2}>
          <RNPickerSelect onValueChange={this.props.selectSubUnit}
            items={this.props.subUnits}
            hideIcon={true}
            style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
            placeholderTextColor={'black'}
            placeholder={{ label: 'All', value: 'All' }}
            value={this.props.idol_sub_unit} />
        </View>
      </View>
    );
  }
}
