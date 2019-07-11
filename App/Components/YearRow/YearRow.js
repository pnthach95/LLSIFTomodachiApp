import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from '~/Theme/RowStyles';
import { ApplicationStyles } from '~/Theme';

/**
 * Year Row (None, First, Second, Third)
 *
 * Prop:
 * - `selectYear`: Save `idolYear` state
 * - `idolYear`: state from parent
 *
 * @export
 * @class YearRow
 * @extends {React.Component}
 */
export default class YearRow extends React.Component {
  static propTypes = {
    idolYear: PropTypes.string.isRequired,
    selectYear: PropTypes.func.isRequired,
  };

  render() {
    const { idolYear } = this.props;
    return (
      <View style={ApplicationStyles.row}>
        <View style={styles.leftView}>
          <Text>Year</Text>
        </View>
        <View style={styles.rightView}>
          <TouchableOpacity onPress={this.props.selectYear('')}
            style={[
              styles.textButton,
              styles.standardButton,
              idolYear === '' && styles.selectedValue,
            ]}>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectYear('First')}
            style={[
              styles.textButton,
              styles.standardButton,
              idolYear === 'First' && styles.selectedValue,
            ]}>
            <Text style={styles.buttonText}>1st</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectYear('Second')}
            style={[
              styles.textButton,
              styles.standardButton,
              idolYear === 'Second' && styles.selectedValue,
            ]}>
            <Text style={styles.buttonText}>2nd</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectYear('Third')}
            style={[
              styles.textButton,
              styles.standardButton,
              idolYear === 'Third' && styles.selectedValue,
            ]}>
            <Text style={styles.buttonText}>3rd</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
