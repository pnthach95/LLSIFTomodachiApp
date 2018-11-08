import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import styles from '../../Theme/RowStyles'

/**
 * Event Card Row
 *
 * @function selectEvent: Save `is_event` state
 * @param is_event state
 * @export
 * @class EventCardRow
 * @extends {React.Component}
 */
export default class EventCardRow extends React.Component {
  static propTypes = {
    is_event: PropTypes.string.isRequired,
    selectEvent: PropTypes.func.isRequired
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftView}>
          <Text>Event card</Text>
        </View>
        <View style={styles.rightView}>
          <TouchableOpacity onPress={this.props.selectEvent('')}
            style={[
              styles.button,
              this.props.is_event == '' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectEvent('True')}
            style={[
              styles.button,
              this.props.is_event == 'True' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>Only</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectEvent('False')}
            style={[
              styles.button,
              this.props.is_event == 'False' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>None</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
