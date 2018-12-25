import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Images, ApplicationStyles } from '../../Theme';
import styles from '../../Theme/RowStyles';

/**
 * Rarity Row (None, N, R, SR, SSR, UR)
 *
 * Prop:
 * - `selectRarity`: Save `rarity` state
 * - `rarity`: state from parent
 *
 * @export
 * @class RarityRow
 * @extends {React.Component}
 */
class RarityRow extends React.Component {
  render() {
    return (
      <View style={ApplicationStyles.row}>
        <View style={styles.leftView}>
          <Text>Rarity</Text>
        </View>
        <View style={styles.rightView}>
          <ScrollView horizontal
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={this.props.selectRarity('')}
              style={[
                styles.standardButton,
                { paddingLeft: 0 },
                this.props.rarity === '' && styles.selectedValue1
              ]}>
              <Image source={Images.empty} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.selectRarity('N')}
              style={[
                styles.standardButton,
                this.props.rarity === 'N' && styles.selectedValue1
              ]}>
              <Image source={Images.rarity[0]} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.selectRarity('R')}
              style={[
                styles.standardButton,
                this.props.rarity === 'R' && styles.selectedValue1
              ]}>
              <Image source={Images.rarity[1]} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.selectRarity('SR')}
              style={[
                styles.standardButton,
                this.props.rarity === 'SR' && styles.selectedValue1
              ]}>
              <Image source={Images.rarity[2]} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.selectRarity('SSR')}
              style={[
                styles.standardButton,
                this.props.rarity === 'SSR' && styles.selectedValue1
              ]}>
              <Image source={Images.rarity[3]} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.selectRarity('UR')}
              style={[
                styles.standardButton,
                this.props.rarity === 'UR' && styles.selectedValue1
              ]}>
              <Image source={Images.rarity[4]} style={styles.buttonImage} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

RarityRow.propTypes = {
  rarity: PropTypes.string.isRequired,
  selectRarity: PropTypes.func.isRequired
};

export default RarityRow;
