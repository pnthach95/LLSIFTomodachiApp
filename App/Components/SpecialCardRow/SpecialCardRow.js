import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import styles from '../../Theme/RowStyles'

/**
 * Special Card Row
 * 
 * @function selectSpecial: Save `is_special` state
 * @param is_special state
 * @export
 * @class SpecialCardRow
 * @extends {React.Component}
 */
class SpecialCardRow extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftView}>
          <Text>Special card</Text>
        </View>
        <View style={styles.rightView}>
          <TouchableOpacity onPress={this.props.selectSpecial('')}
            style={[
              styles.button,
              this.props.is_special == '' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectSpecial('True')}
            style={[
              styles.button,
              this.props.is_special == 'True' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>Only</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectSpecial('False')}
            style={[
              styles.button,
              this.props.is_special == 'False' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>None</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

SpecialCardRow.propTypes = {
  is_special: PropTypes.string.isRequired,
  selectSpecial: PropTypes.func.isRequired
}

export default SpecialCardRow
