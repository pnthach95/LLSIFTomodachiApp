import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from '~/Theme/RowStyles';
import { ApplicationStyles } from '~/Theme';

/**
 * Event Card Row (None, True, False)
 *
 * Prop:
 * - `selectEvent`: Save `isEvent` state
 * - `isEvent`: state from parent
 *
 * @export
 * @class EventRow
 * @extends {React.Component}
 */
export default class EventRow extends React.Component {
  static propTypes = {
    isEvent: PropTypes.string.isRequired,
    selectEvent: PropTypes.func.isRequired,
  };

  render() {
    return (
      <View style={ApplicationStyles.row}>
        <View style={styles.leftView}>
          <Text>Event</Text>
        </View>
        <View style={styles.rightView}>
          <TouchableOpacity onPress={this.props.selectEvent('')}
            style={[
              styles.textButton,
              styles.standardButton,
              this.props.isEvent === '' && styles.selectedValue,
            ]}>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectEvent('True')}
            style={[
              styles.textButton,
              styles.standardButton,
              this.props.isEvent === 'True' && styles.selectedValue,
            ]}>
            <Text style={styles.buttonText}>Only</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectEvent('False')}
            style={[
              styles.textButton,
              styles.standardButton,
              this.props.isEvent === 'False' && styles.selectedValue,
            ]}>
            <Text style={styles.buttonText}>None</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
