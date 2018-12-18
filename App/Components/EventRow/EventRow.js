import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../Theme/RowStyles';

/**
 * Event Card Row (None, True, False)
 *
 * Prop:
 * - `selectEvent`: Save `is_event` state
 * - `is_event`: state from parent
 *
 * @export
 * @class EventRow
 * @extends {React.Component}
 */
class EventRow extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftView}>
          <Text>Event</Text>
        </View>
        <View style={styles.rightView}>
          <TouchableOpacity onPress={this.props.selectEvent('')}
            style={[
              styles.textButton,
              styles.standardButton,
              this.props.is_event === '' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectEvent('True')}
            style={[
              styles.textButton,
              styles.standardButton,
              this.props.is_event === 'True' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>Only</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectEvent('False')}
            style={[
              styles.textButton,
              styles.standardButton,
              this.props.is_event === 'False' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>None</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

EventRow.propTypes = {
  is_event: PropTypes.string.isRequired,
  selectEvent: PropTypes.func.isRequired
};

export default EventRow;
