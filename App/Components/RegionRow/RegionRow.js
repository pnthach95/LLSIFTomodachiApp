import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../Theme/RowStyles';
import { ApplicationStyles } from '../../Theme';

/**
 * Region Row (None, False, True)
 *
 * - `selectRegion`: Save `japan_only` state
 * - `japan_only` state from parent
 *
 * @export
 * @class RegionRow
 * @extends {React.Component}
 */
class RegionRow extends React.Component {
  render() {
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
              this.props.japan_only === '' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectRegion('False')}
            style={[
              styles.textButton,
              styles.standardButton,
              this.props.japan_only === 'False' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>EN Only</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectRegion('True')}
            style={[
              styles.textButton,
              styles.standardButton,
              this.props.japan_only === 'True' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>JP Only</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

RegionRow.propTypes = {
  japan_only: PropTypes.string.isRequired,
  selectRegion: PropTypes.func.isRequired
};

export default RegionRow;
