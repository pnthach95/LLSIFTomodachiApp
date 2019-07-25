import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from '~/Theme/RowStyles';
import { ApplicationStyles } from '~/Theme';

/**
 * Promo Card Row (None, True, False)
 *
 * Prop:
 * - `selectPromo`: Save `isPromo` state
 * - `isPromo`: state from parent
 *
 * @export
 * @class PromoCardRow
 * @extends {React.Component}
 */
export default class PromoCardRow extends React.Component {
  static propTypes = {
    isPromo: PropTypes.string.isRequired,
    selectPromo: PropTypes.func.isRequired,
  };

  render() {
    const { isPromo } = this.props;
    return (
      <View style={ApplicationStyles.row}>
        <View style={styles.leftView}>
          <Text>Promo card</Text>
        </View>
        <View style={styles.rightView}>
          <TouchableOpacity onPress={this.props.selectPromo('')}
            style={[
              styles.textButton,
              styles.standardButton,
              isPromo === '' && styles.selectedValue,
            ]}>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectPromo('True')}
            style={[
              styles.textButton,
              styles.standardButton,
              isPromo === 'True' && styles.selectedValue,
            ]}>
            <Text style={styles.buttonText}>Only</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectPromo('False')}
            style={[
              styles.textButton,
              styles.standardButton,
              isPromo === 'False' && styles.selectedValue,
            ]}>
            <Text style={styles.buttonText}>None</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
