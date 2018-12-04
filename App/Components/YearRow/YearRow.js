import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../Theme/RowStyles';

/**
 * Year Row (None, First, Second, Third)
 *
 * Prop:
 * - `selectYear`: Save `idol_year` state
 * - `idol_year`: state from parent
 * 
 * @export
 * @class YearRow
 * @extends {React.Component}
 */
class YearRow extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftView}>
          <Text>Year</Text>
        </View>
        <View style={styles.rightView}>
          <TouchableOpacity onPress={this.props.selectYear('')}
            style={[
              styles.button,
              this.props.idol_year === '' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectYear('First')}
            style={[
              styles.button,
              this.props.idol_year === 'First' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>1st</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectYear('Second')}
            style={[
              styles.button,
              this.props.idol_year === 'Second' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>2nd</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectYear('Third')}
            style={[
              styles.button,
              this.props.idol_year === 'Third' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>3rd</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

YearRow.propTypes = {
  idol_year: PropTypes.string.isRequired,
  selectYear: PropTypes.func.isRequired
};

export default YearRow;
