import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import styles from '../../Theme/RowStyles'

/**
 * Main Unit Row
 *
 * @function selectMainUnit: Save `idol_main_unit` state
 * @param idol_main_unit state
 * @export
 * @class MainUnitRow
 * @extends {React.Component}
 */
class MainUnitRow extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftView}>
          <Text>Main unit</Text>
        </View>
        <View style={styles.rightView}>
          <TouchableOpacity onPress={this.props.selectMainUnit('')}
            style={[
              styles.button,
              this.props.idol_main_unit == '' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectMainUnit(`μ's`)}
            style={[
              styles.button,
              this.props.idol_main_unit == `μ's` && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>{`μ's`}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectMainUnit('Aqours')}
            style={[
              styles.button,
              this.props.idol_main_unit == 'Aqours' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>Aqours</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

MainUnitRow.propTypes = {
  idol_main_unit: PropTypes.string.isRequired,
  selectMainUnit: PropTypes.func.isRequired
}

export default MainUnitRow
