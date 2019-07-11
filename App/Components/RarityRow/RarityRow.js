import React from 'react';
import {
  Text, View, TouchableOpacity,
  Image, ScrollView, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { Images, ApplicationStyles } from '~/Theme';
import styles from '~/Theme/RowStyles';

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
export default class RarityRow extends React.Component {
  static propTypes = {
    rarity: PropTypes.string.isRequired,
    selectRarity: PropTypes.func.isRequired,
  };

  render() {
    const { rarity } = this.props;
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
                styles1.paddingLeft0,
                rarity === '' && styles.selectedValue1,
              ]}>
              <Image source={Images.empty} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.selectRarity('N')}
              style={[
                styles.standardButton,
                rarity === 'N' && styles.selectedValue1,
              ]}>
              <Image source={Images.rarity[0]} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.selectRarity('R')}
              style={[
                styles.standardButton,
                rarity === 'R' && styles.selectedValue1,
              ]}>
              <Image source={Images.rarity[1]} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.selectRarity('SR')}
              style={[
                styles.standardButton,
                rarity === 'SR' && styles.selectedValue1,
              ]}>
              <Image source={Images.rarity[2]} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.selectRarity('SSR')}
              style={[
                styles.standardButton,
                rarity === 'SSR' && styles.selectedValue1,
              ]}>
              <Image source={Images.rarity[3]} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.selectRarity('UR')}
              style={[
                styles.standardButton,
                rarity === 'UR' && styles.selectedValue1,
              ]}>
              <Image source={Images.rarity[4]} style={styles.buttonImage} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles1 = StyleSheet.create({
  paddingLeft0: { paddingLeft: 0 },
});
