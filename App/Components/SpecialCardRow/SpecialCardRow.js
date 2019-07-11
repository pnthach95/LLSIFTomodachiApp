import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from '~/Theme/RowStyles';
import { ApplicationStyles } from '~/Theme';
/**
 * Special Card Row (None, True, False)
 *
 * Prop:
 * - `selectSpecial`: Save `isSpecial` state
 * - `isSpecial`: state from parent
 *
 * @export
 * @class SpecialCardRow
 * @extends {React.Component}
 */
export default class SpecialCardRow extends React.Component {
  static propTypes = {
    isSpecial: PropTypes.string.isRequired,
    selectSpecial: PropTypes.func.isRequired,
  };

  render() {
    const { isSpecial } = this.props;
    return (
      <View style={ApplicationStyles.row}>
        <View style={styles.leftView}>
          <Text>Special card</Text>
        </View>
        <View style={styles.rightView}>
          <TouchableOpacity onPress={this.props.selectSpecial('')}
            style={[
              styles.textButton,
              styles.standardButton,
              isSpecial === '' && styles.selectedValue,
            ]}>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectSpecial('True')}
            style={[
              styles.textButton,
              styles.standardButton,
              isSpecial === 'True' && styles.selectedValue,
            ]}>
            <Text style={styles.buttonText}>Only</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectSpecial('False')}
            style={[
              styles.textButton,
              styles.standardButton,
              isSpecial === 'False' && styles.selectedValue,
            ]}>
            <Text style={styles.buttonText}>None</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
