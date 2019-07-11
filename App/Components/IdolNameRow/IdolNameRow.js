import React from 'react';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import PropTypes from 'prop-types';
import styles from '~/Theme/RowStyles';

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
export default class IdolNameRow extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    selectIdol: PropTypes.func.isRequired,
    idols: PropTypes.any,
  };

  render() {
    return (
      <View style={styles.pickerRow}>
        <View style={styles.leftView}>
          <Text>Idol</Text>
        </View>
        <View style={styles.flex2}>
          <RNPickerSelect onValueChange={this.props.selectIdol}
            items={this.props.idols}
            hideIcon={true}
            style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
            placeholderTextColor={'black'}
            placeholder={{ label: 'All', value: 'All' }}
            value={this.props.name} />
        </View>
      </View>
    );
  }
}
