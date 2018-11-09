import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import styles from '../../Theme/RowStyles'

/**
 * Promo Card Row (None, True, False)
 *
 * Prop:
 * - `selectPromo`: Save `is_promo` state
 * - `is_promo`: state from parent
 * 
 * @export
 * @class PromoCardRow
 * @extends {React.Component}
 */
class PromoCardRow extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftView}>
          <Text>Promo card</Text>
        </View>
        <View style={styles.rightView}>
          <TouchableOpacity onPress={this.props.selectPromo('')}
            style={[
              styles.button,
              this.props.is_promo == '' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectPromo('True')}
            style={[
              styles.button,
              this.props.is_promo == 'True' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>Only</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectPromo('False')}
            style={[
              styles.button,
              this.props.is_promo == 'False' && styles.selectedValue
            ]}>
            <Text style={styles.buttonText}>None</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

PromoCardRow.propTypes = {
  is_promo: PropTypes.string.isRequired,
  selectPromo: PropTypes.func.isRequired
}

export default PromoCardRow
