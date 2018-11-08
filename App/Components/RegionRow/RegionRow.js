import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import styles from '../../Theme/RowStyles'

/**
 * Region Row
 *
 * @function selectRegion: Save `japan_only` state
 * @param japan_only state
 * @export
 * @class RegionRow
 * @extends {React.Component}
 */
class RegionRow extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftView}>
          <Text>Region</Text>
        </View>
        <View style={styles.rightView}>
          <TouchableOpacity onPress={this.props.selectRegion('')}
            style={[
              styles.button,
              this.props.japan_only == '' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectRegion('False')}
            style={[
              styles.button,
              this.props.japan_only == 'False' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>EN Only</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectRegion('True')}
            style={[
              styles.button,
              this.props.japan_only == 'True' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>JP Only</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

RegionRow.propTypes = {
  japan_only: PropTypes.string.isRequired,
  selectRegion: PropTypes.func.isRequired
}

export default RegionRow
