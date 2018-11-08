import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
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
export default class RarityRow extends React.Component {
  static propTypes = {
    rarity: PropTypes.string.isRequired,
    selectRarity: PropTypes.func.isRequired
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftView}>
          <Text>Rarity</Text>
        </View>
        <View style={styles.rightView}>
          <TouchableOpacity onPress={this.selectRarity('')}
            style={[
              styles.button1,
              { paddingLeft: 0 },
              this.state.rarity === '' && styles.selectedValue1
            ]}>
            <Image source={Images.empty} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.selectRarity('N')}
            style={[
              styles.button1,
              this.state.rarity === 'N' && styles.selectedValue1
            ]}>
            <Image source={Images.rarity[0]} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.selectRarity('R')}
            style={[
              styles.button1,
              this.state.rarity === 'R' && styles.selectedValue1
            ]}>
            <Image source={Images.rarity[1]} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.selectRarity('SR')}
            style={[
              styles.button1,
              this.state.rarity === 'SR' && styles.selectedValue1
            ]}>
            <Image source={Images.rarity[2]} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.selectRarity('SSR')}
            style={[
              styles.button1,
              this.state.rarity === 'SSR' && styles.selectedValue1
            ]}>
            <Image source={Images.rarity[3]} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.selectRarity('UR')}
            style={[
              styles.button1,
              this.state.rarity === 'UR' && styles.selectedValue1
            ]}>
            <Image source={Images.rarity[4]} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
