import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from '~/Theme/RowStyles';
import { ApplicationStyles } from '~/Theme';

/**
 * Region Row (None, False, True)
 *
 * - `selectRegion`: Save `japanOnly` state
 * - `japanOnly` state from parent
 *
 * @export
 * @class RegionRow
 * @extends {React.Component}
 */
export default class RegionRow extends React.Component {
  static propTypes = {
    japanOnly: PropTypes.string.isRequired,
    selectRegion: PropTypes.func.isRequired,
  };

  render() {
    const { japanOnly } = this.props;
    return (
      <View style={ApplicationStyles.row}>
        <View style={styles.leftView}>
          <Text>Region</Text>
        </View>
        <View style={styles.rightView}>
          <TouchableOpacity onPress={this.props.selectRegion('')}
            style={[
              styles.textButton,
              styles.standardButton,
              japanOnly === '' && styles.selectedValue,
            ]}>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectRegion('False')}
            style={[
              styles.textButton,
              styles.standardButton,
              japanOnly === 'False' && styles.selectedValue,
            ]}>
            <Text style={styles.buttonText}>EN Only</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectRegion('True')}
            style={[
              styles.textButton,
              styles.standardButton,
              japanOnly === 'True' && styles.selectedValue,
            ]}>
            <Text style={styles.buttonText}>JP Only</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
