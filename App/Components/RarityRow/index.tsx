import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native';
import { Text } from 'react-native-paper';
import { Images, AppStyles } from '~/Theme';
import rowStyles from '~/Theme/RowStyles';
import type { RarityType } from '~/Utils/types';

type RarityRowType = {
  rarity: RarityType;
  selectRarity: (rarity: RarityType) => void;
};

/**
 * Rarity Row (None, N, R, SR, SSR, UR)
 *
 * Prop:
 * - `selectRarity`: Save `rarity` state
 * - `rarity`: state from parent
 *
 */
const RarityRow: React.FC<RarityRowType> = ({ rarity, selectRarity }) => {
  return (
    <View style={AppStyles.row}>
      <View style={rowStyles.leftView}>
        <Text>Rarity</Text>
      </View>
      <View style={rowStyles.rightView}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => selectRarity('')}
            style={[
              rowStyles.standardButton,
              styles.paddingLeft0,
              rarity === '' && rowStyles.selectedValue1
            ]}>
            <Image source={Images.empty} style={rowStyles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectRarity('N')}
            style={[
              rowStyles.standardButton,
              rarity === 'N' && rowStyles.selectedValue1
            ]}>
            <Image source={Images.rarity[0]} style={rowStyles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectRarity('R')}
            style={[
              rowStyles.standardButton,
              rarity === 'R' && rowStyles.selectedValue1
            ]}>
            <Image source={Images.rarity[1]} style={rowStyles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectRarity('SR')}
            style={[
              rowStyles.standardButton,
              rarity === 'SR' && rowStyles.selectedValue1
            ]}>
            <Image source={Images.rarity[2]} style={rowStyles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectRarity('SSR')}
            style={[
              rowStyles.standardButton,
              rarity === 'SSR' && rowStyles.selectedValue1
            ]}>
            <Image source={Images.rarity[3]} style={rowStyles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectRarity('UR')}
            style={[
              rowStyles.standardButton,
              rarity === 'UR' && rowStyles.selectedValue1
            ]}>
            <Image source={Images.rarity[4]} style={rowStyles.buttonImage} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paddingLeft0: { paddingLeft: 0 }
});

export default RarityRow;
