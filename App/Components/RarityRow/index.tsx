import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, ScrollView } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { Images, AppStyles } from '~/Theme';
import rowStyles from '~/Theme/RowStyles';
import type { RarityType } from '~/Utils/types';

type RarityRowType = {
  rarity: RarityType;
  selectRarity: (rarity: RarityType) => void;
};

/**
 * Rarity Row (None, N, R, SR, SSR, UR)
 */
const RarityRow: React.FC<RarityRowType> = ({ rarity, selectRarity }) => {
  const none = () => selectRarity('');
  const n = () => selectRarity('N');
  const r = () => selectRarity('R');
  const sr = () => selectRarity('SR');
  const ssr = () => selectRarity('SSR');
  const ur = () => selectRarity('UR');

  return (
    <View style={AppStyles.row}>
      <View style={rowStyles.leftView}>
        <Text>Rarity</Text>
      </View>
      <View style={rowStyles.rightView}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableRipple
            onPress={none}
            style={[
              rowStyles.standardButton,
              rarity === '' && rowStyles.selectedValue1
            ]}>
            <Image source={Images.empty} style={rowStyles.buttonImage} />
          </TouchableRipple>
          <TouchableRipple
            onPress={n}
            style={[
              rowStyles.standardButton,
              rarity === 'N' && rowStyles.selectedValue1
            ]}>
            <Image source={Images.rarity[0]} style={rowStyles.buttonImage} />
          </TouchableRipple>
          <TouchableRipple
            onPress={r}
            style={[
              rowStyles.standardButton,
              rarity === 'R' && rowStyles.selectedValue1
            ]}>
            <Image source={Images.rarity[1]} style={rowStyles.buttonImage} />
          </TouchableRipple>
          <TouchableRipple
            onPress={sr}
            style={[
              rowStyles.standardButton,
              rarity === 'SR' && rowStyles.selectedValue1
            ]}>
            <Image source={Images.rarity[2]} style={rowStyles.buttonImage} />
          </TouchableRipple>
          <TouchableRipple
            onPress={ssr}
            style={[
              rowStyles.standardButton,
              rarity === 'SSR' && rowStyles.selectedValue1
            ]}>
            <Image source={Images.rarity[3]} style={rowStyles.buttonImage} />
          </TouchableRipple>
          <TouchableRipple
            onPress={ur}
            style={[
              rowStyles.standardButton,
              rarity === 'UR' && rowStyles.selectedValue1
            ]}>
            <Image source={Images.rarity[4]} style={rowStyles.buttonImage} />
          </TouchableRipple>
        </ScrollView>
      </View>
    </View>
  );
};

RarityRow.propTypes = {
  rarity: PropTypes.any,
  selectRarity: PropTypes.any
};

export default RarityRow;
