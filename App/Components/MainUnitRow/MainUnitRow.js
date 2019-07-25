import React from 'react';
import {
  Text, View, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { Images, ApplicationStyles } from '~/Theme';
import styles from '~/Theme/RowStyles';

/**
 * Main Unit Row (None, μ's, Aqours)
 *
 * Prop:
 * - `selectMainUnit`: Save `mainUnit` state
 * - `mainUnit`: state from parent
 *
 * @export
 * @class MainUnitRow
 * @extends {React.Component}
 */
export default class MainUnitRow extends React.Component {
  static propTypes = {
    mainUnit: PropTypes.string.isRequired,
    selectMainUnit: PropTypes.func.isRequired,
  };

  render() {
    return (
      <View style={ApplicationStyles.row}>
        <View style={styles.leftView}>
          <Text>Main unit</Text>
        </View>
        <View style={styles.rightView}>
          <TouchableOpacity onPress={this.props.selectMainUnit('')}
            style={[
              styles.textButton,
              styles.standardButton,
              this.props.mainUnit === '' && styles.selectedValue,
            ]}>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectMainUnit('μ\'s')}
            style={[
              styles.standardButton,
              this.props.mainUnit === 'μ\'s' && styles.selectedValue1,
            ]}>
            <Image source={Images.mainUnit[0]} style={styles.buttonImage1} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectMainUnit('Aqours')}
            style={[
              styles.standardButton,
              this.props.mainUnit === 'Aqours' && styles.selectedValue1,
            ]}>
            <Image source={Images.mainUnit[1]} style={styles.buttonImage1} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
