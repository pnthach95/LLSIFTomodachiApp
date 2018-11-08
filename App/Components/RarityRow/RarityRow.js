import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Images } from '../../Theme'
import styles from '../../Theme/RowStyles'

/**
 * Rarity Row
 *
 * @function selectRarity: Save `rarity` state
 * @param rarity state
 * @export
 * @class RarityRow
 * @extends {React.Component}
 */
class RarityRow extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftView}>
          <Text>Rarity</Text>
        </View>
        <View style={styles.rightView}>
          <TouchableOpacity onPress={this.props.selectRarity('')}
            style={[
              styles.button1,
              { paddingLeft: 0 },
              this.props.rarity === '' && styles.selectedValue1
            ]}>
            <Image source={Images.empty} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectRarity('N')}
            style={[
              styles.button1,
              this.props.rarity === 'N' && styles.selectedValue1
            ]}>
            <Image source={Images.rarity[0]} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectRarity('R')}
            style={[
              styles.button1,
              this.props.rarity === 'R' && styles.selectedValue1
            ]}>
            <Image source={Images.rarity[1]} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectRarity('SR')}
            style={[
              styles.button1,
              this.props.rarity === 'SR' && styles.selectedValue1
            ]}>
            <Image source={Images.rarity[2]} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectRarity('SSR')}
            style={[
              styles.button1,
              this.props.rarity === 'SSR' && styles.selectedValue1
            ]}>
            <Image source={Images.rarity[3]} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.selectRarity('UR')}
            style={[
              styles.button1,
              this.props.rarity === 'UR' && styles.selectedValue1
            ]}>
            <Image source={Images.rarity[4]} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

RarityRow.propTypes = {
  rarity: PropTypes.string.isRequired,
  selectRarity: PropTypes.func.isRequired
}

export default RarityRow
