import React from 'react';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import PropTypes from 'prop-types';
import styles from '~/Theme/RowStyles';

/**
 * School Row.
 *
 * School list in `this.props.schools`.
 *
 * Prop:
 * - `selectSchool`: Save `idolSchool` state
 * - `idolSchool`: state from parent
 *
 * @export
 * @class SchoolRow
 * @extends {React.Component}
 */
export default class SchoolRow extends React.Component {
  static propTypes = {
    idolSchool: PropTypes.string.isRequired,
    selectSchool: PropTypes.func.isRequired,
    schools: PropTypes.any,
  };

  render() {
    const { idolSchool, selectSchool, schools } = this.props;
    return (
      <View style={styles.pickerRow}>
        <View style={styles.leftView}>
          <Text>School</Text>
        </View>
        <View style={styles.flex2}>
          <RNPickerSelect onValueChange={selectSchool}
            items={schools}
            hideIcon={true}
            style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
            placeholderTextColor={'black'}
            placeholder={{ label: 'All', value: 'All' }}
            value={idolSchool} />
        </View>
      </View>
    );
  }
}
